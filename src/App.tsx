import {useUser} from "@clerk/clerk-react";
import Login from "./containers/Login.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AdminPage} from "./containers/AdminPage.tsx";
import UserPage from "./containers/UserPage.tsx";
import UserNavbar from "./components/UserNavbar.tsx";
import AdminNavbar from "./components/AdminNavbar.tsx";
import Loading from "./components/Loading";

function App() {
    const {user, isLoaded, isSignedIn} = useUser();

    if (!isLoaded) return (<Loading.LoadingPage/>)

    if (!isSignedIn) return (<Login/>)

    const isAdmin = user?.organizationMemberships?.[0].role === "admin";
    return (
        <>
            <BrowserRouter>
                {isAdmin ? <AdminRoutes/> : <UserRoutes/>}
            </BrowserRouter>
        </>
    );

}


function UserRoutes() {
    return (
        <>
            <UserNavbar/>
            <Routes>
                <Route path="/" element={<Navigate to={"/user"}/>}/>
                <Route path="/user" element={<UserPage/>}/>
            </Routes>
        </>
    )
}

function AdminRoutes() {
    return (
        <>
            <AdminNavbar/>
            <Routes>
                <Route path="/" element={<Navigate to={"/admin"}/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
        </>
    )
}

export default App;

