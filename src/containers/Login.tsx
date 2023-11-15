import {SignInButton} from "@clerk/clerk-react";

function Login() {
    return (
        <div className="flex items-center justify-around me-auto min-h-screen">
            <div className="rounded-2xl shadow-sm border-box border w-60">
                <img className="w-full rounded" src="../../public/images/Admin.png" alt=""/>
                <SignInButton mode={"modal"}>
                    <button className="mt-20 rounded bg-next-darker-orange p-2 mx-11">
                        Log ind
                    </button>
                </SignInButton>
            </div>
            <div className="rounded-2xl shadow-sm border-box border w-60 p-10">
                <img src="../../public/images/Frisør-lærling.png" alt=""/>
                <img src="../../public/images/Kosemitik-lærling.png" alt=""/>
                <SignInButton mode={"modal"}>
                    <button className="rounded bg-next-darker-orange p-2 m-10">
                        Log ind
                    </button>
                </SignInButton>
            </div>
        </div>
    );
}

export default Login;