# FolioS - Your Digital Notebook

A modern, responsive web-based note-taking application built with FastAPI and Firebase. FolioS provides a clean, intuitive interface for creating, managing, and organizing your digital notes with secure user authentication.

## Features

- 🔐 **Secure Authentication**: Sign in with email/password or Google OAuth
- 📝 **Note Management**: Create, view, and delete notes with ease
- 🎨 **Modern UI**: Beautiful, responsive design with glassmorphism effects
- 📱 **Mobile-Friendly**: Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Updates**: Notes are saved instantly to Firebase Firestore
- 🌐 **Web-based**: No installation required - access from any browser

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Jinja2**: Templating engine for rendering HTML

### Frontend
- **HTML5/CSS3**: Modern web standards
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Alpine.js**: Lightweight JavaScript framework for reactive UI
- **JavaScript ES6+**: Modern JavaScript features

### Database & Authentication
- **Firebase Authentication**: Secure user authentication
- **Firebase Firestore**: NoSQL cloud database for storing notes

## Project Structure

```
note-app/
├── main.py              # FastAPI application entry point
├── requirements.txt     # Python dependencies
├── static/
│   ├── app.js          # Frontend JavaScript logic
│   └── logo4-transparent.png  # App logo
└── templates/
    └── index.html      # Main HTML template
```

## Installation & Setup

### Prerequisites
- Python 3.7+
- Node.js (optional, for development tools)
- Firebase project with Authentication and Firestore enabled

### 1. Clone the Repository
```bash
git clone <repository-url>
cd note-app
```

### 2. Set up Firebase
1. Create a new project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password and Google providers)
3. Create a Firestore database
4. Get your Firebase configuration keys
5. Update the `firebaseConfig` object in `static/app.js` with your credentials

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Application
```bash
uvicorn main:app --reload
```

The application will be available at `http://localhost:8000`

## Usage

1. **Sign Up/Sign In**: Create a new account or sign in with existing credentials
2. **Create Notes**: Add new notes with title and content
3. **Manage Notes**: View all your notes in a grid layout
4. **Delete Notes**: Remove unwanted notes with confirmation
5. **Sign Out**: Securely sign out when done

## Configuration

### Firebase Configuration
Update the `firebaseConfig` object in [`static/app.js`](static/app.js:2-10) with your Firebase project credentials:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### Firestore Security Rules
Configure your Firestore security rules to allow users to only access their own notes:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Development

### Local Development
Run the development server with auto-reload:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Code Structure
- [`main.py`](main.py): FastAPI application setup and routing
- [`static/app.js`](static/app.js): Frontend logic with Firebase integration
- [`templates/index.html`](templates/index.html): Main UI template with Alpine.js reactive components

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [Firebase](https://firebase.google.com/) for authentication and database services
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Alpine.js](https://alpinejs.dev/) for the reactive frontend components

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.