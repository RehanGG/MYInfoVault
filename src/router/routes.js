import { CiHome, CiSettings } from "react-icons/ci";
import SettingsPage from "../pages/settings/Settings";
import { FiUsers } from "react-icons/fi";
import ListUsers from "../pages/admin/ListUsers";
import { MdCreateNewFolder } from "react-icons/md";
import { FiGitPullRequest } from "react-icons/fi";
import CreateDepartment from "../pages/admin/CreateDepartment";
import { FcDepartment } from "react-icons/fc";
import Derpartments from "../pages/department/Departments";
import DepartmentDetails from "../pages/department/DepartmentDetails";
import HomePage from "../pages/dashboard/Home";
import ListMyRequests from "../pages/requests/ListMyRequests";
import { VscRequestChanges } from "react-icons/vsc";
import AdminRequests from "../pages/admin/AdminRequests";
import RequestDetails from "../pages/admin/RequestDetails";

const adminRoutes = [
    {
        name: 'List Users',
        path: 'admin/list-users',
        icon: FiUsers,
        Component: ListUsers,
        admin: true
    },
    {
        name: 'Data Requests',
        path: 'admin/data-requests',
        icon: VscRequestChanges,
        Component: AdminRequests,
        admin: true,
    },
    {
        name: 'Create Department',
        path: 'admin/create-department',
        icon: MdCreateNewFolder,
        Component: CreateDepartment,
        admin: true
    },
    {
        name: 'Request Details',
        path: 'admin/data-requests/:requestId',
        icon: VscRequestChanges,
        Component: RequestDetails,
        admin: true,
        hide: true
    }
];

export const routes = [
    {
        name: 'Dashboard',
        path: '/',
        icon: CiHome,
        end: true,
        Component: HomePage,
    },
    {
        name: 'Departments',
        path: 'departments',
        icon: FcDepartment,
        Component: Derpartments
    },
    {
        name: 'My Requests',
        path: 'my-requests',
        icon: FiGitPullRequest,
        Component: ListMyRequests 
    },
    {
        name: 'Settings',
        path: 'settings',
        icon: CiSettings,
        Component: SettingsPage
    },
    {
        name: 'Department',
        path: 'department/:departmentId',
        icon: FcDepartment,
        Component: DepartmentDetails,
        hide: true,
    },
    ...adminRoutes,
];
