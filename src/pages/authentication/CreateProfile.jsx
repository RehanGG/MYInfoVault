import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import safeIcon from '../../assets/safe.png';
import { cnicValidations, fullNameValidations, imageValidations } from "../../utils/auth/auth-validations";
import SubmitButton from "../../components/authentication/SubmitButton";
import ImageInput from "../../components/authentication/ImageInput";
import Input from "../../components/authentication/Input";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { auth, firestore, uploadImageToFirebase } from "../../firebase/firebase";
import { authActions } from "../../state/auth/slice";
import { initialDepartmentsLoad } from "../../state/department/actions";
import { FirebaseError } from "firebase/app";

export default function CreateProfile() {

    document.title = 'MYInfoVault - Create Profile';

    const allowSubmit = useRef({
        fname: false,
        cnic: false,
        profileImage: false,
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    const dispatch = useDispatch();

    function onCreateProfileSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        if((Object.values(allowSubmit.current)).every(value => value === true)) {
            createProfile(data);
        }
    }

    async function createProfile(data) {
        setMessage(undefined);
        setLoading(true);
        
        try {
            const querySnapshot = await getDocs(query(collection(firestore, "users"), where('cnic', '==', data.cnic)));
            if(querySnapshot.docs.length === 1) {
                setLoading(false);
                setMessage({type: 'error', message: 'Account with the given CNIC already exists!'})
                return;
            }

            const userId = auth.currentUser.uid;
            const email = auth.currentUser.email;

            const imgUrl = await uploadImageToFirebase(`/users/${userId}/profileImage/${data.profileImage.name}`, data.profileImage);
            const userData = {
                fname: data.fname,
                email: email,
                emailVerified: false,
                cnic: data.cnic,
                uid: userId,
                imgUrl: imgUrl,
                admin: false,
            };
            await setDoc(doc(firestore, 'users', userId), userData);
            setMessage({type: 'success', message: "Your profile has been created, you will be redirected in 1 second"});
            setTimeout(() => {
                dispatch(authActions.login(userData));
                dispatch(initialDepartmentsLoad());
            }, 1000);
        }
        catch(error) {
            if(error instanceof FirebaseError) {
                switch (error.code) {
                    case 'auth/weak-password':
                        setMessage({type: 'error', message: 'Your password must contain atleast 6 characters'});
                        break;
                    default:
                        setMessage({type: 'error', message: 'Firebase error, contact administrator'});
                }
            } else {
                setMessage({type: 'error', message: 'An error occured, please contact administrator'});
            }
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
                    <span className="text-gray-700 font-semibold text-2xl">Create Profile</span>
                </div>

                <form onSubmit={onCreateProfileSubmit} className="mt-4">
                    <ImageInput ref={allowSubmit} label="Select Profile Picture" id="profileImage" disabled={loading} validations={imageValidations}/>
                    <Input ref={allowSubmit} label='Full Name' id='fname' disabled={loading} validations={fullNameValidations}/>
                    <Input ref={allowSubmit} label='CNIC' id='cnic' disabled={loading} validations={cnicValidations}/>            
                    <SubmitButton loading={loading}>Create Profile</SubmitButton>
                </form>
                
            </div>
        </div>
    );
}