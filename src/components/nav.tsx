import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton
} from "@clerk/clerk-react"
import type { PropsWithChildren, ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaLock, FaUnlock } from "react-icons/fa"
import { useState } from "react"
import type { ChannelType } from "../types/channel.types.ts"
import { dicts } from "../helpers/dicts.ts"

interface NavLinkProps {
    href: string
    children: ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
    const { pathname } = useLocation()
    const isActive = pathname === href

    return (
        <Link
            to={href}
            className={`text-xs h-full flex p-4 items-center text-next-darker-orange font-semibold transition-colors 
   						 hover:bg-next-darker-orange hover:text-next-white 
   						 ${isActive ? "border-[1.5px] border-next-darker-orange" : ""}`}
        >
            {children}
        </Link>
    )
}

function NavBar({
    children,
    channel
}: PropsWithChildren<{ channel: ChannelType | null }>) {
    const [locked, setLocked] = useState<boolean>(true)
    return (
        <>
            <nav className="z-20 fixed left-0 top-0 h-screen w-20 bg-next-white max-md:hidden"></nav>
            <nav className="z-20 fixed top-0 max-md:w-full md:left-20 w-[calc(100%-80px)] h-20 bg-next-white flex items-center justify-between">
                <div className="font-bold text-5xl text-next-blue select-none mr-3">
                    vemc<span className="text-next-orange">&gt;</span>
                </div>
                <div className="flex w-full h-full">{children}</div>
                <div className="mr-3">
                    {channel && (
                        <h2 className="text-next-blue text-ml font-bold">
                            {dicts[channel]}
                        </h2>
                    )}
                </div>
                <div className="transition-colors flex-shrink-0 h-full w-20 flex items-center justify-center bg-next-blue text-next-darker-orange hover:bg-next-darker-orange hover:text-next-blue cursor-pointer">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode={"modal"}>
                            <div
                                className="h-full w-full flex justify-center items-center"
                                onMouseEnter={() => setLocked(false)}
                                onMouseLeave={() => setLocked(true)}
                            >
                                {!!locked && <FaLock />}
                                {!locked && <FaUnlock />}
                            </div>
                        </SignInButton>
                    </SignedOut>
                </div>
            </nav>
            <nav className="z-20 fixed right-0 top-20 h-screen w-20 bg-next-white max-md:hidden"></nav>
        </>
    )
}

function NavBarAdmin({ channel }: { channel: ChannelType | null }) {
    return (
        <NavBar channel={channel}>
            <NavLink href="/admin/dashboard">DASHBOARD</NavLink>
            <NavLink href="/admin/products">PRODUKTER</NavLink>
            <NavLink href="/">AFDELING</NavLink>
        </NavBar>
    )
}

function NavBarUser({ channel }: { channel: ChannelType | null }) {
    return (
        <NavBar channel={channel}>
            <NavLink href="/user/products">PRODUKTER</NavLink>
            <NavLink href="/user/history">HISTORIK</NavLink>
            <NavLink href="/">AFDELING</NavLink>
        </NavBar>
    )
}

export {NavBarUser, NavBarAdmin, NavBar}