
# ✈️ Voyago – Smart Travel Planner

> A full-stack travel planning web application that helps users organize trips, manage expenses, create itineraries, save destinations, and manage their travel plans from one place.

---

## 🌍 Overview

**Voyago** is a full-stack Smart Travel Planner designed to simplify the process of planning and organizing trips.

The application provides an interactive dashboard where users can create and manage trips, plan day-wise itineraries, track travel expenses, maintain a wishlist of destinations, and securely manage their account.

The project was developed with a focus on **full-stack development, REST APIs, database integration, authentication, CRUD operations, and responsive user experience.**

---

## ✨ Key Features

### 🔐 User Authentication

- User registration and login
- Password validation
- Password hashing using **bcrypt**
- JWT-based authentication
- Protected API requests
- Secure logout functionality

### ✈️ Trip Management

- Create new trips
- View saved trips
- Edit trip details
- Delete trips
- Search trips by destination or trip name
- Track trip status, dates, budget, and travelers

### 🗓️ Smart Trip Planner

- Create day-wise travel itineraries
- Add activities for each day
- Delete days and activities
- Add travel notes
- Automatically save planner notes
- Save itinerary details
- Download travel plans as PDF using **jsPDF**

### 💰 Expense Management

- Add travel expenses
- View expense records
- Update expenses
- Delete expenses
- Organize and track travel spending

### ❤️ Wishlist

- Save favorite destinations
- View saved destinations
- Update wishlist items
- Remove destinations from wishlist

### 📊 Interactive Dashboard

- Total trips overview
- Trip budget information
- Upcoming trips
- Completed trips
- Recent travel activity
- Popular destinations
- Travel analytics
- Quick actions

### 👤 Profile Management

- View user information
- Manage account details
- Logout functionality

---

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Font Awesome

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB

### Authentication & Security

- JSON Web Tokens (JWT)
- bcrypt
- dotenv

### Additional Tools & Libraries

- jsPDF
- VS Code
- npm
- Postman
- Git
- GitHub
- Chrome DevTools

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   HTML / CSS / JS   │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Express.js      │
                    │      / Node.js      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
          Auth API         Trip API        Expense API
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MongoDB        │
                    │                     │
                    │ Users               │
                    │ Trips               │
                    │ Expenses            │
                    │ Wishlist             │
                    └─────────────────────┘
```

---

## 📁 Project Structure

```text
Voyago-Smart-Travel-app/
│
├── backend/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   ├── tripController.js
│   │   └── wishlistController.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Trip.js
│   │   ├── Expense.js
│   │   └── Wishlist.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── tripRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── trips.html
│   ├── planner.html
│   ├── expenses.html
│   ├── wishlist.html
│   ├── profile.html
│   │
│   ├── css/
│   │
│   └── js/
│
├── .gitignore
└── README.md
```

---

## 🔑 Authentication Flow

Voyago uses **JWT-based authentication** to protect user-specific features.

```text
User Registration
       ↓
Password Hashing using bcrypt
       ↓
MongoDB
       ↓
User Login
       ↓
JWT Token Generated
       ↓
Token Stored on Client
       ↓
Authenticated API Requests
       ↓
Protected User Data
```

Passwords are hashed using **bcrypt** before being stored, while JWT tokens are used to authenticate protected API requests.

---

## 🔌 REST API Modules

The backend follows a REST API architecture.

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
```

### Trips

```text
POST   /api/trips
GET    /api/trips
PUT    /api/trips/:id
DELETE /api/trips/:id
```

### Expenses

```text
POST   /api/expenses
GET    /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

### Wishlist

```text
POST   /api/wishlist
GET    /api/wishlist
PUT    /api/wishlist/:id
DELETE /api/wishlist/:id
```

---

## 💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/abinayars/Voyago-Smart-Travel-app.git
```

### 2. Navigate to the Project

```bash
cd Voyago-Smart-Travel-app
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> **Note:** Do not commit your actual `.env` file or database credentials to GitHub.

### 5. Start the Backend

```bash
node server.js
```

The backend will run on:

```text
http://localhost:5000
```

### 6. Run the Frontend

Open the `frontend` folder using **VS Code** and launch the application using **Live Server** or another local development server.

---

## 📸 Application Preview

Screenshots of the completed application will be added here.

### Dashboard

![Voyago Dashboard](screenshots/dashboard.png)

### Trip Management

![Voyago Trips](screenshots/trips.png)

### Smart Trip Planner

![Voyago Planner](screenshots/planner.png)

### Expense Management

![Voyago Expenses](screenshots/expenses.png)

### Wishlist

![Voyago Wishlist](screenshots/wishlist.png)

### Login

![Voyago Login](screenshots/login.png)

---

## 🎯 What I Learned

Through this project, I gained practical experience in:

- Full-stack web application development
- Frontend development using HTML, CSS, and JavaScript
- Building REST APIs using Node.js and Express.js
- MongoDB database integration
- CRUD operations
- JWT authentication
- Password hashing using bcrypt
- Client-server communication using Fetch API
- API testing using Postman
- Managing user authentication and sessions
- PDF generation using jsPDF
- Debugging using Chrome DevTools
- Git and GitHub version control
- Organizing frontend and backend application architecture

---

## 🚀 Future Enhancements

Potential future improvements include:

- Real-time weather API integration
- Interactive maps and route planning
- Hotel and flight API integration
- Cloud deployment
- Advanced travel analytics
- Real-time notifications
- Improved mobile responsiveness

---

## 👩‍💻 Developer

### Abinaya R.S.

**B.E. Computer Science and Engineering**

GitHub:  
https://github.com/abinayars

---

## ⭐ Project Highlights

**Voyago** demonstrates practical implementation of:

`Frontend Development` • `REST APIs` • `Node.js` • `Express.js` • `MongoDB` • `JWT Authentication` • `CRUD Operations` • `Responsive UI` • `Git & GitHub`

---

⭐ If you find this project interesting, feel free to explore the repository.
