import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,} from '@clerk/clerk-react';
import type {PropsWithChildren} from "react";
import {Link} from "react-router-dom";
import {FaLock, FaUnlock} from "react-icons/fa";
import {useState} from "react";

interface NavLinkProps extends PropsWithChildren {
	href: string;
}
function NavLink({ href, children }:NavLinkProps) {
	return (
		<Link to={href} className="text-xs h-full flex p-4 items-center hover:bg-next-darker-orange hover:text-next-white text-next-darker-orange font-semibold transition-colors">
			{children}
		</Link>
	);
}

function NavBar({children}:PropsWithChildren) {
	const [locked, setLocked] = useState<boolean>(true);
	return (
		<>
			<nav className="z-20 fixed left-0 top-0 h-screen w-20 bg-next-white"></nav>
			<nav className="z-20 fixed top-0 left-20 w-[calc(100%-80px)] h-20 bg-next-white flex items-center justify-between">
				<div className="font-bold text-5xl text-next-blue select-none mr-3">vemc<span className='text-next-orange'>&gt;</span></div>
				<div className="flex w-full h-full">
					{children}
				</div>
				<div className="transition-colors flex-shrink-0 h-full w-20 flex items-center justify-center bg-next-blue text-next-darker-orange hover:bg-next-darker-orange hover:text-next-blue cursor-pointer">
					<SignedIn>
						<UserButton afterSignOutUrl="/"/>
					</SignedIn>
					<SignedOut>
						<SignInButton mode={"modal"}>
							<div className="h-full w-full flex justify-center items-center" onMouseEnter={()=> setLocked(false)} onMouseLeave={() => setLocked(true)}>
								{!!locked && <FaLock/>}
								{!locked && <FaUnlock/>}
							</div>
						</SignInButton>
					</SignedOut>
				</div>
			</nav>
			<nav className="z-20 fixed right-0 top-20 h-screen w-20 bg-next-white"></nav>
		</>
	);
}


function NavBarAdmin() {
	return (
		<NavBar>
			<NavLink href="/admin/dashboard">DASHBOARD</NavLink>
			<NavLink href="/admin/products">PRODUKTER</NavLink>
			<NavLink href="/">AFDELING</NavLink>
		</NavBar>
	);

}

function NavBarUser() {
	return (
		<NavBar>
			<NavLink href="/user/products">PRODUKTER</NavLink>
			<NavLink href="/user/history">HISTORIK</NavLink>
			<NavLink href="/">AFDELING</NavLink>
		</NavBar>
	);

}

export {NavBarUser, NavBarAdmin, NavBar}