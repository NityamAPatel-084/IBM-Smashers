# Kaushal-Bot - AI Career Counselor

Kaushal-Bot is an AI-powered career counseling application designed to help Indian students bridge the gap between their current skills and their career goals (specifically Full Stack Development). It accepts a resume (PDF) or manual skill entry and generates a personalized 2-week study plan in **Hindi** or **Gujarati**.

## Tech Stack

*   **Frontend:** React (Vite), Tailwind CSS, Lucide-React
*   **Backend:** Python (Flask), Google Gemini API, PyPDF2

## Prerequisites

1.  **Node.js** (v16+)
2.  **Python** (v3.9+)
3.  **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/))

## Setup Instructions

### 1. Backend Setup

Navigate to the `server` folder:
```bash
cd server
```

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in the `server` directory:
```env
GEMINI_API_KEY=your_actual_api_key_here
```

Run the server:
```bash
python app.py
```
The server will start at `http://localhost:5000`.

### 2. Frontend Setup

Navigate to the `client` folder (open a new terminal):
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
The app will open at `http://localhost:5173`.

## Usage

1.  Open the web app.
2.  Select your preferred language (Hindi/Gujarati).
3.  Upload your Resume (PDF) OR type your skills manually.
4.  Click "Analyze Profile".
5.  View your personalized study plan and click "Watch Tutorial" to learn.

## Troubleshooting

*   **API Error?** The app is resilient. If the Gemini API fails or the key is missing, it will automatically switch to "Mock Mode" and provide a demo response so you can still see how the UI works.
