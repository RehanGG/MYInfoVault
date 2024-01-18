import { useEffect } from "react";
import InitialLoadingPage from "./pages/loading/InitialLoadingPage";
import { auth } from "./firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { commonActions } from "./state/common/slice";
import { initialUserLoad } from './state/auth/actions';
import CustomRouter from "./router/brower-router";
import { RouterProvider } from "react-router-dom";
import { dummyRouter } from './router/dummy-router';

export default function App() {

  const dispatch = useDispatch();
  const dummyCheckUp = useSelector(state => state.common.dummyCheckUp);
  const initialLoad = useSelector(state => state.common.initialLoad);

  useEffect(() => {
    if(initialLoad && !dummyCheckUp) {
      initialLoadFn();
    }
  }, [dummyCheckUp]);

  if(dummyCheckUp) {
    return <RouterProvider router={dummyRouter}/>;
  }

  async function initialLoadFn() {
    await auth.authStateReady();
    if(auth.currentUser) {
        dispatch(initialUserLoad(auth.currentUser.uid));
    } else {
      dispatch(commonActions.toggle());
    }
  }

  if(initialLoad) {
    return <InitialLoadingPage/>;
  }

  return (
    <CustomRouter/>
  );
}