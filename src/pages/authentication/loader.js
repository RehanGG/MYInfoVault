import { redirect } from 'react-router-dom';

export function loader(isAuth) {
    if(isAuth) {
        return redirect('/');
    } 
    return null;
}

export function createProfileLoader(isAuth, user) {
    if(isAuth && user === null) {
        return null;
    } 
    
    if(isAuth && user) {
        return redirect('/');
    }

    return redirect('/login');
}