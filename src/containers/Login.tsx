import {SignInButton} from "@clerk/clerk-react";

function Login() {
    return (
        <div className="flex flex-col justify-around me-auto p-2 items-center min-h-screen">
            <SignInButton mode={"modal"}>
                <button className="rounded bg-red-500 p-2">
                    Log ind som Admin
                </button>
            </SignInButton>
            <SignInButton mode={"modal"}>
                <button className="rounded bg-red-500 p-2">
                    Log ind
                </button>
            </SignInButton>
        </div>
    );
}

export default Login;