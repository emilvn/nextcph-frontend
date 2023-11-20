import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,} from '@clerk/clerk-react';
import {Link} from 'react-router-dom'

function NavBarAdmin() {
  return (
    <div>
        <nav className="fixed top-0 h-20 w-screen bg-next-white p-0">
            <div className="flex items-center justify-center text-next-grey">
              <div className="mr-auto font-mono font-bold text-5xl text-next-blue ">vem<span className='text-next-orange'>c</span></div>
              <div className="flex space-x-96">
                  <Link to="/Dashboard" className="hover:underline">Dashboard</Link>
                  <Link to="/ProductOverview" className="hover:underline">ProductOverview</Link>
              </div>
              <div className=" top-0 h-20 w-20 mx-0 px-0 right-0 flex items-center">
                <SignedIn>
                  <UserButton afterSignOutUrl="/"/>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode={"modal"} />
                </SignedOut>
            </div>
            </div>
        </nav>
        <nav className="fixed right-0 top-20 h-screen w-20 bg-next-white"></nav>
    </div>
  );
  
}

export default NavBarAdmin