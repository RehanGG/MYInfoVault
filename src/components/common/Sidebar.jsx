import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../state/auth/slice';
import { auth } from "../../firebase/firebase";
import SidebarItem from "./SiderbarItem";
import { routes } from "../../router/routes";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    function handleLogout() {
        navigate('/');
        auth.signOut();
        dispatch(authActions.logout());
    }

    return (
        <div className='fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0'>
            <div className="flex items-center justify-center mt-8">
                <div className="flex flex-col items-center">
                    <span className="mx-2 text-2xl font-semibold text-white">MYInfoVault</span>
                    <span className="mx-2 text-sm text-gray-400">Secured Information!</span>
                </div>
            </div>

            <nav className="mt-10">
                {routes.map(route => {
                    const item = (<SidebarItem key={route.path} end={route.end} link={route.path} ItemIcon={route.icon}>{route.name}</SidebarItem>);
                    if(route.admin && user && user.admin) {
                        return item;       
                    } else if(!route.admin) {
                        return item;
                    }
                })}
                <button onClick={handleLogout} className="w-full flex items-center px-6 py-2 mt-4 text-white bg-red-600 bg-opacity-25 hover:bg-red-600 hover:bg-opacity-35 hover:text-gray-100" href="/ui-elements">
                    <IoIosLogOut size={25}/>
                    <span className="mx-3">Logout</span>
                </button>

            </nav>
        </div>
    );
}