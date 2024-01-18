import { redirect } from 'react-router-dom';

export function loader(isAuth) {
    if(isAuth) {
        return redirect('/');
    } 
    return null;
}