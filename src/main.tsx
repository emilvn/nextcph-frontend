import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import {ClerkProvider} from "@clerk/clerk-react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ClerkProvider publishableKey={import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY}>
            <App />
      </ClerkProvider>
  </React.StrictMode>,
)
