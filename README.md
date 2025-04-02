AI-Powered Academic Event Scheduler

A production-ready backend system that intelligently filters and schedules academic events based on relevance to a student's field of study.
Key Features

    Smart Event Filtering: Uses Gemini AI to analyze event invitations and determine relevance

    Automated Scheduling: Direct integration with Google Calendar

    Personalized Recommendations: Tailored to each student's academic profile

    Secure API: JWT authentication and Arcjet protection

Tech Stack
Core Technologies

    Node.js & Express.js: Backend framework

    MongoDB with Mongoose: Database management

    Google Gemini API: AI-powered event analysis

    Google Calendar API: Event scheduling integration

Security & Infrastructure

    JWT & bcryptjs: User authentication

    Arcjet: Rate limiting and bot protection

    Upstash: Workflow automation

    Hostinger: VPS hosting

System Architecture
Copy

app.js
├── config/
│   ├── env.js
│   └── arcjet.js
├── controllers/
│   ├── auth.controller.js
│   ├── event.controller.js
│   ├── user.controller.js
│   └── ai.controller.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── arcjet.middleware.js
├── models/
│   ├── event.model.js
│   └── user.model.js
└── routes/
    ├── auth.routes.js
    ├── event.routes.js
    └── ai.routes.js

Key Endpoints
Authentication

    POST /api/v1/auth/signup - Register with academic details

    POST /api/v1/auth/login - Get JWT token

Event Management

    POST /api/v1/ai/analyze - Analyze event relevance

    POST /api/v1/events - Create calendar event

    GET /api/v1/events - View upcoming events

Usage Examples
1. User Registration
json
Copy

POST /api/v1/auth/signup
{
  "name": "Alex Chen",
  "email": "alex@university.edu",
  "password": "securepassword123",
  "subject": "computer_science",
  "year_of_study": 3
}

2. Event Analysis
json
Copy

POST /api/v1/ai/analyze
{
  "emailBody": "CS Students: AI Workshop on March 15th, 10AM-12PM at Tech Building 101"
}

Response:
{
  "summary": "AI Workshop",
  "relevancy": "Yes",
  "reason": "CS workshop",
  "event_details": {
    "title": "AI Workshop",
    "date": "2024-03-15T10:00:00",
    "location": "Tech Building 101"
  }
}

Advanced Features

    Smart Filtering: AI determines event relevance based on:

        Field of study (CS, Medicine, Business, etc.)

        Year of study

        Event type (workshop, conference, etc.)

    Calendar Sync: Automatic Google Calendar integration for relevant events

    Personalized Dashboard: View upcoming events filtered by relevance

Setup Instructions

    Install dependencies:

bash
Copy

npm install @google/generative-ai googleapis @google-cloud/local-auth

    Configure environment variables:

Copy

GEMINI_API_KEY=your_key_here
GOOGLE_CLIENT_ID=your_id_here
GOOGLE_CLIENT_SECRET=your_secret_here
MONGO_URI=mongodb_connection_string
JWT_SECRET=your_jwt_secret

    Start the server:

bash
Copy

npm start

Acknowledgements

    Inspired by real student needs for academic event management

    AI integration patterns from Google's Gemini documentation

    Security best practices from Arcjet implementation guides
