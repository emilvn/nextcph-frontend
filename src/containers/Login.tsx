import {SignInButton} from "@clerk/clerk-react";

function Login() {
    return (
        <div
            className="flex items-center justify-center min-h-screen bg-next-orange opacity-80">
            <div className="flex-row max-w-4xl mx-4">
                <div className="relative overflow-clip border-black border-2">
                    <img className="w-full h-[30rem] rounded" src="/images/Admin.png" alt="Card Image"/>

                    <div className="absolute w-full bottom-0 flex justify-center items-center p-10">
                        <SignInButton mode={"modal"}>
                            <button
                                className="bg-next-darker-orange text-white rounded-xl p-4 text-2xl w-60 hover:bg-next-orange">
                                Log ind Admin
                            </button>
                        </SignInButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;