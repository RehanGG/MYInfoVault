import { getDoc, doc } from "firebase/firestore"
import { firestore } from "../../firebase/firebase"
import { authActions } from "./slice";
import { commonActions } from "../common/slice";
import { initialDepartmentsLoad } from "../department/actions";

export const initialUserLoad = (userId) => async (dispatch) => {
    const document = await getDoc(doc(firestore, 'users', userId));
    if(document.exists()) {
        dispatch(authActions.login(document.data()));
        dispatch(initialDepartmentsLoad());
    } else {
        dispatch(authActions.googleLogin());
    }
    dispatch(commonActions.toggle());
    
}