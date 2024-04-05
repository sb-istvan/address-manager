# Address Manager

This is a practice project for managing billing and delivery addresses of an imaginary webshop.

On the home page all addresses are visible.
Adding new address is possible only after logging in. This is either possible via GitHub login or with username + password combination.

Technologies:

- JS framework: Vue.js + Nuxt
- UI kit: PrimeVue
- Database: SQLite
- ORM: Knex
- Authentication: Sidebase Nuxt Auth
- Search: Fuse.js

## Setup

After cloning the repository:

```bash
npm install
```

This will also create the database with one sample row.

## Development Server

Start the development server on `http://localhost:3000` with:

```bash
npm run dev
```

In order for the GitHub login to work locally, you shall add a new OAuth application via https://github.com/settings/applications/new. Authorization callback URL is `http://localhost:3000/api/auth/callback/github`.  
Then create your local `.env` file by running `cp .env.example .env` and paste the generated GitHub Client ID and GitHub Client Secret into your `.env` file.

For logging in with credentials:

Username: address-admin  
Password: addnew2

## TODO

Planned in this order:

☑ Search function  
☐ Proper navbar  
☐ Pagination for the List of addresses  
☐ Address deleting function  
☐ Address editing function  
☐ Using Prisma instead of Knex  
☐ Signup function  
☐ Deploying to a server
