import {UserButton, useUser} from "@clerk/clerk-react";

export function AdminPage() {
    const {user} = useUser();

    const organizationRole = user?.organizationMemberships?.[0]?.role;
    return (
        <>
            <h1>Admin page</h1>
            <p>the Organization role is {organizationRole}</p>
            <UserButton afterSignOutUrl="/"/>
        </>
    )
}
