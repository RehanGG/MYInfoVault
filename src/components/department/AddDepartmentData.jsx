import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../common/Loader";
import { departmentDataValidations } from "../../utils/department/department-validations";
import Input from "../authentication/Input";
import { useMessage } from "../../hooks/useMessage";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { DepartmentDataActions } from "../../state/department-data/slice";

export default function AddDepartmentData() {

    

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {messageContent, setMessage} = useMessage();

    const {departmentId} = useParams();
    const department = useSelector(store => store.department.departments.find(val => val.tag === departmentId));
    const userId = useSelector(store => store.auth.user.uid);
    
    document.title = `Add Info - ${department.name}`;

    const combinedDataForRef = department.departmentData.reduce((result, item) => {
        const { tag } = item;
        return { ...result, [tag]: false };
      }, {});
    const allowSubmit = useRef(combinedDataForRef);

    const formSubmit = event => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        if((Object.values(allowSubmit.current)).every(value => value === true)) {
            addData(data);
        }
    }

    const addData = async (data) => {
        setMessage(undefined);
        setLoading(true);
        try {
            await addDoc(collection(firestore, 'departments-data'), {
                ...data,
                'dep-id': department.id,
                'user-id': userId,
            });
            setMessage({type: 'success', message: 'Your data has been added, updating in 1 second...'})
            setTimeout(() => {
                dispatch(DepartmentDataActions.setData({userId: userId, depId: department.id, 'data': {
                    ...data,
                    'dep-id': department.id,
                    'user-id': userId,
                }}));
            }, 1000);
        }
        catch {
            setMessage({type: 'error', message: 'An error occured!'});
            setLoading(false);
        }
    }

    return (
        <div className="mt-8">
             <h3 className="text-gray-700 text-3xl font-semibold mb-8">Add Your Info</h3>
             {messageContent}
             <div className="p-6 bg-white rounded-md shadow-md">
                <form onSubmit={formSubmit} >
                    <div className="flex flex-col gap-6 mt-4">
                        {department.departmentData.map(data => (
                            <Input key={data.tag} ref={allowSubmit} label={data.name} id={data.tag} disabled={loading} validations={departmentDataValidations}/>
                        ))}
                    </div>
                    <div className={`flex ${loading ? 'justify-between items-end' : 'justify-end'} mt-4`}>
                        {loading && <Loader/>}
                        <button disabled={loading} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Save</button>
                    </div>
                </form>
             </div>
        </div>
    );
}