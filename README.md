# 🚀 Express REST API Starter Template

Full-stack starter template dengan Express.js, MySQL, JWT Authentication, dan React Query integration.

## 📋 Features

### Backend

- ✅ **Express.js** - Fast, unopinionated web framework
- ✅ **MySQL/MariaDB** - Relational database
- ✅ **JWT Authentication** - Access token & Refresh token
- ✅ **Role-based Authorization** - Admin & User roles
- ✅ **Password Hashing** - Bcrypt untuk security
- ✅ **Rate Limiting** - Protection dari brute force attacks
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Helmet** - Security headers
- ✅ **Request Logging** - Track semua requests
- ✅ **Error Handling** - Centralized error handler

### Frontend

- ✅ **React** + **Vite** - Modern frontend stack
- ✅ **React Query** - Server state management
- ✅ **Axios** - HTTP client dengan interceptors
- ✅ **React Router** - Client-side routing
- ✅ **Tailwind CSS** + **DaisyUI** - Styling

---

## 📁 Project Structure

```
project/
├── BE/                          # Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js      # MySQL connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── item.controller.js
│   │   │   └── transaction.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── logger.middleware.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   ├── user.route.js
│   │   │   ├── item.route.js
│   │   │   └── transaction.route.js
│   │   ├── services/
│   │   │   └── auth.service.js
│   │   ├── app.js               # Express app
│   │   └── index.js             # Server entry point
│   ├── database/
│   │   └── schema.sql           # Database schema
│   ├── .env.example             # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── FE/                          # Frontend
    ├── src/
    │   ├── api/
    │   │   ├── axios.js         # Axios instance + interceptors
    │   │   ├── auth.js          # Auth API calls
    │   │   └── user.js          # User API calls
    │   ├── hooks/
    │   │   ├── useAuth.js       # Auth React Query hooks
    │   │   └── useUsers.js      # User React Query hooks
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── package.json
    └── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- MySQL/MariaDB
- npm or yarn

### 1. Clone Repository

```bash
git clone <repository-url>
cd project
```

### 2. Setup Backend

```bash
cd BE
npm install
```

**Setup Environment Variables:**

```bash
cp .env.example .env
```

Edit `.env` dengan credentials lo:

```env
PORT=3000
NODE_ENV=development

FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database_name

JWT_SECRET=your_generated_secret_key_64_chars
JWT_REFRESH_SECRET=your_different_refresh_key_64_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10
```

**Generate JWT Secrets:**

```bash
# Method 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Method 2: Using OpenSSL
openssl rand -hex 64
```

**Setup Database:**

```bash
# Login ke MySQL
mysql -u root -p

# Jalankan schema.sql
source database/schema.sql

# Atau manual:
mysql -u root -p your_database_name < database/schema.sql
```

**Start Backend Server:**

```bash
npm run dev
```

Server akan jalan di `http://localhost:3000`

### 3. Setup Frontend

```bash
cd ../FE
npm install
```

**Setup Environment Variables:**

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

**Start Frontend Server:**

```bash
npm run dev
```

Frontend akan jalan di `http://localhost:5173`

---

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### Authentication Endpoints

#### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "user"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

#### Refresh Token

```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <access_token>
```

### Protected Endpoints

Semua endpoint di bawah membutuhkan `Authorization: Bearer <access_token>` header.

#### Users (Admin Only)

```http
GET    /api/users           # Get all users
GET    /api/users/:id       # Get user by ID
PUT    /api/users/:id       # Update user
DELETE /api/users/:id       # Delete user (admin only)
```

#### Items

```http
GET    /api/items           # Get all items (public)
GET    /api/items/:id       # Get item by ID (public)
POST   /api/items           # Create item (authenticated)
PUT    /api/items/:id       # Update item (authenticated)
DELETE /api/items/:id       # Delete item (admin only)
```

#### Transactions

```http
GET    /api/transactions           # Get all transactions
GET    /api/transactions/:id       # Get transaction by ID
POST   /api/transactions           # Create transaction
PUT    /api/transactions/:id       # Update transaction
DELETE /api/transactions/:id       # Delete transaction (admin only)
```

---

## 🔐 Authentication Flow

1. **Register/Login** → Dapat `accessToken` & `refreshToken`
2. **Store Tokens** → Simpan di `localStorage`
3. **API Requests** → Kirim `accessToken` di header `Authorization: Bearer <token>`
4. **Token Expired** → Otomatis refresh pake `refreshToken` (via axios interceptor)
5. **Logout** → Hapus tokens dari `localStorage`

---

## 🛡️ Security Features

- **Password Hashing** - Bcrypt dengan salt rounds 10
- **JWT Tokens** - Access token (15m) & Refresh token (7d)
- **Rate Limiting** - 100 requests/15min (general), 5 requests/15min (auth)
- **Helmet** - Security headers (XSS, clickjacking protection)
- **CORS** - Whitelist frontend URL
- **Input Validation** - Email format, password strength
- **SQL Injection Protection** - Parameterized queries

---

## 🧪 Testing

### Backend Testing

**Test dengan cURL:**

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123"}'

# Get profile (with token)
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <your_token>"
```

**Test dengan Postman/Thunder Client:**

1. Import collection dari `docs/postman_collection.json`
2. Setup environment variables
3. Run requests

---

## 🎨 Frontend Usage

### Login Example

```jsx
import { useLogin } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync({ email, password });
      alert("Login berhasil!");
    } catch (error) {
      alert(error.response?.data?.message || "Login gagal");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Loading..." : "Login"}
      </button>
    </form>
  );
};
```

### Protected Route

```jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
```

---

## 📝 Environment Variables

### Backend (.env)

| Variable                 | Description           | Default                 |
| ------------------------ | --------------------- | ----------------------- |
| `PORT`                   | Server port           | `3000`                  |
| `NODE_ENV`               | Environment           | `development`           |
| `FRONTEND_URL`           | Frontend URL for CORS | `http://localhost:5173` |
| `DB_HOST`                | Database host         | `localhost`             |
| `DB_PORT`                | Database port         | `3306`                  |
| `DB_USER`                | Database username     | `root`                  |
| `DB_PASSWORD`            | Database password     | -                       |
| `DB_NAME`                | Database name         | -                       |
| `JWT_SECRET`             | Access token secret   | -                       |
| `JWT_REFRESH_SECRET`     | Refresh token secret  | -                       |
| `JWT_EXPIRES_IN`         | Access token expiry   | `15m`                   |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry  | `7d`                    |
| `BCRYPT_SALT_ROUNDS`     | Bcrypt salt rounds    | `10`                    |

### Frontend (.env)

| Variable       | Description     | Default                     |
| -------------- | --------------- | --------------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:3000/api` |

---

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error (ECONNREFUSED)**

```bash
# Cek MySQL service jalan
net start MySQL
# atau
service mysql start

# Test connection
mysql -u root -p
```

**JWT Token Invalid**

- Pastikan `JWT_SECRET` sama dengan yang dipake saat generate token
- Cek token belum expired
- Pastikan format header: `Authorization: Bearer <token>`

**Port Already in Use**

```bash
# Windows - Kill process di port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Frontend Issues

**CORS Error**

- Pastikan `FRONTEND_URL` di backend `.env` match dengan frontend URL
- Cek backend `corsOptions` configuration

**API Not Found (404)**

- Cek `VITE_API_URL` di frontend `.env`
- Pastikan backend server jalan
- Cek endpoint URL bener

---

## 📦 Dependencies

### Backend

```json
{
  "bcrypt": "^5.1.1",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "express-rate-limit": "^7.1.5",
  "helmet": "^7.1.0",
  "jsonwebtoken": "^9.0.2",
  "mysql2": "^3.6.5"
}
```

### Frontend

```json
{
  "@tanstack/react-query": "^5.17.0",
  "axios": "^1.6.5",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.1"
}
```

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use this template for your projects!

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Express.js team
- React Query (TanStack Query)
- All open source contributors

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [JWT Best Practices](https://jwt.io/introduction)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Happy Coding! 🚀**
