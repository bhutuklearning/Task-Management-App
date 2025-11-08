# Task Manager App Frontend

A modern, responsive frontend for the Todo application built with vanilla HTML, CSS, and JavaScript. Features a clean, intuitive user interface with Tailwind CSS styling, dark mode support, and seamless integration with the backend API.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Configuration](#configuration)
- [Pages Overview](#pages-overview)
- [JavaScript Modules](#javascript-modules)
- [Styling](#styling)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)

## Features

### User Interface

- Modern, responsive design that works on desktop, tablet, and mobile devices
- Dark mode and light mode support with smooth theme transitions
- Clean and intuitive user experience
- Gradient backgrounds and smooth animations
- Font Awesome icons for enhanced visual appeal
- Tailwind CSS utility classes for rapid styling

### User Experience

- Seamless authentication flow with login and registration
- Intuitive todo creation and management interface
- Real-time todo status updates (completed/incomplete)
- User profile management
- Admin dashboard for administrative users
- Form validation and error handling
- Loading states and user feedback

### Functionality

- JWT token-based authentication
- Secure API communication with the backend
- CRUD operations for tasks
- User-specific todo filtering
- Admin access to all users and tasks
- Local storage for theme preferences
- Responsive navigation and routing

## Project Structure

```
frontend/
├── assets/
│   └── logo.jpg              # Application logo
├── css/
│   ├── style.css             # Global styles and theme variables
│   └── styles.css            # Additional custom styles
├── js/
│   ├── auth.js               # Authentication logic (login, register, logout)
│   ├── config.js             # API base URL configuration
│   ├── create.js             # Todo creation and editing logic
│   ├── home.js               # Todo listing and management
│   ├── nav.js                # Navigation bar functionality
│   ├── profile.js            # User profile and admin dashboard
│   ├── theme.js              # Dark/light mode theme toggle
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── tiptap-setup.js       # Rich text editor setup (if applicable)
├── index.html                # Landing page with app overview
├── login.html                # User login page
├── register.html             # User registration page
├── home.html                 # Main todo dashboard
├── create.html               # Create/edit todo page
├── profile.html              # User profile and admin dashboard
├── home1.html                # Alternative home page (if applicable)
├── profile1.html             # Alternative profile page (if applicable)
└── README.md                 # This file
```

## Prerequisites

Before you begin, ensure you have:

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- The backend server running and accessible
- A local web server (optional, for development)
- Basic understanding of HTML, CSS, and JavaScript

## Setup Instructions

### Option 1: Using a Local Web Server (Recommended)

**Using VS Code Live Server:**

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The application will open in your default browser

**Using Python HTTP Server:**

```bash
cd frontend
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

**Using Node.js http-server:**

```bash
npm install -g http-server
cd frontend
http-server -p 8000
```

### Option 2: Direct File Access

Simply open `index.html` in your web browser. Note that some features may be limited due to CORS restrictions when accessing files directly.

### Option 3: Integrated with Backend

If the backend is configured to serve static files, the frontend can be served directly from the backend server.

## Configuration

### API Configuration

The frontend communicates with the backend API. Configure the API base URL in `js/config.js`:

```javascript
const API_BASE_URL = "http://localhost:12000";
```

For production, update this to your deployed backend URL:

```javascript
const API_BASE_URL = "https://your-backend-url.com";
```

### Environment Setup

1. Ensure the backend server is running
2. Verify the API base URL in `js/config.js` matches your backend URL
3. Check CORS settings on the backend to allow requests from your frontend origin

## Pages Overview

### Index Page (`index.html`)

The landing page that provides an overview of the application features. Includes:

- Application introduction and key features
- Technology stack information
- Links to login and registration pages
- Responsive design showcase

### Login Page (`login.html`)

User authentication page featuring:

- Username and password input fields
- Form validation
- Error message display
- Link to registration page
- Remember me functionality (if implemented)

### Register Page (`register.html`)

New user registration page with:

- Username, email, and password fields
- Password confirmation
- Form validation
- Success/error feedback
- Link to login page

### Home Page (`home.html`)

Main todo dashboard displaying:

- List of user's tasks
- Todo creation button
- Filter and search functionality
- Mark tasks as complete/incomplete
- Edit and delete todo options
- User profile navigation

### Create Page (`create.html`)

Page for creating new tasks or editing existing ones:

- Title and description input fields
- Rich text editor support (if configured)
- Save and cancel buttons
- Form validation
- Pre-populated fields when editing

### Profile Page (`profile.html`)

User profile and admin dashboard:

- User information display
- Profile editing capabilities
- Statistics (total tasks, completed tasks)
- Admin panel (for admin users):
  - View all users
  - View all tasks
  - Admin-specific actions

## JavaScript Modules

### auth.js

Handles all authentication-related functionality:

- User registration
- User login
- User logout
- Token management
- Authentication state checking
- Redirect handling based on auth status

**Key Functions:**
- `registerUser()` - Register new user
- `loginUser()` - Authenticate user
- `logoutUser()` - Clear authentication
- `checkAuth()` - Verify authentication status

### config.js

Centralized configuration for API communication:

- API base URL
- Export configuration for use in other modules

### create.js

Manages todo creation and editing:

- Create new tasks
- Edit existing tasks
- Form validation
- API communication for CRUD operations
- Success/error handling

### home.js

Main todo management logic:

- Fetch and display tasks
- Filter tasks (all, active, completed)
- Mark tasks as complete/incomplete
- Delete tasks
- Navigate to edit page
- Real-time updates

### profile.js

User profile and admin functionality:

- Load user profile information
- Display user statistics
- Admin dashboard features
- User management (admin only)
- Todo overview (admin only)

### nav.js

Navigation bar functionality:

- Dynamic navigation based on auth status
- User menu display
- Logout functionality
- Theme toggle integration

### theme.js

Dark/light mode theme management:

- Theme toggle functionality
- Local storage persistence
- System preference detection
- Smooth theme transitions

## Styling

### Tailwind CSS

The project uses Tailwind CSS via CDN for utility-first styling. Key features:

- Responsive design utilities
- Dark mode support
- Custom color schemes
- Gradient backgrounds
- Animation utilities

### Custom CSS

Additional custom styles in `css/style.css` and `css/styles.css`:

- Theme variables for colors
- Custom animations
- Component-specific styles
- Dark mode overrides

### Theme System

The application supports both light and dark themes:

- Automatic theme detection based on system preferences
- Manual theme toggle
- Theme persistence in local storage
- Smooth transitions between themes

## Browser Support

The frontend is tested and works on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Features

- ES6+ JavaScript support
- CSS Grid and Flexbox
- Local Storage API
- Fetch API
- CSS Custom Properties (variables)

## API Integration

### Authentication Flow

1. User registers or logs in through the frontend
2. Backend returns JWT token
3. Token is stored in localStorage or sessionStorage
4. Token is included in Authorization header for subsequent requests
5. Token is validated on protected routes

### Request Format

All authenticated requests include:

```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

### Error Handling

The frontend handles various error scenarios:

- Network errors
- Authentication errors (401)
- Authorization errors (403)
- Validation errors (400)
- Server errors (500)

Error messages are displayed to users in a user-friendly format.

## Troubleshooting

### Common Issues

**CORS Errors:**
- Ensure backend CORS is configured to allow your frontend origin
- Check that the API base URL is correct

**Authentication Not Working:**
- Verify token is being stored correctly
- Check token expiration
- Ensure Authorization header is included in requests

**Tasks Not Loading:**
- Verify backend server is running
- Check API base URL configuration
- Verify authentication token is valid
- Check browser console for errors

**Theme Not Persisting:**
- Check browser local storage permissions
- Verify theme.js is loaded correctly
- Clear browser cache and try again

**Styling Issues:**
- Ensure Tailwind CSS CDN is loading
- Check browser console for CSS errors
- Verify custom CSS files are loaded

### Debugging Tips

1. Open browser DevTools (F12)
2. Check Console tab for JavaScript errors
3. Check Network tab for API request/response details
4. Verify localStorage for stored tokens and preferences
5. Test API endpoints directly using Postman or similar tools

## Development

### Adding New Features

1. Create or modify HTML pages as needed
2. Add JavaScript functionality in appropriate module
3. Update styling using Tailwind classes or custom CSS
4. Test across different browsers and devices
5. Ensure API integration is properly handled

### Code Organization

- Keep JavaScript modular and organized by functionality
- Use consistent naming conventions
- Add comments for complex logic
- Follow existing code structure

## Security Considerations

- Never commit sensitive API keys or tokens
- Use HTTPS in production
- Validate all user inputs
- Sanitize data before displaying
- Implement proper error handling to avoid information leakage

## Performance

- Minimize API calls where possible
- Use efficient DOM manipulation
- Optimize images and assets
- Leverage browser caching
- Consider lazy loading for large lists

## Contributing

Contributions are welcome! Please:

1. Follow existing code style and structure
2. Test changes across different browsers
3. Ensure responsive design is maintained
4. Update documentation as needed

<!-- ## License

This project is licensed under the MIT License. -->

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review browser console for errors
3. Verify backend API is functioning correctly
4. Contact the maintainer for additional support

---

Built with HTML, CSS, JavaScript, and Tailwind CSS by Amritanshu Goutam.

