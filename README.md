# Zylo - Advanced Coding Platform

A modern, feature-rich coding platform built with React and Node.js that provides a comprehensive environment for coding practice, problem-solving, and learning.

## 🚀 Features

### Frontend
- **Modern React App** - Built with React 19, Vite, and modern tooling
- **Beautiful UI** - Tailwind CSS with DaisyUI components and animations
- **Code Editor** - Monaco Editor with syntax highlighting and IntelliSense
- **State Management** - Redux Toolkit for efficient state handling
- **Authentication** - Secure user authentication with JWT tokens
- **Problem Solving** - Interactive coding problems with test cases
- **AI Assistant** - Integrated AI chat for coding help
- **Daily Challenges** - Daily coding problems to keep you engaged
- **Admin Panel** - Comprehensive admin dashboard for content management
- **Responsive Design** - Mobile-friendly interface

### Backend
- **RESTful API** - Express.js server with clean architecture
- **Database** - MongoDB for data persistence
- **Caching** - Redis for performance optimization
- **Authentication** - JWT-based secure authentication
- **Code Execution** - Safe code execution environment
- **File Upload** - Support for problem statements and solutions
- **Video Solutions** - Video content management for problems

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling framework
- **DaisyUI** - Component library
- **Monaco Editor** - Code editor
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **React Hook Form** - Form handling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Redis** - Caching
- **JWT** - Authentication
- **Mongoose** - MongoDB ODM
- **Bcrypt** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Redis
- Git

### Clone the Repository
```bash
git clone https://github.com/arnavvarshneyy/Zyl0o.git
cd Zylo
```

### Install Dependencies

#### Frontend
```bash
cd Frontend
npm install
```

#### Backend
```bash
cd server
npm install
```

### Environment Setup

#### Frontend Environment (.env)
```env
VITE_API_URL=http://localhost:3000
```

#### Backend Environment (.env)
```
PORT=3000
mongoose_url=m
jwt_secret_key=
judge0_key=
GEMINI_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
REDIS_PASS=
REDIS_HOST=
REDIS_PORT=
NODE_ENV=production
```

### Running the Application

#### Start Backend Server
```bash
cd server
npm start
```

#### Start Frontend Development Server
```bash
cd Frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🏗️ Project Structure

```
Zylo/
├── Frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── auth/           # Authentication components
│   │   ├── Ui/             # UI elements and animations
│   │   ├── redux/          # Redux slices and store
│   │   ├── utils/          # Utility functions
│   │   └── shimmers/       # Loading components
│   ├── public/
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Database and Redis config
│   │   └── utils/          # Server utilities
│   └── package.json
└── README.md
```

## 🎯 Key Features Explained

### Problem Solving
- Browse and solve coding problems
- Write, test, and submit code
- View test case results
- Access editorial solutions

### AI Assistant
- Get coding help from AI
- Ask questions about problems
- Receive code suggestions
- Learn from AI explanations

### Daily Problems
- New coding challenge every day
- Track your daily progress
- Build consistent coding habits

### Admin Panel
- Manage problems and solutions
- Upload video content
- Monitor user submissions
- Control platform content

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm start      # Start development server
npm build      # Build for production
npm preview    # Preview production build
npm lint       # Run ESLint
```

#### Backend
```bash
npm start      # Start server
npm dev        # Start with nodemon
npm test       # Run tests
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Token verification

#### Problems
- `GET /api/problems` - Get all problems
- `GET /api/problems/:id` - Get specific problem
- `POST /api/problems` - Create problem (admin)
- `PUT /api/problems/:id` - Update problem (admin)
- `DELETE /api/problems/:id` - Delete problem (admin)

#### Submissions
- `POST /api/submit` - Submit solution
- `GET /api/submissions` - Get user submissions

#### AI Chat
- `POST /api/ai/chat` - Chat with AI assistant

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 👤 Author

**Arnav Varshney**
- GitHub: [@arnavvarshneyy](https://github.com/arnavvarshneyy)

## 🙏 Acknowledgments

- React team for the amazing framework
- Monaco Editor team for the excellent code editor
- Tailwind CSS for the utility-first CSS framework
- All the open-source contributors who made this project possible

---

⭐ If you find this project helpful, please give it a star!
