# Macquarie Telecom Group - Teams App

This is a web application that primarily extends MTGs tools and services to Microsoft Teams App.

## Getting Started

First clone this repository to your local machine.
Make sure you have at least NodeJS version 20 installed on your local machine.
Then navigate to the root directory of the repository to install the dependencies.

```bash
npm install
```

### Running on Local Dev (Teams App)

First, run the local development server

```bash
npm run dev:teams
```

Then install the MTG - Teams App in Microsoft Teams under

```bash
Apps > Manage your apps > Upload an app > Upload a custom app
```

The app package is found in the repository located at `public/install/package.local.zip`

You can now start editing the pages.
The page auto-updates as you edit the file.

### Running on Local Dev (Browser App)

First, make sure you have the correct env variable value for `AZURE_CLIENT_ID`.
Then, make sure you have the redirect URI matches these values on your Azure App Configuration

```bash
AUTH_LOGIN_REDIRECT_URI=http://localhost:3000/auth/login-callback
AUTH_LOGOUT_REDIRECT_URI=http://localhost:3000
```

Lastly, run the local development server

```bash
npm run dev:web
```

Navigate to [http://localhost:3000](http://localhost:3000) on your browser to access the app.

### Running on Local Docker (Browser App)

In the root directory check for the `docker-compose.yaml`
First, make sure you have the correct env variable value for `AZURE_CLIENT_ID`.
Then, make sure you have the redirect URI matches these values on your Azure App Configuration

```bash
AUTH_LOGIN_REDIRECT_URI=http://localhost:3000/auth/login-callback
AUTH_LOGOUT_REDIRECT_URI=http://localhost:3000
```

Build the image

```bash
docker-compose build
```

Start the container

```bash
docker-compose up -d
```

#### Tech References

[NextJS](https://nextjs.org/docs) - Core/Routing/Bundling
[React](https://react.dev/) - State/Dom management
[tailwindcss](https://tailwindcss.com/) - Styling library
[shadcn/ui](https://ui.shadcn.com/) - Component library
[zod](https://www.npmjs.com/package/zod) - Schema builder
