import {SignInButton, SignUpButton} from "@clerk/clerk-react";
import {NavBar} from "../components/nav.tsx";
import PageLayout from "../components/layout.tsx";

function Login() {
    return (
        <>
            <NavBar/>
            <PageLayout>
                <div className="flex justify-center items-center bg-[url('/images/Admin.png')] w-full min-h-screen bg-cover bg-center">

                    <div className="flex flex-col gap-8 justify-center items-center overflow-clip h-80 w-80 bg-next-grey bg-opacity-50 rounded-xl backdrop-blur-lg">
                            <SignUpButton mode={"modal"}>
                                <button
                                    className="bg-next-blue text-next-white rounded-2xl p-4 text-2xl w-60 hover:bg-slate-950">
                                    Opret bruger
                                </button>
                            </SignUpButton>
                            <SignInButton mode={"modal"}>
                                <button
                                    className="bg-next-orange text-next-white rounded-2xl p-4 text-2xl w-60 hover:bg-next-darker-orange">
                                    Log ind
                                </button>
                            </SignInButton>
                    </div>
                </div>
            </PageLayout>
        </>
    );
}

export default Login;