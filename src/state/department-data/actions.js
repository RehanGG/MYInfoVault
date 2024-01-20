import { collection, getDocs, query, where } from "firebase/firestore";
import { DepartmentDataActions } from "./slice";
import { firestore } from "../../firebase/firebase";

export const loadUserDepData = (depId, userId) => async (dispatch) => {
    dispatch(DepartmentDataActions.setData({userId, depId, data: 'loading'}));
    const qSnapshot = await getDocs(query(collection(firestore, 'departments-data'), where('dep-id', '==', depId), where('user-id', '==', userId)));
    if(qSnapshot.empty) {
        dispatch(DepartmentDataActions.setData({userId, depId, data: null}));
    } else {
        dispatch(DepartmentDataActions.setData({userId, depId, data: qSnapshot.docs[0].data()}));
    }
};