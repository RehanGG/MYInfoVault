import { useRef, useState } from "react";
import { useMessage } from "../../hooks/useMessage";
import Input from "../../components/authentication/Input";
import Loader from "../../components/common/Loader";
import CreateDepartmentData from "../../components/admin/department/CreateDepartmentData";
import ListDepartmentData from "../../components/admin/department/ListDepartmentData";
import {departmentNameValidations, departmentDescriptionValidations} from '../../utils/department/department-validations';
import { addDoc, collection } from "firebase/firestore";
import { firestore, uploadImageToFirebase } from "../../firebase/firebase";
import ImageInput from "../../components/authentication/ImageInput";
import { imageValidations } from "../../utils/auth/auth-validations";
import {replaceSpacesWithHyphens} from "../../state/department/actions"

export default function CreateDepartment() {
    document.title = 'Create Department';

    const [loading, setLoading] = useState(false);
    const {messageContent, setMessage} = useMessage();
    const [departmentData, setDepartmentData] = useState([]);

    const newDepartment = useRef(1);
    
    const allowSubmit = useRef({
        dname: false,
        description: false,
        dimage: false,
    });

    function addDepartmentData(val) {
        setDepartmentData(prevVal => {
            return [
                ...prevVal,
                val,
            ];
        });
    }

    function onDeleteDepartmentData(id) {
        setDepartmentData(prevVal => {
            const tmpData = [...prevVal];
            return tmpData.filter(department => department.id !== id);
        });
    }

    const formSubmit = event => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        if((Object.values(allowSubmit.current)).every(value => value === true)) {
            if(departmentData.length < 2) {
                setMessage({type: 'error', message: 'Department should have at-least two data sets'});
                return;
            }
            createDepartment(data);
        }
    }

    const createDepartment = async (data) => {
        setMessage(undefined);
        setLoading(true);
        try {
            const colRef = collection(firestore, 'departments');
            const imgUrl = await uploadImageToFirebase(`/departments/${colRef.id}/image/${data.dimage.name}`, data.dimage);
            const tmpDepartmentData = [...departmentData].map(dep => ({...dep, tag: replaceSpacesWithHyphens(dep.name)}));
            await addDoc(colRef, {
                name: data.dname,
                description: data.description,
                'departmentData': tmpDepartmentData,
                imgUrl: imgUrl,
            });
            newDepartment.current = newDepartment.current + 1;
            setDepartmentData([]);
            setMessage({type: 'success', message: 'New Department has been added!'});
            setLoading(false);
        }
        catch (error) {
            setMessage({type: 'error', message: 'An error occured!'});
            setLoading(false);
        }
    }

    return (
        <div key={newDepartment.current}>
            <h3 className="text-gray-700 text-3xl font-semibold mb-8">Create Department</h3>
            {messageContent}
            <div className="p-6 bg-white rounded-md shadow-md">
                <form onSubmit={formSubmit} >
                    <div className="flex flex-col gap-6 mt-4">
                        <ImageInput height='180px' width='180px' ref={allowSubmit} label="Select Department Image" id="dimage" disabled={loading} validations={imageValidations}/>
                        <Input  ref={allowSubmit} label='Department Name' id='dname' disabled={loading} validations={departmentNameValidations}/>
                        <Input textarea ref={allowSubmit} label='Department Description' id='description' disabled={loading} validations={departmentDescriptionValidations}/>
                    </div>
                    <div className={`flex ${loading ? 'justify-between items-end' : 'justify-end'} mt-4`}>
                        {loading && <Loader/>}
                        <button disabled={loading} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Create</button>
                    </div>
                </form>
            </div>
            <h3 className="text-gray-700 text-3xl font-semibold mb-8 mt-8">Department Data</h3>
            <ListDepartmentData departmentData={departmentData} onDeleteDepartmentData={onDeleteDepartmentData}/>
            <CreateDepartmentData addDepartmentData={addDepartmentData} loading={loading} id={departmentData.length}/>
        </div>
    );
}