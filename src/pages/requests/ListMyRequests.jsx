import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import RequestName from "../../components/request/RequestName";
import { requestTime } from "../../utils/utils";

export default function ListMyRequests() {

    document.title = 'My Requests';

    const department = useSelector(state => state.department);
    const userId = useSelector(state => state.auth.user.uid);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe;
        async function initialLoad() {
            unsubscribe = onSnapshot(query(collection(firestore, 'requests'), where('requestTo', '==', userId), orderBy("requestTime", "desc")), querySnapshot => {
                const tmpRequests = [];
                querySnapshot.forEach((doc) => {
                    tmpRequests.push({docId: doc.id, ...doc.data()});
                })
                
                setLoading(false);
                setRequests(tmpRequests);
            });
        }
        if(!department.loading) {
            initialLoad();
        }
        return () => {
            if(unsubscribe) {
                unsubscribe();
            }
        }
    }, [department.loading]);

    if(department.loading) {
        return (
            <Loader/>
        );
    }

    function handleAccessChange(docId, accepted) {
        updateDoc(doc(firestore, 'requests', docId), {accepted: !accepted});
    }


    function RequestsTable() {
        return (
            <div className="flex flex-col mt-8">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Request From</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100"></th>
                                
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {requests.map(request => {
                                
                                    const departmentData = department.departments.find(dep => dep.id === request.departmentId);
                                    return (
                                        <tr key={request.docId}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 font-medium text-gray-900">{departmentData.name}</div>      
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-500">
                                                    <RequestName userId={request.requestFrom}/>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-500">
                                                    {requestTime(request.requestTime)}
                                                </div>      
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                <button onClick={() => {handleAccessChange(request.docId, request.accepted);}} className="text-indigo-600 hover:text-indigo-900">
                                                    {request.accepted ? 'Remove Access' : 'Give Access'}
                                                </button>
                                            </td>
                                        
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <h3 className="text-gray-700 text-3xl font-semibold mb-8">My Requests</h3>
            {loading && <Loader/>}
            {!loading && <RequestsTable/>}
        </>
    );
}