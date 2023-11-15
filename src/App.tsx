import {
    ClerkProvider,
    SignedIn,
    SignedOut,
} from "@clerk/clerk-react";
import Login from "./containers/Login.tsx";


if (!import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY) {
    throw "Missing Publishable Key"
}

const clerkPubKey = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

function App() {
    return (
        <ClerkProvider publishableKey={clerkPubKey}>
            <SignedIn>
                <Welcome/>
            </SignedIn>
            <SignedOut>
                <Login/>
            </SignedOut>
        </ClerkProvider>
    );
}

function Welcome() {
    return <div>Hello you are signed in</div>;
}

export default App;