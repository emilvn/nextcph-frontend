import { useUser } from "@clerk/clerk-react";
import Login from "./containers/Login.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBarAdmin, NavBarUser } from "./components/nav.tsx";
import Loading from "./components/loading.tsx";
import Products from "./containers/User/Products.tsx";
import SaleHistory from "./containers/User/SaleHistory.tsx";
import Dashboard from "./containers/Admin/Dashboard.tsx";
import ProductOverview from "./containers/Admin/ProductOverview.tsx";
import { Dispatch, SetStateAction, useState } from "react";
import { ChannelType } from "./types/channel.types.ts";
import SelectChannelUser from "./containers/User/SelectChannelUser.tsx";
import SelectChannelAdmin from "./containers/Admin/SelectChannelAdmin.tsx";

function App() {
    const { user, isLoaded, isSignedIn } = useUser();
    const [channel, setChannel] = useState<ChannelType>("COSMETIC");

    if (!isLoaded) return (<Loading.LoadingPage />)

    if (!isSignedIn) return (<Login />)

    const isAdmin = user?.organizationMemberships?.[0]?.role !== "admin";
    return (
        <>
            <BrowserRouter>
                {!isAdmin && <UserRoutes channel={channel} setChannel={setChannel} />}
                {!!isAdmin && <AdminRoutes channel={channel} setChannel={setChannel} />}
            </BrowserRouter>
        </>
    );

}

interface RoutesProps {
    channel: ChannelType;
    setChannel: Dispatch<SetStateAction<ChannelType>>
}

function UserRoutes({ channel, setChannel }: RoutesProps) {
    return (
        <>
            <NavBarUser />
            <Routes>
                <Route path="/" element={<SelectChannelUser setChannel={setChannel} />} />
                <Route path="/user/products" element={<Products channel={channel} />} />
                <Route path="/user/history" element={<SaleHistory channel={channel} />} />
            </Routes>
        </>
    )
}

function AdminRoutes({ channel, setChannel }: RoutesProps) {
    return (
        <>
            <NavBarAdmin />
            <Routes>
                <Route path="/*" element={<SelectChannelAdmin setChannel={setChannel} />} />
                <Route path="/admin/dashboard" element={<Dashboard channel={channel} />} />
                <Route path="/admin/products" element={<ProductOverview channel={channel} />} />
            </Routes>
        </>
    )
}

export default App;

