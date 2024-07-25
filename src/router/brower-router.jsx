import { createBrowserRouter } from "react-router-dom";
import ErrorPage from '../pages/ErrorPage';
import Login from '../pages/authentication/Login';
import CreateAccount from "../pages/authentication/CreateAccount";
import ResetPassword from "../pages/authentication/ResetPassword";
import Dashboard, { loader as dashboardLoader } from "../pages/dashboard/Dashboard";
import {loader as authLaoder, createProfileLoader} from '../pages/authentication/loader';
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import CreateProfile from "../pages/authentication/CreateProfile";

const generateRoutes = user => {
  const generatedRoutes = [];
  const appRoutes = [...routes];

  for(const route of appRoutes) {
    const returnRoute = {path: route.path, element: <route.Component/>};
    if(route.admin && user && user.admin) {
      generatedRoutes.push(returnRoute);
    } else if(!route.admin) {
      generatedRoutes.push(returnRoute);
    }

  }
  return generatedRoutes;
}

const router = (isAuth, user) => createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    element: <Dashboard/>,
    loader: () => dashboardLoader(isAuth, user),
    children: [...generateRoutes(user)],
  },
  {path: '/create-profile', element: <CreateProfile/>, loader: () => createProfileLoader(isAuth, user)},
  {path: '/login', element: <Login/>, loader: () => authLaoder(isAuth)},
  {path: '/create-account', element: <CreateAccount/>, loader: () => authLaoder(isAuth)},
  {path: '/reset-password', element: <ResetPassword/>, loader: () => authLaoder(isAuth)}
]);

export default function CustomRouter() {
  const userData = useSelector(store => store.auth);
  return <RouterProvider router={router(userData.isAuthenticated, userData.user)} />;
}

