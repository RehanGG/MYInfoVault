import { CiHome, CiSettings, CiCircleList } from "react-icons/ci";
import SettingsPage from "../pages/settings/Settings";
import { FiUsers } from "react-icons/fi";
import ListUsers from "../pages/admin/ListUsers";
import { MdCreateNewFolder } from "react-icons/md";
import { FiGitPullRequest } from "react-icons/fi";
import CreateDepartment from "../pages/admin/CreateDepartment";
import { FcDepartment, FcSupport } from "react-icons/fc";
import Derpartments from "../pages/department/Departments";
import DepartmentDetails from "../pages/department/DepartmentDetails";
import HomePage from "../pages/dashboard/Home";
import ListMyRequests from "../pages/requests/ListMyRequests";
import { VscRequestChanges } from "react-icons/vsc";
import AdminRequests from "../pages/admin/AdminRequests";
import RequestDetails from "../pages/admin/RequestDetails";
import CreateTicket from "../pages/ticket/CreateTicket";
import ListTicketsPage from "../pages/ticket/ListTicketsPage";
import ViewTicketDetail from "../pages/ticket/ViewTicketDetail";
import ListTicketsAdmin from "../pages/admin/ListTicketsAdmin";
import AdminTicketDetail from "../pages/admin/AdminTicketDetail";

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
        name: 'Support Tickets',
        path: 'admin/admin-tickets',
        icon: CiCircleList,
        Component: ListTicketsAdmin,
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
    },
    {
        name: 'Support Tickets',
        path: 'admin/admin-tickets/:ticketId',
        icon: CiCircleList,
        Component: AdminTicketDetail,
        admin: true,
        hide: true
    },
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
        name: 'List Tickets',
        path: 'list-tickets',
        icon: CiCircleList,
        Component: ListTicketsPage 
    },
    {
        name: 'Create a Ticket',
        path: 'create-ticket',
        icon: FcSupport,
        Component: CreateTicket 
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
    {
        name: 'List Tickets',
        path: 'list-tickets/:ticketId',
        icon: CiCircleList,
        Component: ViewTicketDetail,
        hide: true 
    },
    ...adminRoutes,
];
