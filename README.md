# 🎓 Kaushal-Bot - AI Career Guidance Platform

**Kaushal-Bot** is an AI-powered career counseling platform designed specifically for Indian students. It provides personalized resume analysis, skill gap identification, and customized 2-week study plans in Hindi, Gujarati, or English.

## ✨ Features

### 🤖 AI-Powered Analysis
- **Resume Analysis**: Upload PDF resumes or enter skills manually
- **Skill Gap Detection**: Hybrid ML/AI approach combining local keyword matching with Gemini AI
- **Personalized Study Plans**: 2-week roadmaps tailored to identified skill gaps
- **Multilingual Support**: Get guidance in Hindi (हिंदी), Gujarati (ગુજરાતી), or English

### 🔐 Authentication
- Secure user authentication via Supabase
- Sign Up / Sign In / Forgot Password functionality
- User profile management with full name support

### 🎨 Modern UI/UX
- Clean, responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- Glassmorphism effects and modern aesthetics
- Mobile-friendly interface

### 📊 Smart Features
- **Local ML Model**: Instant keyword-based skill detection for efficiency
- **AI Enhancement**: Gemini Pro generates contextual study plans
- **YouTube Integration**: Optimized search queries for Indian educational content
- **Demo Mode**: Works without authentication for quick testing

## 🏗️ Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Axios** for API calls
- **Supabase** for authentication

### Backend
- **Python Flask** for API server
- **Google Gemini AI** for intelligent analysis
- **PyPDF2** for resume parsing
- **Flask-CORS** for cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- Gemini API Key
- Supabase Account (optional, for authentication)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/NityamAPatel-084/IBM-Smashers.git
cd IBM-Smashers
```

#### 2. Setup Backend
```bash
cd server
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

#### 3. Setup Frontend
```bash
cd ../client
npm install

# Create .env file (optional for auth)
cp .env.example .env
# Edit .env and add your Supabase credentials
```

### Running the Application

#### Start Backend (Terminal 1)
```bash
cd server
python app.py
```
Backend runs on: `http://localhost:5000`

#### Start Frontend (Terminal 2)
```bash
cd client
npm run dev
```
Frontend runs on: `http://localhost:5173`

## 🔑 Environment Variables

### Backend (`server/.env`)
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Frontend (`client/.env`) - Optional
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 📖 Usage

1. **Open the Application**: Navigate to `http://localhost:5173`
2. **Sign In** (Optional): Click "Sign In / Sign Up" button
3. **Upload Resume**: Choose PDF upload or manual text entry
4. **Select Language**: Choose Hindi, Gujarati, or English
5. **Analyze**: Click "Analyze & Generate Study Plan"
6. **View Results**: 
   - Candidate Summary
   - Skill Gaps Identified
   - 2-Week Study Plan with YouTube resources

## 🧠 How It Works

### Hybrid Analysis Approach

1. **Local ML Pre-Processing**:
   - Instant keyword matching against Full Stack Developer requirements
   - Checks for: React, Node.js, MongoDB, Git, AWS, etc.
   - Identifies critical gaps deterministically

2. **AI Enhancement**:
   - Feeds detected gaps to Gemini AI
   - Generates contextual, encouraging summaries
   - Creates personalized study plans with YouTube search queries
   - Adapts content to selected language

3. **Result Presentation**:
   - Clean card-based UI
   - Color-coded sections (Blue for summary/plan, Orange for gaps)
   - Direct YouTube search links for each topic

## 📁 Project Structure

```
IBM-Smashers/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Auth.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── InputSection.jsx
│   │   │   └── Results.jsx
│   │   ├── App.jsx
│   │   ├── supabase.js
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/                # Backend Flask API
│   ├── app.py            # Main Flask application
│   ├── requirements.txt
│   └── .env.example
├── supabase_schema.sql   # Database schema
├── README.md
└── .gitignore
```

## 🎯 Key Components

### Frontend Components

- **Hero.jsx**: Landing section with branding
- **Auth.jsx**: Sign Up/Sign In/Forgot Password forms
- **InputSection.jsx**: Resume upload and language selection
- **Results.jsx**: Display analysis results in card layout

### Backend Endpoints

- `GET /`: Health check endpoint
- `POST /analyze`: Main analysis endpoint
  - Accepts: PDF file or text input + language preference
  - Returns: JSON with summary, skill gaps, and study plan

## 🔒 Security

- Environment variables for sensitive keys
- `.gitignore` excludes `.env` files
- Supabase handles authentication securely
- CORS configured for development (restrict in production)

## 🌟 Features Roadmap

- [ ] Advanced skill matching algorithms
- [ ] Progress tracking for study plans
- [ ] Community features and forums
- [ ] Integration with job portals
- [ ] Mobile app version
- [ ] More language support (Tamil, Telugu, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team IBM-Smashers

Built with ❤️ for Indian Students

## 🙏 Acknowledgments

- Google Gemini AI for intelligent analysis
- Supabase for authentication infrastructure
- The open-source community for amazing tools

---

**Note**: This is a hackathon project built for educational purposes. Ensure you have proper API keys and follow rate limits for production use.
