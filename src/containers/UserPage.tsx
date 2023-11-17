import {UserButton, useUser} from "@clerk/clerk-react";

function UserPage() {
    const {user} = useUser();

    const organizationRole = user?.organizationMemberships?.[0]?.role;
    return (
        <>
            <h1>User page</h1>
            <p>the Organization role is {organizationRole}</p>
            <UserButton/>
        </>
    )
}

export default UserPage;