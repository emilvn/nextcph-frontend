import { useUser } from "@clerk/clerk-react"
import Login from "./containers/Login.tsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBarAdmin, NavBarUser } from "./components/nav.tsx"
import Loading from "./components/loading.tsx"
import Products from "./containers/User/Products.tsx"
import SaleHistory from "./containers/User/SaleHistory.tsx"
import Dashboard from "./containers/Admin/Dashboard/Dashboard.tsx"
import ProductOverview from "./containers/Admin/Products/ProductOverview.tsx"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ChannelType } from "./types/channel.types.ts"
import SelectChannel from "./containers/SelectChannel.tsx"

function App() {
    const localStorageChannel: ChannelType | null = localStorage.getItem(
        "channel"
    )
        ? JSON.parse(localStorage.getItem("channel")!)
        : null
    const { user, isLoaded, isSignedIn } = useUser()
    const [channel, setChannel] = useState<ChannelType | null>(
        localStorageChannel
    )

    useEffect(() => {
        localStorage.setItem("channel", JSON.stringify(channel))
    }, [channel])

    if (!isLoaded) return <Loading.LoadingPage />

    if (!isSignedIn) return <Login />

    const isAdmin = user?.organizationMemberships?.[0]?.role === "admin"
    return (
        <>
            <BrowserRouter>
                {!isAdmin && (
                    <UserRoutes
                        channel={channel}
                        setChannel={setChannel}
                    />
                )}
                {isAdmin && (
                    <AdminRoutes
                        channel={channel}
                        setChannel={setChannel}
                    />
                )}
            </BrowserRouter>
        </>
    )
}

interface RoutesProps {
    channel: ChannelType | null
    setChannel: Dispatch<SetStateAction<ChannelType | null>>
}

function UserRoutes({ channel, setChannel }: RoutesProps) {
    return (
        <>
            <NavBarUser channel={channel} />
            <Routes>
                <Route
                    path="/*"
                    element={
                        <SelectChannel
                            setChannel={setChannel}
                            to={"/user/products"}
                        />
                    }
                />
                {!!channel && (
                    <>
                        <Route
                            path="/user/products"
                            element={<Products channel={channel} />}
                        />
                        <Route
                            path="/user/history"
                            element={<SaleHistory channel={channel} />}
                        />
                    </>
                )}
            </Routes>
        </>
    )
}

function AdminRoutes({ channel, setChannel }: RoutesProps) {
    return (
        <>
            <NavBarAdmin channel={channel} />
            <Routes>
                <Route
                    path="/*"
                    element={
                        <SelectChannel
                            setChannel={setChannel}
                            to={"admin/dashboard"}
                        />
                    }
                />
                {!!channel && (
                    <>
                        <Route
                            path="/admin/dashboard"
                            element={<Dashboard channel={channel} />}
                        />
                        <Route
                            path="/admin/products"
                            element={<ProductOverview channel={channel} />}
                        />
                    </>
                )}
            </Routes>
        </>
    )
}

export default App;

