# Task Manager (Kanban Board)

A simple yet powerful **Task Manager** that helps you organize and track your tasks efficiently. The project is extended into a **Kanban Board** for better task visualization and workflow management.

## 🚀 Features
- **Create, Read, Update, Delete (CRUD)** tasks
- **Drag and Drop** functionality for task management (Kanban-style)
- **Task Prioritization & Status Tracking**
- **Responsive UI** for all devices

## 🛠 Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## 📂 Project Structure
```
/task-manager-kanban
│── backend  # Express.js backend
│   ├── models  # Database models
│   ├── routes  # API endpoints
│   ├── config  # Database connection
│   └── server.js  # Main server file
│
│── frontend  # React frontend
│   ├── src
│   │   ├── components  # Reusable UI components
│   │   ├── App.js  # Main React app
│   │   └── index.js  # Entry point
│
│── README.md  # Project documentation
│── package.json  # Dependencies and scripts
│── .env  # Environment variables
```

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```

### 2️⃣ Install Dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the **backend** folder:
```
PORT=8080
MONGO_URI=your_mongodb_uri
```
Similarly create a `.env` file in the **frontend** folder:
```
REACT_APP_API_URL=http://localhost:8080
```

### 4️⃣ Start the Application
#### Backend
```sh
cd backend
npm run dev
```
#### Frontend
```sh
cd frontend
npm start
```

### 5️⃣ Open in Browser
Go to `http://localhost:3000` to see the application in action.

## 📌 To-Do
- [ ] Implement authentication (JWT or Firebase)

## 📄 License
This project is open-source and available under the MIT License.

---
🚀 Happy Coding!
