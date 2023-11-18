import React from 'react'
import { useUser } from "@clerk/clerk-react";

function Products() {

  const { isSignedIn, user, isLoaded } = useUser();
  if (!isLoaded) {
    return null;
  } 
 
  if (isSignedIn) {
    return <div>Hello {user.username}!</div>; 
  }
 
  return <div>Not signed in</div>;
}

export default Products