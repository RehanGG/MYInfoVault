import {getDocs, collection, query} from "firebase/firestore"
import {firestore} from "../../firebase/firebase"
import { DepartmentActions } from "./slice";


export function replaceSpacesWithHyphens(input) {
    return input.toLowerCase().replace(/\s+/g, '-');
  }

export const initialDepartmentsLoad = () => async (dispatch) => {
    const querySnapshot = await getDocs(query(collection(firestore, 'departments')));
    const tmpDepartments = [];
    querySnapshot.forEach(doc => {
        tmpDepartments.push({...doc.data(), id: doc.id, tag: replaceSpacesWithHyphens(doc.data()['name'])});
    });
    dispatch(DepartmentActions.setDepartments(tmpDepartments));
}

