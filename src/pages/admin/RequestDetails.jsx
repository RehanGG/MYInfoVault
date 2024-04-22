import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import { useEffect, useRef, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

export default function RequestDetails() {

    document.title = 'Request Details';

    const {requestId} = useParams();
    const department = useSelector(store => store.department);
    const dep = useRef();
    const currentUserId = useSelector(store => store.auth.user.uid);

    const [loading, setLoading] = useState({status: true, message: 'Getting request details...'});
    const [error, setError] = useState({status: false, message: ''});
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function initialLoad() {
            const data = await getDoc(doc(firestore, 'requests', requestId));
            if(!data.exists()) {
                setLoading(prevState => ({...prevState, status: false}));
                setError({message: 'Request not found!', status: true});
                return;
            }
            if(!data.data().accepted || data.data().requestFrom !== currentUserId) {
                setLoading(prevState => ({...prevState, status: false}));
                setError({message: 'You are not authorized to view this request!', status: true});
                return;
            }
            setLoading(prevState => ({...prevState, message: 'Loading user data...'}));
            const uData = await getDocs(query(collection(firestore, 'departments-data'), 
                where('dep-id', '==', data.data().departmentId),
                where('user-id', '==', data.data().requestTo),
            ));
            if(uData.empty) {
                setLoading(prevState => ({...prevState, status: false}));
                setError({message: 'User has currently not provided the data for this department!', status: true});
                return;
            }
            
            dep.current = department.departments.find(val => val.id === data.data().departmentId);
            setLoading(prevState => ({...prevState, status: false}));
            setUserData(uData.docs[0].data())

        }

        if(!department.loading) {
            initialLoad();
        }

    }, [department.loading]);

    if(department.loading) {
        return <Loader/>;
    }
    return (
        <>
            {loading.status && <p>{loading.message}</p>}
            {error.status && <p>{error.message}</p>}
            {error.status && (
                <Link to={-1} className="text-indigo-600 hover:text-indigo-900 mt-1">
                    Go Back
                </Link>
            )}
            {(!loading.status && !error.status) && (
                <div className="mt-8">
                    <h3 className="text-gray-700 text-2xl mb-8">User Info for {dep.current.name}</h3>
                    <div className="p-6 bg-white rounded-md shadow-md">
                        {dep.current.departmentData.map(depData => (
                            <div key={depData.tag} className="flex flex-col mb-3">
                                <span>{depData.name}</span>
                                <span className="text-xl">{userData[depData.tag]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )

}