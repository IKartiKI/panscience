# Panscience - Task Management Application

A full-stack task management application built with React and Node.js, featuring user authentication and MongoDB integration.

## Features

- User Authentication (Login/Register)
- Task Management (Create, Read, Update, Delete)
- Protected Routes
- Responsive Dashboard
- MongoDB Database Integration
- RESTful API Architecture

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Local Storage for session management

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/IKartiKI/panscience.git
cd panscience
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

2. Create a `.env` file in the frontend directory with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile

### Tasks
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Project Structure

```
panscience/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.js
│   └── package.json
│
└── backend/           # Node.js backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/IKartiKI/panscience](https://github.com/IKartiKI/panscience) 