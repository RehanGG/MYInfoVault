import { useState, useEffect } from "react";
import Loader from '../../components/common/Loader';
import {collection, doc, onSnapshot, query, updateDoc} from 'firebase/firestore'
import { firestore } from "../../firebase/firebase";
import SelectDepartmentRequest from "../../components/admin/request/SelectDepartmentRequest";
import { useSelector } from "react-redux";

export default function ListUsers() {


    const currentUserId = useSelector(state => state.auth.user.uid);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    document.title = 'List of Users';

    useEffect(() => {
        let unsubscribe;
        async function initialLoad() {
            unsubscribe = onSnapshot(query(collection(firestore, 'users')), querySnapshot => {
                const tmpUsers = [];
                querySnapshot.forEach((doc) => {
                    tmpUsers.push(doc.data());
                })
                
                setLoading(false);
                setUsers(tmpUsers);
            });
        }
        initialLoad();
        return () => {
            unsubscribe();
        }
    }, []);

    function handleAdminRoleChange(userId, admin) {
        if(admin) {
            updateDoc(doc(firestore, 'users', userId), {admin: false});
        } else {
            updateDoc(doc(firestore, 'users', userId), {admin: true});
        }
    }
    function constructTable() {
        return (
            <div className="flex flex-col mt-8">
                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Info</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">CNIC</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email Verified</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100">Actions</th>
                                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-100">Request</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {users.map(user => (
                                    <tr key={user.uid}>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full object-cover" src={user.imgUrl} alt="User Image" />
                                                </div>

                                                <div className="ml-4">
                                                    <div className="text-sm leading-5 font-medium text-gray-900">{user.fname} {currentUserId == user.uid && '(You)'}</div>
                                                    <div className="text-sm leading-5 text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-500">{user.cnic}</div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{user.emailVerified ? 'Verified' : 'Not Verified'}</span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">{user.admin ? 'Admin' : 'Member'}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                            <button onClick={() => handleAdminRoleChange(user.uid, user.admin)} className="text-indigo-600 hover:text-indigo-900">
                                                {user.admin ? 'Remove Admin' : 'Make Admin'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                                            <SelectDepartmentRequest userId={user.uid}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <h3 className="text-gray-700 text-3xl font-semibold mb-8">List Of Users</h3>
            {loading && <Loader/>}
            {!loading && (
                constructTable()
            )}
        </>
    );
}