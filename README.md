# 📝 EpyTodo

**EpyTodo** is a full-featured **Todo List RESTful API** built with **Node.js** and **MySQL**. It enables users to **register**, **authenticate**, and **manage** their tasks via a **secure** and **structured** interface.
## 📚 Features

    User registration and login with JWT authentication.

    Password hashing with bcryptjs.

    Full CRUD support for users and todos.

    Organized codebase with modular structure.

    Environment configuration via .env.

    Protected routes requiring JWT tokens.

## 🛠 Tech Stack

    Node.js

    Express

    MySQL

    JWT (jsonwebtoken)

    bcryptjs

    dotenv

    mysql2

## 📁 Project Structure

    .
    ├── .env
    ├── epytodo.sql
    ├── package.json
    └── src
        ├── config
        │   └── db.js
        ├── index.js
        ├── middleware
        │   ├── auth.js
        │   └── notFound.js
        └── routes
            ├── auth
            │   └── auth.js
            ├── todos
            │   ├── todos.js
            │   └── todos.query.js
            └── user
                ├── user.js
                └── user.query.js

## ⚙️ Environment Variables

**Your** .env file should contain:

MYSQL_DATABASE=epytodo
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=yourpassword
PORT=3000
SECRET=yourJWTSecret

## 🧠 Database Schema
user table

    id INT, AUTO_INCREMENT, PRIMARY KEY

    email VARCHAR, UNIQUE, NOT NULL

    password VARCHAR, NOT NULL (hashed)

    name VARCHAR, NOT NULL

    firstname VARCHAR, NOT NULL

    created_at DATETIME, DEFAULT CURRENT_TIMESTAMP

todo table

    id INT, AUTO_INCREMENT, PRIMARY KEY

    title VARCHAR, NOT NULL

    description TEXT, NOT NULL

    created_at DATETIME, DEFAULT CURRENT_TIMESTAMP

    due_time DATETIME, NOT NULL

    status ENUM('not started', 'todo', 'in progress', 'done'), DEFAULT 'not started'

    user_id INT, FOREIGN KEY REFERENCES user(id)

### To initialize the DB:

mysql -u root -p < epytodo.sql

## 🔐 API Authentication

All protected routes require a **valid JWT** in the Authorization header:

Authorization: Bearer <your-token>

## 📬 API Routes
### 🔓 Auth
    Method	Route	      Auth    Description
    POST	 /register	          Register a new user
    POST	 /login	              Login and get token
### 👤 Users
    Method	Route	            Auth	  Description
    GET	    /user	             ✅	      Get current user info
    GET	    /user/todos	         ✅	      Get all todos of user
    GET	    /users/:id/email	 ✅	      Get user info by ID/email
    PUT	    /users/:id	         ✅	      Update user info
    DELETE	/users/:id	         ✅	      Delete user by ID
### ✅ Todos
    Method	Route	        Auth	Description
    GET	    /todos	          ✅	 Get all todos
    GET	    /todos/:id	      ✅     Get a todo by ID
    POST	/todos	          ✅     Create a new todo
    PUT	    /todos/:id	      ✅	 Update a todo
    DELETE	/todos/:id	      ✅     Delete a todo
## 🔄 Example JSON
### Register

    {
      "email": "test@epytodo.com",
      "name": "Doe",
      "firstname": "John",
      "password": "securePassword"
    }

### Login

    {
      "email": "test@epytodo.com",
      "password": "securePassword"
    }

## 🚀 Getting Started

    Clone the repo

    Run npm install

    Configure .env

    Create DB with epytodo.sql

    Start the server:

    npm start

## 👨‍💻 Author

Developed by **pepidev**
