import { NavLink } from "react-router-dom";

export default function SidebarItem({children, ItemIcon, link, end = false}) {

    function onClassesRequest({isActive}) {
        if(isActive) {
            return 'flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25';
        } else {
            return 'flex items-center px-6 py-2 mt-4 text-gray-200 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100';
        }
    }

    return (
        <NavLink to={link} className={onClassesRequest} end={end}>
            <ItemIcon size={25}/>
            <span className="mx-3">{children}</span>
        </NavLink>
    );
}