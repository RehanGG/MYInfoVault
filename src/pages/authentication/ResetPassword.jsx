
import Input from "../../components/authentication/Input";
import safeIcon from '../../assets/safe.png';
import { Link } from "react-router-dom";
import SubmitButton from "../../components/authentication/SubmitButton";
import { useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { emailValidations } from "../../utils/auth/validations";

export default function ResetPassword() {
    document.title = 'MYInfoVault - Reset Password';

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    const allowSubmit = useRef({
        email: false,
    });

    function onReset(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        
        if((Object.values(allowSubmit.current)).every(value => value === true)) {
            resetUser(fd.get('email'));
        }
    }

    async function resetUser(email) {
        setMessage(undefined);
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage({type: 'success', message: "Password reset instructions sent to email!"});
            setLoading(false);
        }
        catch (error) {
            setMessage({type: 'error', message: 'An error occured, please try again later'});
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
                    <span className="text-gray-700 font-semibold text-2xl">Reset Password</span>
                </div>

                <form onSubmit={onReset} className="mt-4">
                    <Input ref={allowSubmit} label='Email' type="email" id='email' disabled={loading} validations={emailValidations}/>
                    
                    <div className="mt-4">
                        
                        <Link to='/login' className="block text-sm fontme text-indigo-700 hover:underline">Back To Login</Link>
                    </div>

                    <SubmitButton loading={loading}>Reset</SubmitButton>
                </form>
            </div>
        </div>
    );

}