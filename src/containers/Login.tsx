import {SignInButton} from "@clerk/clerk-react";

function Login() {
    return (
        <div
            className="flex items-center justify-around min-h-screen">
            <div className="flex-row max-w-4xl mx-4">
                <div className="relative overflow-clip">
                    <img className="w-full h-[40rem] rounded" src="/images/Admin.png" alt="Card Image"/>

                    <div className="absolute w-full bottom-0 flex justify-center items-center p-10">
                        <SignInButton mode={"modal"}>
                            <button
                                className="bg-next-darker-orange text-white rounded-xl p-4 text-2xl w-60">
                                Log ind Admin
                            </button>
                        </SignInButton>
                    </div>
                </div>
            </div>

            <div className="flex-row max-w-4xl mx-4">
                <div className="relative">
                    <img className="w-full h-[40rem] rounded" src="/images/Kosmetik-Frisør.png"
                         alt="Card Image"/>

                    <div className="absolute w-full bottom-0 flex justify-center items-center p-10">
                        <SignInButton mode={"modal"}>
                            <button
                                className="bg-next-blue text-white rounded-xl p-4 text-2xl w-60 border border-slate-200">
                                Log ind
                            </button>
                        </SignInButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;