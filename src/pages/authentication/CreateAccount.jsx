import { useDispatch } from "react-redux";
import safeIcon from '../../assets/safe.png';
import Input from "../../components/authentication/Input";
import SubmitButton from "../../components/authentication/SubmitButton";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { authActions } from "../../state/auth/slice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore, uploadImageToFirebase } from "../../firebase/firebase";
import { FirebaseError } from "firebase/app";
import { getDocs, query, collection, where, setDoc, doc } from "firebase/firestore";
import ImageInput from "../../components/authentication/ImageInput";
import { cnicValidations, emailValidations, fullNameValidations, imageValidations, passwordValidations } from "../../utils/auth/auth-validations";
import { initialDepartmentsLoad } from "../../state/department/actions";

export default function CreateAccount() {

    document.title = 'MYInfoVault - Create Account';

    const allowSubmit = useRef({
        fname: false,
        cnic: false,
        email: false,
        password: false,
        profileImage: false,
    });
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    const dispatch = useDispatch();

    function onCreateAccountSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        if((Object.values(allowSubmit.current)).every(value => value === true)) {
            createUser(data);
        }
    }

    async function createUser(data) {
        setMessage(undefined);
        setLoading(true);
        try {

            const querySnapshot = await getDocs(query(collection(firestore, "users"), where('cnic', '==', data.cnic)));
            if(querySnapshot.docs.length === 1) {
                setLoading(false);
                setMessage({type: 'error', message: 'Account with the given CNIC already exists!'})
                return;
            }

            const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const userId = result.user.uid;
            const imgUrl = await uploadImageToFirebase(`/users/${userId}/profileImage/${data.profileImage.name}`, data.profileImage);
            const userData = {
                fname: data.fname,
                email: data.email,
                emailVerified: false,
                cnic: data.cnic,
                uid: userId,
                imgUrl: imgUrl,
            };
            await setDoc(doc(firestore, 'users', userId), userData);
            setMessage({type: 'success', message: "Your account has been created, you will be redirected in 1 second"});
            setTimeout(() => {
                dispatch(authActions.login(userData));
                dispatch(initialDepartmentsLoad());
            }, 1000);
        }
        catch (error) {
            if(error instanceof FirebaseError) {
                switch (error.code) {
                    case 'auth/weak-password':
                        setMessage({type: 'error', message: 'Your password must contain atleast 6 characters'});
                        break;
                    case 'auth/email-already-in-use':
                        setMessage({type: 'error', message: 'Email address already in use!'});
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
        <div className="flex justify-center items-center py-6 bg-gray-200 px-6">
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
                    <span className="text-gray-700 font-semibold text-2xl">Create Account</span>
                </div>

                <form onSubmit={onCreateAccountSubmit} className="mt-4">
                    <ImageInput ref={allowSubmit} label="Select Profile Picture" id="profileImage" disabled={loading} validations={imageValidations}/>
                    <Input ref={allowSubmit} label='Full Name' id='fname' disabled={loading} validations={fullNameValidations}/>
                    <Input ref={allowSubmit} label='CNIC' id='cnic' disabled={loading} validations={cnicValidations}/>
                    <Input ref={allowSubmit} label='Email' id='email' disabled={loading} validations={emailValidations}/>
                    <Input ref={allowSubmit} label='Password' id='password' type='password' disabled={loading} validations={passwordValidations}/>            
                    <div className="mt-4">
                        <Link to="/login" className="block text-sm fontme text-indigo-700 hover:underline">Already have a account? Sign In</Link>
                    </div>
                    <SubmitButton loading={loading}>Create Account</SubmitButton>
                </form>
            </div>
        </div>
    );
}