import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function UserDepInfo () {
    const {departmentId} = useParams();
    const userId = useSelector(store => store.auth.user.uid);
    const department = useSelector(store => store.department.departments.find(val => val.tag === departmentId));
    const userDepData = useSelector(store => store.departmentData);
    const userInfo = userDepData[`${userId}-${department.id}`];
    
    

    document.title = `My Info - ${department.name}`;

    return (
        <div className="mt-8">
            <h3 className="text-gray-700 text-3xl font-semibold mb-8">My Info</h3>
            <div className="p-6 bg-white rounded-md shadow-md">
                {department.departmentData.map(depData => (
                    <div key={depData.tag} className="flex flex-col mb-3">
                        <span>{depData.name}</span>
                        <span className="text-xl">{userInfo[depData.tag]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}