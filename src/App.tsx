import {
    ClerkProvider, RedirectToSignIn,
    SignedIn,
    SignedOut,
} from "@clerk/clerk-react";
import {AdminOrUserPage} from "./containers/AdminOrUserPage.tsx";


if (!import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY) {
    throw "Missing Publishable Key"
}

const clerkPubKey = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

function App() {
    return (
        <ClerkProvider publishableKey={clerkPubKey}>
            <SignedIn>
                <AdminOrUserPage/>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn/>
            </SignedOut>
        </ClerkProvider>
    );
}


export default App;