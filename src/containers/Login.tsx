import {SignInButton, SignUpButton} from "@clerk/clerk-react";
import {NavBar} from "../components/nav.tsx";
import PageLayout from "../components/layout.tsx";

function Login() {
    return (
        <>
            <NavBar/>
            <PageLayout>
                <div className="flex items-center bg-[url('/images/Admin.png')] w-full min-h-screen bg-cover bg-center">
                    <div className="flex max-md:flex-col justify-center items-center max-md:h-[75vh] h-[50vh] w-full">
                        <div className="flex gap-8 flex-col h-[50vh] w-full justify-center items-center bg-next-blue">
                            <h2 className="text-next-darker-orange text-3xl font-bold">
                                Kom igang med at sælge i dag
                            </h2>
                            <SignUpButton mode={"modal"}>
                                    <button
                                        className="bg-next-blue border-2 border-next-darker-orange text-next-darker-orange font-bold p-4 text-2xl w-60 hover:bg-next-darker-orange hover:text-next-blue transition-colors">
                                        Opret bruger
                                    </button>
                            </SignUpButton>
                        </div>
                        <div className="flex gap-8 h-[50vh] flex-col w-full justify-center items-center bg-next-darker-orange">
                            <h2 className="text-next-blue text-3xl font-bold">
                                Har du allerede en bruger?
                            </h2>
                            <SignInButton mode={"modal"}>
                                <button
                                    className="bg-next-darker-orange text-next-blue font-bold p-4 text-2xl w-60 hover:bg-next-blue hover:text-next-darker-orange border-2 border-next-blue transition-colors">
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