# 🚀 Role-Based Dashboard API

A scalable backend API built with **Node.js, Express, and MongoDB** that provides:

    User and Role Management
    Financial Records CRUD
    Record Filtering (by date, category, type)
    Dashboard Summary APIs (totals, trends)
    Role Based Access Control(middlewares)
    Input Validation(Joi)
    Error Handling
    Data Persistence (Database/ MongoDB)
    Authentication & Authorization (JWT)
    Security(helmet) & rate limiting(express-rate-limit)
    API logging(morgan)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT
- **Security:** Helmet, Express Rate Limiter
- **Validation:** Joi
- **Utilities:** dotenv, cookie-parser, morgan

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/dixitorbital/Intern-Project.git
cd Intern-Project
cd Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 4. Run the server

```bash
npm run dev
```

Server will run at:

```
http://localhost:3000
```

---

## 📘 API Documentation

You can explore and test the API using the Postman documentation:

🔗https://documenter.getpostman.com/view/29811563/2sBXiomVFu

### 🔐 Auth Routes

#### POST `/api/auth/login`

Authenticate user and return JWT token.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "jwt_token",
  "user": {
    "id": "123",
    "role": "Admin"
  }
}
```

---

## 🔐 Role-Based Access Control

| Action         | Viewer | Analyst | Admin |
| -------------- | ------ | ------- | ----- |
| View Dashboard | ✅     | ✅      | ✅    |
| View Records   | ❌     | ✅      | ✅    |
| Create Records | ❌     | ❌      | ✅    |
| Manage Users   | ❌     | ❌      | ✅    |

---

## 🛡️ Security Features

- Helmet for secure HTTP headers
- Rate limiting to prevent abuse
- JWT-based authentication
- Role-based authorization middleware
- Joi for input validation

---

## ❗ Error Handling

- Centralized error handler middleware
- Consistent API error responses
- Handles async errors gracefully

---

## ⚖️ Tradeoffs

- Used in-memory rate limiting (simpler, but not distributed like Redis)

---

## 👨‍💻 Author

Divyanshu Dixit

---
