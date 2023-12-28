# Basic User Management System

## Description

Basic user management system built using Nestjs, Prisma, PostgreSQL, and Docker.

it exposes multiple endpoints to create, update and authenticate users and also to check the health of the database connection status.


## Running the app

1. Clone the repository using `git clone` command.

2. Create an `.env` file in the app root directory with two entries.
  - `DATABASE_URL` which is the postgresql database server url.
  - `JWT_SECRET` which is the secret used to generate the JWTs.

3. Build a docker image with this command, from inside the project directory

```sh
$ docker build -t xr-users .
```

4. Run the docker container

```sh
$ sudo docker run -d --network host  --name xr-users xr-users
```

5. Access the running app `Open API` page on the localhost [[http://localhost:3000/api/]]


## API Documentation

> For more detailed api documentaion visit the OpenAPI swagger page. <br />
> You will find details about each endpoint how to call it and about the data schemas it accepts.

- `GET /api` : public swagger OpenAPI page.
- `GET /healthz` : protected endpoint to check database connection health.
- `POST /auth/login` : public endpoint for users login using email and password.
  ```ts
  // it accepts body 

  {
    email: string,
    password: string
  }

  ```

- `POST /users` : public endpoint to register new users.
  ```ts
  // it accepts body
  
  {
    name: string,
    email: string,
    password: string
  }


  ```

- `GET /users` : protected endpoint to get the profile of the authenticated user.

- `PATCH /users` : protected endpoint to update the profile of the authenticated user.
  ```ts 
  // it accepts body

  {
    name?: string,
    email?: string,
  }
  ```

- `PATCH /users/password` : protected endpoint to update the password of the authenticated user.

  ```ts
  // it accepts body

  {
    password: string
  }
  ```