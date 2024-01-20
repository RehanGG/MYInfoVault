import { MdDelete } from "react-icons/md";

export default function ListDepartmentData({departmentData, onDeleteDepartmentData}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {departmentData.map(dData => (
                <div key={dData.id} className="p-4 bg-white rounded-md shadow-md my-3">
                    <div className="flex flex-row justify-between items-start">
                        <span className="flex flex-row gap-2">
                            <p className="font-semibold">Data Name:</p> 
                            <p className="text-gray-800">{dData.name}</p>
                        </span>
                        <MdDelete size={30} color="red" onClick={() => onDeleteDepartmentData(dData.id)}/>
                    </div>
                    <span className="flex flex-row gap-2">
                        <p className="font-semibold">Data Type:</p> 
                        <p className="text-gray-800">{dData.type === 'text' ? 'Text/String/Number' : ''}</p>
                    </span>  
                </div>
            ))}
        </div>
    );
}