# Task Manager (Kanban Board)

A simple yet powerful **Task Manager** that helps you organize and track your tasks efficiently. The project is extended into a **Kanban Board** for better task visualization and workflow management and has now been extended with a mobile app built using React Native.

## Table of Contents
- [🎥 Demo Working Video](#-demo-working-video)
- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🖼 Screenshots](#-screenshots)
- [🚀 Getting Started](#-getting-started)
- [📌 To-Do](#-to-do)
- [📄 License](#-license)

## 🎥 Demo Working Video

https://github.com/user-attachments/assets/3e33eeca-4a64-4ccc-9e94-4f91afe6a4a7

## 🚀 Features
- **Create, Read, Update, Delete (CRUD)** tasks
- **Drag and Drop** functionality for task management (Kanban-style)
- **Task Prioritization & Status Tracking**
- **Search, Sort, Filter capabilities**
- **Responsive Web App & Native Mobile App**

## 🛠 Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Mobile**: Expo, React Native

## 📂 Project Structure
```
/task-manager-kanban
│── backend        # Express.js backend
│   ├── models     # Database models
│   ├── routes     # API endpoints
│   ├── config     # Database connection
│   └── server.js  # Main server file
│
│── frontend  # React frontend
│   ├── src
│   │   ├── components  # Reusable UI components
│   │   ├── App.js      # Main React app
│   │   └── index.js    # Entry point
│
├── mobile-app      # React Native mobile app
│   ├── app         # Pages and navigation
│   ├── components  # Mobile UI components
│   └── services    # API services shared with web
│
│── README.md  # Project documentation
```

## 🖼 Screenshots

### Dark Mode
<img width="1440" alt="Dark Mode" src="https://github.com/user-attachments/assets/22a3ee9a-da9a-4869-8e39-fef1782d7d1d" />

### Light Mode
<img width="1440" alt="Light Mode" src="https://github.com/user-attachments/assets/5059f818-c723-4c9b-a552-72e22068afcb" />

### Mobile
<img width="244" height="506" alt="image" src="https://github.com/user-attachments/assets/77147bce-4159-4e6a-9166-4e7d1e26033d" />

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Sujal366/kanban-board.git
cd kanban-board
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
#### Mobile (React Native)
Make sure Expo CLI is installed:
```sh
npm install -g expo-cli
```
Then:
```sh
cd ../mobile
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
cd ../frontend
npm start
```
#### Mobile App
```sh
cd ../mobile
npx expo start
```

### 5️⃣ Open in Browser or Mobile
Web: Go to `http://localhost:3000` to see the application in action.  
Mobile: Use Expo Go app to scan the QR code in terminal/browser

## 📌 To-Do
- [ ] Implement authentication (JWT or Firebase)
- [ ] Push notifications (mobile)
- [ ] Offline support for mobile
- [ ] Mobile dark mode

## 📄 License
This project is open-source and available under the MIT License.

---
🚀 Happy Coding!
