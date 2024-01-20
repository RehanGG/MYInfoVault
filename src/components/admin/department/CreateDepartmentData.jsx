import { useRef } from "react";
import Input from "../../authentication/Input";
import { fullNameValidations } from "../../../utils/auth/auth-validations";

export default function CreateDepartmentData({addDepartmentData, loading, id}) {

    const allowSubmit = useRef({
        name: false,
    });

    function onSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const name = fd.get('name');
        if((Object.values(allowSubmit.current)).every(value => value === true)) {
            addDepartmentData({'name': name, type: 'text', id: id});
        }
    }

    return (
        <div className="p-6 bg-white rounded-md shadow-md w-1/2 mb-10">
            <form onSubmit={onSubmit}>
                <Input key={id} disabled={loading} ref={allowSubmit} label='Name' id='name' validations={fullNameValidations}/>
                <button disabled={loading} className="px-4 py-2 bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">Add</button>
            </form>
        </div>
    );
}