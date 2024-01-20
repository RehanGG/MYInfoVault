import { getDoc, doc } from "firebase/firestore"
import { firestore } from "../../firebase/firebase"
import { authActions } from "./slice";
import { commonActions } from "../common/slice";
import { initialDepartmentsLoad } from "../department/actions";

export const initialUserLoad = (userId) => async (dispatch) => {
    const document = await getDoc(doc(firestore, 'users', userId));
    dispatch(authActions.login(document.data()));
    dispatch(commonActions.toggle());
    dispatch(initialDepartmentsLoad());
}