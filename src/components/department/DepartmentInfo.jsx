import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../common/Loader";
import { useState } from "react";

export default function DepartmentInfo() {
    const [isOpen, setIsOpen] = useState(true);
    const {departmentId} = useParams();
    const department = useSelector(store => store.department);
    const loading = department.loading;

    let dep;

    if(!loading) {
        dep = department.departments.find(val => val.tag === departmentId)
    }


    const toggleVisibility = () => {
        setIsOpen(prevVal => !prevVal);
    };
    
    return (
        <>
            {loading && <Loader/>}
            {!loading && (
                <div className='p-3 bg-white rounded-md shadow-md flex flex-col items-center overflow-hidden' style={{height: isOpen ? 'auto' : '50px'}}>
                    <div className="px-3 flex flex-row items-start w-full">
                        <button onClick={toggleVisibility}>
                            {isOpen ? 'Hide Info' : 'Show Info'}
                        </button>
                    </div>
                    <div style={{ height: '200px', width: '200px' }} className="rounded-full overflow-hidden">
                        <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={dep.imgUrl} alt="" />
                    </div>
                    <span className="py-2 px-3 font-semibold text-2xl">{dep.name}</span>
                    <span className="text-center py-2 px-3 text-sm">{dep.description}</span>
                </div>
            )}
        </>
    );
}