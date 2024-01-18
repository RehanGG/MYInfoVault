import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage, uploadBytes, ref, getDownloadURL} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBsapKUlyk6ejdRhfPbgSSID7j4D-i5Lk4",
    authDomain: "myinfovault-687a0.firebaseapp.com",
    projectId: "myinfovault-687a0",
    storageBucket: "myinfovault-687a0.appspot.com",
    messagingSenderId: "569152702555",
    appId: "1:569152702555:web:b431c7830525e00bb2977e"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);


export const uploadImageToFirebase = async (path, file) => {
    const storageRef = ref(storage, path);
    const result = await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
}

