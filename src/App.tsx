import React from 'react'
import NavBarUser from "./components/NavBarUser"
import NavBarAdmin from './components/NavBarAdmin'
import { BrowserRouter as Router, Routes, Route}  from 'react-router-dom'
import Products from './containers/Products'
import ProductHistory from './containers/ProductHistory'
import Dashboard from './containers/Dashboard'
import ProductOverview from './containers/ProductOverview'
import { ClerkProvider } from "@clerk/clerk-react";
import {SignUp} from "@clerk/clerk-react";
import './styles/globals.css'

function App(){
  if (!import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  } 

  const clerkPubKey:string = import.meta.env.VITE_APP_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div>
        <Router>
          <NavBarUser />
            <div className="mt-20 mr-20">
              <Routes>
                <Route path="/sign-up/*"element={<SignUp routing="path" path="/sign-up" />}/>
                <Route path="/products" element={<Products />} />
                <Route path="/ProductHistory" element={<ProductHistory />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/ProductOverview" element={<ProductOverview />} />
              </Routes>
            </div>
        </Router>
      </div>
    </ClerkProvider>
  )
}

export default App;