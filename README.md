
## Setup

Requirements: Node v20+

Install dependencies:
```
npm i
```

Create a `.env` file:

```
DATABASE_URL=<database url here>
JWT_SECRET=secret
```

Run migrations:
```
npx drizzle-kit migrate
```

Run app:
```
bun index.ts
```

## Routes

Register:

```
POST /register
{
    "email": "email@gmail.com",
    "password": "password",
    "name": "name",
    "description": "description",
}
```

Login:

```
POST /login
{
    "email": "email@gmail.com",
    "password": "password",
}
```

Get profile:

```
GET /profile
Authorization: Brearer <token>
```

## Postman

Postman collection for all routes are in `postman_collection.json`