## About this project

Nula logistics project was created in order to fulfill requirements of the assignment as part of job application process.

GitHub repo: https://github.com/ekatamel/nula_logistics.git

The basic user functionality of the website includes:

-   Registrations, login/logout (app can be used by autenticated users only)
-   Viewing app dashboard with logistics statistics and shortcuts for quick access
-   Displaying all products and filtering by name, price and date, when the product was created
-   Displaying all suppliers and filtering by name and address
-   Displaying all warehouses and filtering by address, supplier and number of total products
-   Displaying warehouse detail with basic info, location (map)
-   Creating new products, suppliers and warehouses (via modal window)
-   Updating exising products, suppliers and warehouses (editing via updatable fields inside a table)
-   Deleting exising products, suppliers and warehouses (inline)
-   Assigning new products to the warehouse with specified quantity

## Tech stack

For the project I used following technologies:

### Backend

PHP & Laravel:

-   setting up database
-   creating DB migrations
-   defining DB models and relationships
-   seeding the database with products, suppliers, warehouses
-   exposing API endpoints for frontend (React) usage
-   filtering data results based on query parameters sent by frontend
-   providing authentication tokens to SPA (Laravel Sanctum)
-   swagger generation (using darkaonline/l5-swagger library)

Database:

-   database engine: MySQL
-   database administration tool: PHP My Admin
-   Database model:
    ![Database model](/public/images/db-model.png)
    Model is available at:
    https://dbdiagram.io/d/63e6bf94296d97641d801850

API

API endpoints for the frontend are handled by specific entity controller (e.g. ProductController, WarehouseController). Routes for these endpoints are provided in api.php.

API documentation could be found in `/storage/api-docs` (api-docs.json or api-docs.yaml). Generated using darkaonline/l5-swagger library

### Frontend

React:

-   routing (React Router)
-   type definition and type checking (TypeScript)
-   rendering pages and components
-   making API requests (React Query) to query data (GET) and mutate (POST, PATCH, DELETE) data. For Mutation own custom hook is created.
-   filtering data for not large amount (e.g. Suppliers)
-   handling authentication workflow

Additional React libraries used in this project:

-   axios - for making AJAX requests
-   Formik - form handling
-   MaterialUI - component library
-   StyledComponents - styling individual components
-   Date FNS - date formatting
-   Notistack - app notifications

Howw React app is rendered in Laravel project:

1. Generic route for all React pages matching everything coming after slash ('/') is defined in web.php

2. ReactAppController calls method renderApp and views react.blade.php upon route hitting

3. View react.blade.php displays only empty div tag with id='app' and includes compiled React application (app.js)

4. Webpack (using Laravel MIX) is instructed to compile index.tsx file entry-point React script (located at resources/js) and convert it to app.js (mentioned in point 3).

5. Input script index.js renders App component, which provides Routes for React application and renders specific component based on URL

## Local development environment

In order to set up local development environment, follow these steps:

Prerequisites: Before you start setting up your local development environment, make sure you have the following installed on your computer:

-   Git
-   Docker

1. Clone the project repository from GitHub:

```shell script
git clone https://github.com/ekatamel/nula_logistics.git
```

2. Navigate to the project directory:

```shell script
cd your-project
```

3. Create a .env file with your project's environment variables. You can use the .env.example file as a template:

```shell script
cp .env.example .env
```

4. Build the Docker containers:

```shell script
docker-compose build
```

5. Start the Docker containers:

```shell script
docker-compose up
```

6. Start backend

```shell script
php artisan serve
```

7. Run frontend

```shell script
npm run dev
```

```shell script
npm run watch
```

8. Go to your localhost to see website, e.g. http://127.0.0.1:8000/

## Possible impovements

-   Write unit and end-to-end tests
-   Set-up CI/CD pipeline
-   Create DB seeders (for quick access to the app with data)
-   Add loader spinners while content is loaded, or page skeletons (loading state could be retreived from useQuery hook)
-   Add pagination in case there is large number of entities (both on frontend and backend side)
-   Set up Prettier, Linter in a project
-   Make authentification more sophisticated (strong password validation, redirect user to URL he/she tried to access before login, token validation e.g. JWT, setting token expiration, handle auth via cookies etc.)
-   Provide frontend validation (apart from backend validation and Formik errors)
-   Define proper schems and references in swagger API documentation
-   Make components more reusable
