import { useState } from "react";
import { Outlet, redirect } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import Header from "../../components/common/Header";


export default function Dashboard() {

    document.title = 'Dashboard';

    return (
        <div className="flex h-screen bg-gray-200 font-roboto">
            <Sidebar/>
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header/>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container mx-auto px-6 py-8">
                        <Outlet/>
                    </div>
                </main>
            </div>
            
        </div>
    );
}

export function loader(isAuth) {
    if(isAuth) {
        return null;
    } else {
        return redirect('/login');
    }
}