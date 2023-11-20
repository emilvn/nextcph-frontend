import {useUser} from "@clerk/clerk-react";
import Login from "./containers/Login.tsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {NavBarAdmin, NavBarUser} from "./components/nav.tsx";
import Loading from "./components/loading.tsx";
import Products from "./containers/User/Products.tsx";
import SaleHistory from "./containers/User/SaleHistory.tsx";
import Dashboard from "./containers/Admin/Dashboard.tsx";
import ProductOverview from "./containers/Admin/ProductOverview.tsx";

function App() {
    const {user, isLoaded, isSignedIn} = useUser();

    if (!isLoaded) return (<Loading.LoadingPage/>)

    if (!isSignedIn) return (<Login/>)

    const isAdmin = user?.organizationMemberships?.[0]?.role === "admin";
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
            <NavBarUser/>
            <Routes>
                <Route path="/*" element={<Navigate to={"/user/products"}/>}/>
                <Route path="/user/products" element={<Products/>}/>
                <Route path="/user/history" element={<SaleHistory/>}/>
            </Routes>
        </>
    )
}

function AdminRoutes() {
    return (
        <>
            <NavBarAdmin/>
            <Routes>
                <Route path="/*" element={<Navigate to={"/admin/dashboard"}/>}/>
                <Route path="/admin/dashboard" element={<Dashboard/>}/>
                <Route path="/admin/products" element={<ProductOverview/>}/>
            </Routes>
        </>
    )
}

export default App;

