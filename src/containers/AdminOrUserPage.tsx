import {UserButton, useUser} from "@clerk/clerk-react";

export function AdminOrUserPage() {
    const {user} = useUser();

    const organizationRole = user?.organizationMemberships?.[0]?.role;
    if (organizationRole === "admin") {
        return (
            <>
                <h1>Admin page</h1>
                <p>the Organization role is {organizationRole}</p>
                <UserButton/>
            </>
        );
    } else {
        return (
            <>
                <h1>User page</h1>
                <p>the Organization role is {organizationRole}</p>
                <UserButton/>
            </>
        )
    }
}
