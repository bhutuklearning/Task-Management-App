# Task Manager App Backend

A robust, secure, and scalable backend for a Task Manager application built with Node.js, Express, and MongoDB. This project features user authentication, role-based authorization, and full CRUD operations for todos.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

### Authentication & Authorization

- User registration and login with hashed passwords using bcryptjs
- JWT-based authentication with configurable token expiration
- Role-based access control supporting `user` and `admin` roles
- Middleware for route protection and role verification
- Secure password validation and storage

### Task Management

- Users can create, read, update, and delete their own tasks
- Admins can view all tasks across all users
- Admins can delete any todo regardless of ownership
- Admins can view all users and their associated tasks
- Support for marking tasks as completed or incomplete

### Security & Best Practices

- Secure HTTP headers using Helmet middleware
- CORS support for cross-origin requests
- Request logging with Morgan
- Input validation using express-validator
- Environment variables for configuration management
- Centralized error handling middleware
- MongoDB connection with Mongoose ODM

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic (register, login, logout)
│   └── todoController.js     # Todo CRUD operations and admin functions
├── middlewares/
│   ├── auth.js               # JWT authentication middleware
│   ├── role.js               # Role-based access control middleware
│   ├── errorHandler.js       # Centralized error handling
│   └── logger.js             # Custom logging middleware
├── models/
│   ├── Todo.js               # Todo data model schema
│   └── User.js               # User data model schema
├── routes/
│   ├── auth.js               # Authentication routes
│   └── todos.js              # Todo routes (user and admin)
├── utils/
│   └── generateToken.js      # JWT token generation utility
├── createadmin.js            # Script to create admin user
├── .env                      # Environment variables (not in repo)
├── server.js                 # Main application entry point
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git (for cloning the repository)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- express-validator - Input validation
- helmet - Security headers
- morgan - HTTP request logger
- cors - Cross-origin resource sharing
- dotenv - Environment variable management

### 3. Configure Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```env
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
TOKEN_EXPIRATION=7d
PORT=12000
NODE_ENV=development
```

**Example for MongoDB Atlas:**

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todoapp?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
TOKEN_EXPIRATION=7d
PORT=12000
NODE_ENV=development
```

**Important Notes:**
- Replace `<username>` and `<password>` with your MongoDB Atlas credentials
- Use a strong, random string for `JWT_SECRET` (minimum 32 characters recommended)
- The `TOKEN_EXPIRATION` format follows jsonwebtoken standards (e.g., `7d`, `24h`, `1h`)

### 4. Create Admin User (Optional)

To create an admin user, you can use the provided script:

```bash
node createadmin.js
```

Follow the prompts to create an admin account.

### 5. Start the Server

**Development mode (with auto-reload):**

```bash
npm run backend
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:12000` (or the port specified in your `.env` file).

### 6. Verify Installation

Once the server is running, you can verify it's working by:

- Checking the console for "Server running on port 12000"
- Making a GET request to `http://localhost:12000/health` (should return "OK")
- Making a GET request to `http://localhost:12000/ping` (should return "Pong!")

## API Endpoints

### Base URL

All API endpoints are prefixed with `/api`

### Authentication Endpoints

#### POST /api/auth/register

Register a new user account.

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Validation Rules:**
- Username: Required, non-empty
- Email: Required, valid email format
- Password: Required, minimum 6 characters

#### POST /api/auth/login

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### POST /api/auth/logout

Logout endpoint (client should remove JWT token).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

### Todo Endpoints (Require Authentication)

All todo endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

#### POST /api/todos

Create a new todo.

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API documentation"
}
```

**Response (201 Created):**
```json
{
  "message": "Todo created successfully",
  "todo": {
    "id": "todo_id",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API documentation",
    "completed": false,
    "user": "user_id",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

#### GET /api/todos

Get all todos for the authenticated user.

**Response (200 OK):**
```json
{
  "todos": [
    {
      "id": "todo_id",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API documentation",
      "completed": false,
      "user": "user_id",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

#### GET /api/todos/:id

Get a specific todo by ID.

**Response (200 OK):**
```json
{
  "todo": {
    "id": "todo_id",
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API documentation",
    "completed": false,
    "user": "user_id",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

#### PUT /api/todos/:id

Update a todo by ID.

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

**Note:** All fields are optional. Only include fields you want to update.

**Response (200 OK):**
```json
{
  "message": "Todo updated successfully",
  "todo": {
    "id": "todo_id",
    "title": "Updated title",
    "description": "Updated description",
    "completed": true,
    "user": "user_id",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
}
```

#### DELETE /api/todos/:id

Delete a todo by ID. Users can only delete their own todos.

**Response (200 OK):**
```json
{
  "message": "Todo deleted successfully"
}
```

### Admin Endpoints (Require Admin Role)

All admin endpoints require both authentication and admin role.

#### GET /api/todos/admin

Get all todos from all users.

**Response (200 OK):**
```json
{
  "todos": [
    {
      "id": "todo_id",
      "title": "Todo title",
      "description": "Todo description",
      "completed": false,
      "user": {
        "id": "user_id",
        "username": "johndoe",
        "email": "john@example.com"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

#### GET /api/todos/admin/users

Get all users and their todos.

**Response (200 OK):**
```json
{
  "users": [
    {
      "id": "user_id",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "todos": [
        {
          "id": "todo_id",
          "title": "Todo title",
          "description": "Todo description",
          "completed": false
        }
      ]
    }
  ]
}
```

#### DELETE /api/todos/admin/:id

Delete any todo by ID (admin only).

**Response (200 OK):**
```json
{
  "message": "Todo deleted successfully by admin"
}
```

## Security

### Password Security

- All passwords are hashed using bcryptjs before storage
- Passwords are never returned in API responses
- Minimum password length is enforced (6 characters)

### Authentication

- JWT tokens are used for stateless authentication
- Tokens include user ID and role information
- Token expiration is configurable via environment variables
- Tokens must be included in the Authorization header for protected routes

### Authorization

- Role-based access control (RBAC) is implemented
- Users can only access and modify their own todos
- Admin users have elevated privileges to view and manage all todos
- Middleware validates both authentication and authorization

### Additional Security Measures

- Helmet.js provides secure HTTP headers
- CORS is configured to control cross-origin requests
- Input validation prevents malicious data injection
- Environment variables keep sensitive data out of code
- Error messages are sanitized to prevent information leakage

### Best Practices

- Never commit `.env` files to version control
- Use strong, unique JWT secrets in production
- Regularly update dependencies for security patches
- Use HTTPS in production environments
- Implement rate limiting for production deployments

## Testing

### Using Postman

A Postman collection is included in the repository (`postman_collection.json`) for testing all API endpoints.

**To use the Postman collection:**

1. Import `postman_collection.json` into Postman
2. Set up environment variables in Postman:
   - `base_url`: `http://localhost:12000`
   - `token`: (will be set automatically after login)
3. Run the requests in order:
   - Register a new user
   - Login to get a token
   - Test todo endpoints
   - Test admin endpoints (if logged in as admin)

### Manual Testing

You can also test endpoints using:

- **cURL**: Command-line HTTP client
- **Insomnia**: REST API client
- **Thunder Client**: VS Code extension
- **Browser DevTools**: For GET requests

### Example cURL Commands

**Register a user:**
```bash
curl -X POST http://localhost:12000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:12000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**Create a todo:**
```bash
curl -X POST http://localhost:12000/api/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{"title":"Test Todo","description":"This is a test todo"}'
```

## Error Handling

The API uses centralized error handling. Common error responses:

**400 Bad Request:**
```json
{
  "error": "Validation error",
  "details": ["Username is required"]
}
```

**401 Unauthorized:**
```json
{
  "error": "Authentication required",
  "message": "No token provided"
}
```

**403 Forbidden:**
```json
{
  "error": "Access denied",
  "message": "Admin role required"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found",
  "message": "Todo not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Server error",
  "message": "An unexpected error occurred"
}
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use ES6+ JavaScript features
- Follow existing code structure and naming conventions
- Add comments for complex logic
- Ensure all endpoints are tested

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainer for direct support

---

Built with Node.js, Express, and MongoDB by Amritanshu Goutam.
