import {SignInButton} from "@clerk/clerk-react";

function Login() {
    return (
        <>
            <h1>Login</h1>
            <div className="bg-black flex justify-center items-center border-2 border-black ">
                <SignInButton mode={"modal"}>
                    <button className="bg-amber-500">
                        Log ind som Admin
                    </button>
                </SignInButton>
                <SignInButton mode={"modal"}>
                    <button className="bg-amber-950">
                        Log ind
                    </button>
                </SignInButton>
            </div>
        </>
    );
}

export default Login;