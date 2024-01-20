import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../common/Loader";
import AddDepartmentData from "./AddDepartmentData";
import { useEffect } from "react";
import { loadUserDepData } from "../../state/department-data/actions";
import UserDepInfo from "./UserDepInfo";

export default function UserDepartmentInfo () {
    const {departmentId} = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(store => store.auth.user.uid);
    const department = useSelector(store => store.department);
    const userDepData = useSelector(store => store.departmentData);
    const loading = department.loading;

    let userDepDataReal;

    document.title = 'Loading...';

    let dep;
    if(!loading) {
        dep = department.departments.find(val => val.tag === departmentId);
        userDepDataReal = userDepData[`${userId}-${dep.id}`];
        document.title = dep.name;
    }

    

    useEffect(() => {
        
        if(!loading) {
            if(userDepData[`${userId}-${dep.id}`] === undefined) {
                dispatch(loadUserDepData(dep.id, userId));
            }
        }
        
    }, [loading]);

    if(userDepDataReal === 'loading') {
        return <Loader/>
    }

    if(userDepDataReal === null) {
        return <AddDepartmentData/>;
    }
    
    if(userDepDataReal === undefined) {
        return (
            <>
            </>
        );
    }

    return (
        <UserDepInfo depName={dep.name}/>
    );

}