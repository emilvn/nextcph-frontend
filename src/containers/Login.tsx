import {SignInButton, SignUpButton} from "@clerk/clerk-react";
import {NavBar} from "../components/nav.tsx";
import PageLayout from "../components/layout.tsx";

function Login() {
    return (
        <>
            <NavBar channel={null}/>
            <PageLayout>
                <div className="flex items-center bg-[url('/images/Admin.png')] w-full min-h-screen bg-cover bg-center">
                    <div className="flex max-md:flex-col justify-center items-center max-md:h-[75vh] h-[50vh] w-full">
                        <div className="flex gap-8 flex-col h-[50vh] w-full justify-center bg-next-blue">
                            <h2 className="text-next-darker-orange text-3xl font-bold md:ml-8">
                                Kom i gang med at sælge i dag
                            </h2>
                            <SignUpButton mode={"modal"}>
                                    <button
                                        className="btn-blue font-bold p-4 text-2xl w-60 md:ml-8">
                                        Opret bruger
                                    </button>
                            </SignUpButton>
                        </div>
                        <div className="flex gap-8 h-[50vh] flex-col w-full justify-center bg-next-darker-orange">
                            <h2 className="text-next-blue text-3xl font-bold md:ml-8">
                                Har du allerede en bruger?
                            </h2>
                            <SignInButton mode={"modal"}>
                                <button
                                    className="btn-orange md:ml-8 font-bold p-4 text-2xl w-60">
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