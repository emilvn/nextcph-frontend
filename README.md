# Next CPH Frontend

## First year exam project, KEA Datamatiker - December 2023

### Segments

- [Deployed frontend](#deployed-frontend)
- [Installation](#installation)
- [Setting up Clerk](#setting-up-clerk)
- [Setting up admin user](#setting-up-admin-user)

### Deployed frontend

-

### Installation

1. Clone the repository

```bash
git clone https://github.com/emilvn/nextcph-frontend.git
```

2. Enter the directory

```bash
cd nextcph-frontend
```

3. Install dependencies

```bash
npm install
```

4. Create a .env file in the root of the project and add a VITE_BACKEND_URL variable that points to your local backend,
   or the deployed backend

- Local backend

```bash
VITE_BACKEND_URL=http://localhost:3000
```

- Deployed backend

```bash
VITE_BACKEND_URL=https://nextcph-backend.azurewebsites.net
```

4b. To run the application on your own machine you also need a Clerk publishable key. You can get one by creating an
account on https://clerk.dev, see the Clerk section below for more information.

```bash
VITE_APP_CLERK_PUBLISHABLE_KEY=clerk_public_key
```

5. Run the server in development mode

```bash
npm run dev
```

Now the frontend should be running.

### Setting up Clerk

1. Create an account on https://clerk.dev
2. Create a new Clerk application
3. Go to the settings tab and copy the publishable key
4. Add the publishable key to your .env file

```bash
VITE_APP_CLERK_PUBLISHABLE_KEY=clerk_public_key
```

5. Go to the sign in methods tab and enable the email/password sign in method
   Now you should be able to sign in with Clerk on the frontend. However you will not be able to sign in as admin, as
   you have not set up an admin user yet.

#### Setting up admin user

1. Go to the organizations tab and create a new organization called "admin"
2. Go to the users tab and create a new user
3. Go to the organizations tab and add the user to the admin organization
   Now you should be able to sign in as admin with the user you created

