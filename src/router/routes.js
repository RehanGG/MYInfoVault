import { CiHome, CiSettings } from "react-icons/ci";
import SettingsPage from "../pages/settings/Settings";
import { FiUsers } from "react-icons/fi";
import ListUsers from "../pages/admin/ListUsers";

const adminRoutes = [
    {
        name: 'List Users',
        path: 'admin/list-users',
        icon: FiUsers,
        Component: ListUsers,
        admin: true
    }
];

export const routes = [
    {
        name: 'Dashboard',
        path: '/',
        icon: CiHome,
        end: true,
    },
    {
        name: 'Settings',
        path: 'settings',
        icon: CiSettings,
        Component: SettingsPage
    },
    ...adminRoutes,
];
