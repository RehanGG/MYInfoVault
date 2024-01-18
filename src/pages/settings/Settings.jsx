import { useState, useRef } from "react";
import Input from "../../components/authentication/Input";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import Success from "../../components/common/Success";
import Warning from "../../components/common/Warning";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { FirebaseError } from "firebase/app";
import { authActions } from "../../state/auth/slice";
import { cnicValidations, emailValidations, fullNameValidations } from "../../utils/auth/validations";

export default function SettingsPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const userCurrentData = useSelector(store => store.auth.user);

    const allowSubmit = useRef({
        fname: false,
        cnic: false,
        email: false,
    });

    document.title = 'Account Settings';

    function onSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const fName = fd.get('fname');

        if((Object.values(allowSubmit.current)).every(value => value === true)) {
            updateUser(fName);
        }
        
    }

    async function updateUser(fName) {
        setMessage(undefined);
        setLoading(true);
        try {
           await updateDoc(doc(firestore, 'users', userCurrentData.uid), {fname: fName});
           setMessage({type: 'success'});
           setLoading(false);
           dispatch(authActions.updateUser(fName));
        }
        catch (error) {
            if(error instanceof FirebaseError) {
                switch (error.code) {
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

    let messageContent;

    if(message) {
        switch(message.type) {
            case 'error':
                messageContent = (<Warning>{message.message}</Warning>);
                break;
            case 'success':
                messageContent = (<Success>Profile has been updated!</Success>);
                break;
        }
    }

    return (
        <>
            <h3 className="text-gray-700 text-3xl font-semibold mb-8">Account Settings</h3>
            {messageContent}
            <div className="p-6 bg-white rounded-md shadow-md w-2/3">
                <form onSubmit={onSubmit}>
                    <div className="flex flex-col">
                        <Input ref={allowSubmit} label='Full Name' id='fname' defaultValue={userCurrentData.fname} disabled={loading} validations={fullNameValidations}/>
                        <Input ref={allowSubmit} label='CNIC' id='cnic' defaultValue={userCurrentData.cnic} disabled validations={cnicValidations}/>
                        <Input ref={allowSubmit} label='Email' id='email' defaultValue={userCurrentData.email} disabled validations={emailValidations}/>
                    </div>
                    <div className={`flex ${loading ? 'justify-between items-end' : 'justify-end'} mt-4`}>
                        {loading && <Loader/>}
                        <button disabled={loading} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Save</button>
                    </div>
                </form>
            </div>
        </>
    );
}