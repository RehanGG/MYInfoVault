import { routes } from "./routes";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from '../pages/ErrorPage';
import DummyPage from '../pages/DummyPage';

export const dummyRouter = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage/>,
      element: <DummyPage/>,
      children: [...routes].map((Route) => ({
        path: Route.path,
        element: <DummyPage/>
      }))
    },
    {path: '/create-profile', element: <DummyPage/>},
    {path: '/login', element: <DummyPage/>},
    {path: '/create-account', element: <DummyPage/>},
    {path: '/reset-password', element: <DummyPage/>}
  ]);