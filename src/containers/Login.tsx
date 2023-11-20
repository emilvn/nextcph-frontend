import {SignInButton, SignUpButton} from "@clerk/clerk-react";
import {NavBar} from "../components/nav.tsx";
import PageLayout from "../components/layout.tsx";

function Login() {
    return (
        <>
            <NavBar/>
            <PageLayout>
                <div className="flex justify-center items-center">
                    <div className="relative overflow-clip">
                        <img className="w-auto h-[30rem] rounded-xl" src="/images/Admin.png" alt="Card Image"/>

                        <div className="absolute w-full bottom-0 flex justify-center flex-col gap-4 items-center p-10">
                            <SignUpButton mode={"modal"}>
                                <button
                                    className="bg-next-blue text-next-white rounded-2xl p-4 text-2xl w-60 hover:bg-next-darker-orange">
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
                </div>
            </PageLayout>
        </>
    );
}

export default Login;