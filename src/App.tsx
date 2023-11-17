import {useUser} from "@clerk/clerk-react";
import Login from "./containers/Login.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Loading from "./containers/Loading.tsx";
import {AdminPage} from "./containers/AdminPage.tsx";
import UserPage from "./containers/UserPage.tsx";
import UserNavbar from "./components/UserNavbar.tsx";
import AdminNavbar from "./components/AdminNavbar.tsx";
import adminNavbar from "./components/AdminNavbar.tsx";


function App() {
    const {user, isLoaded, isSignedIn} = useUser();

    if (!isLoaded) return (<Loading/>)

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
/*<Route path="/" element={<Navigate to={isAdmin ? "/admin" : "/user"}/>}/>
<Route path="/admin" element={<AdminPage/>}/>
<Route path="/user" element={<UserPage/>}/>*/
