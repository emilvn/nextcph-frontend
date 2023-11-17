import {Test} from "./Test.tsx";
import {SignInButton, useUser} from "@clerk/clerk-react";

function App() {
    const {isSignedIn, isLoaded:userIsLoaded, user} = useUser();

    if(!userIsLoaded) return (<div>Loading...</div>);
    if(!isSignedIn) return (<div>
        <SignInButton>
            <button>
                Sign up
            </button>
        </SignInButton>
    </div>);
    if(!user || !user.id) return (<div>Something went wrong</div>);

    return (
        <>
            <Test user_id={user.id}/>
        </>
  )
}

export default App
