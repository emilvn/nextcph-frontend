import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.css";
import { ClerkProvider } from "@clerk/clerk-react";

if (!import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY) {
    throw "Missing Publishable Key";
}

const clerkPubKey = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={clerkPubKey}>
            <App />
        </ClerkProvider>
    </React.StrictMode>
);
