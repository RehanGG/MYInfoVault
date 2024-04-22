import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { useSelector } from "react-redux";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import RequestName from "../../components/request/RequestName";
import { requestTime } from "../../utils/utils";
import { Link } from "react-router-dom";

export default function AdminRequests() {
    document.title = 'Admin Requests';
    const department = useSelector(state => state.department);
    const userId = useSelector(state => state.auth.user.uid);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe;
        async function initialLoad() {
            unsubscribe = onSnapshot(query(collection(firestore, 'requests'), where('requestFrom', '==', userId), orderBy("requestTime", "desc")), querySnapshot => {
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

    function RequestsTable() {
        return (
            <div className="flex flex-col mt-8">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Request To</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                                                    <RequestName userId={request.requestTo}/>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-500">
                                                    {requestTime(request.requestTime)}
                                                </div>      
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.accepted ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{request.accepted ? 'Accessible' : 'Pending'}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                                {request.accepted && (
                                                    <Link to={request.docId} className="text-indigo-600 hover:text-indigo-900">
                                                        View
                                                    </Link>
                                                )}
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
            <h3 className="text-gray-700 text-3xl font-semibold mb-8">Requests sent by you</h3>
            {loading && <Loader/>}
            {!loading && <RequestsTable/>}
        </>
    );
}