import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../../../firebase/firebase";

export default function SelectDepartmentRequest({userId}) {
    const [isOpen, setOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [requestSent, setRequestSent] = useState(false);
    const department = useSelector(state => state.department);
    const currentUserId = useSelector(state => state.auth.user.uid);

    function toggleOpen() {
        setOpen((previousValue) => !previousValue);
    }

    function updateSelectedDepartment(dep) {
        toggleOpen();
        setSelectedDepartment(dep);
        setRequestSent(false);
    }


    function sendDataRequest() {
        if(requestSent || selectedDepartment == null || currentUserId == userId) {
            return;
        }
        const colRef = collection(firestore, 'requests');
        getDocs(
            query(
                colRef, 
                where('departmentId', '==', selectedDepartment.id), 
                where('requestFrom', '==', currentUserId), 
                where('requestTo', '==', userId)
            )
        ).then((snapshot) => {
            if(snapshot.empty) {
                addDoc(colRef,  {
                    departmentId: selectedDepartment.id,
                    requestFrom: currentUserId,
                    requestTo: userId,
                    requestTime: new Date().toISOString(),
                    accepted: false,
                })
            }
        });
        
        setRequestSent(true);
        
    }
    
    
    return (
        <div className="flex flex-col">
            {requestSent && <p className="text-center text-green-500">Request Sent!</p>}
            <button onClick={sendDataRequest} className="mb-2 text-indigo-600 hover:text-indigo-900">
                Send Request 
            </button>
            <div className="relative inline-block text-left">
                <div>
                    <button onClick={toggleOpen} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        {selectedDepartment != null ? selectedDepartment.name : 'Options'}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                    </button>
                </div>
                {isOpen && (
                    <>
                        {!department.loading && (
                            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                <div className="py-1" role="none">
                                    {department.departments.map(dep => (
                                        <button onClick={() => {updateSelectedDepartment(dep)}} className="text-gray-700 block px-4 py-2 text-sm hover:text-indigo-900" role="menuitem">{dep.name}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
       
    );
}