import safeIcon from '../../assets/safe.png';
import Input from "../../components/authentication/Input";
import { Link, useNavigate } from "react-router-dom";
import {useState, useRef} from 'react';
import SubmitButton from "../../components/authentication/SubmitButton";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore, signInWithGooglePopUp } from "../../firebase/firebase";
import { authActions } from "../../state/auth/slice";
import { doc, getDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { emailValidations, passwordValidations } from '../../utils/auth/auth-validations';
import { initialDepartmentsLoad } from '../../state/department/actions';


export default function Login() {

    document.title = 'MYInfoVault - Login';

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    const allowSubmit = useRef({
        email: false,
        password: false,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onGoogleSignIn() {
        setMessage(undefined);
        setLoading(true);
        try {

            let noProfile = true;

            const user = await signInWithGooglePopUp();
            const userData =  await getDoc(doc(firestore, 'users', user.user.uid));
            if(userData.exists()) {
                noProfile = false;
            }
            setMessage({type: 'success', message: "Logged In, redirecting in 1 second"});

            setTimeout(() => {
                if(noProfile) {
                    dispatch(authActions.googleLogin());
                } else {
                    dispatch(authActions.login(userData));
                    dispatch(initialDepartmentsLoad());
                }
            }, 1000);
        }
        catch (error) {
            setLoading(false);
        }
    }

    function onLogin(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        if((Object.values(allowSubmit.current)).every(value => value === true)) {
            loginUser(data);
        }
    }

    async function loginUser(data) {
        setMessage(undefined);
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, data.email, data.password);
            const userData =  (await getDoc(doc(firestore, 'users', result.user.uid))).data();
            setMessage({type: 'success', message: "Logged In, redirecting in 1 second"});
            
            setTimeout(() => {
                dispatch(authActions.login(userData));
                dispatch(initialDepartmentsLoad());
            }, 1000);
        } 
        catch (error) {
            if(error instanceof FirebaseError) {
                switch (error.code) {
                    case 'auth/invalid-credential':
                        setMessage({type: 'error', message: 'Invalid Credentials'});
                        break;
                    case 'auth/too-many-requests':
                        setMessage({type: 'error', message: 'Too many requests, try again later!'});
                        break;
                    default:
                        setMessage({type: 'error', message: 'Firebase error, contact administrator'});
                }
            } else {
                setMessage({type: 'error', message: 'An error occured, please contact administrator'});
            }
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200 px-6">
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">

                {message && (
                    <div className={`p-2 mb-4 max-w-sm w-full ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'} rounded-md flex justify-center`}>
                        <span className="text-white text-center">{message.message}</span>
                    </div>
                )}

                <div className="flex flex-col justify-center items-center">
                    <div className='flex flex-row items-center'>
                        <span className='w-12 px-3'><img src={safeIcon} /></span>
                        <span className="text-darkblue-100 font-semibold text-2xl">MYInfoVault</span>
                    </div>
                    <span className="text-gray-700 font-semibold text-2xl">Login</span>
                </div>

                <form onSubmit={onLogin} className="mt-4">
                    <Input ref={allowSubmit} label='Email' id='email' disabled={loading} validations={emailValidations}/>
                    <Input ref={allowSubmit} label='Password' type="password" id='password' disabled={loading} validations={passwordValidations}/>
                    <div className="mt-4">
                        <Link to="/reset-password" className="block text-sm fontme text-indigo-700 hover:underline">Forgot your password?</Link>
                        <Link to='/create-account' className="block text-sm fontme text-indigo-700 hover:underline">Does not have a account? SignUp Here!</Link>
                    </div>

                    <SubmitButton loading={loading}>Login</SubmitButton>
                </form>
                <div className="mt-4">
                    <button
                        onClick={onGoogleSignIn}
                        className="w-full flex justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}