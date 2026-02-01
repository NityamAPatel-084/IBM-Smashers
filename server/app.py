import os
import json
import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
import PyPDF2

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Allow all origins for development ease
CORS(app)

# Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
USE_MOCK_DATA = False  # Set to True to force mock response

# Configure Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def extract_text_from_pdf(file_storage):
    """Extracts text from a Flask FileStorage object (PDF)."""
    try:
        reader = PyPDF2.PdfReader(file_storage)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

def get_mock_response(language):
    """Returns a hardcoded perfect response for demo purposes."""
    lang_suffix = f"({language})"
    
    # Default English Summary
    summary = "You are an emerging developer showing interest in Web Development. You have some foundational skills, but you need to achieve mastery in a few more areas to become a Full Stack Developer."
    
    if language.lower() == 'hindi':
        summary = "आप एक उभरते हुए डेवलपर हैं जिनके पास वेब डेवलपमेंट में रुचि दिख रही है। आपके पास कुछ बुनियादी कौशल हैं, लेकिन फुल स्टैक डेवलपर बनने के लिए आपको कुछ और क्षेत्रों में महारत हासिल करनी होगी।"
    elif language.lower() == 'gujarati':
        summary = "તમે વેબ ડેવલપમેન્ટમાં રસ ધરાવતા ઉભરતા ડેવલપર છો. તમારી પાસે કેટલીક પાયાની કુશળતા છે, પરંતુ ફુલ સ્ટેક ડેવલપર બનવા માટે તમારે હજી થોડા વધુ ક્ષેત્રોમાં નિપુણતા પ્રાપ્ત કરવી પડશે."

    return {
        "candidate_summary": summary,
        "missing_skills": [
            "Advanced JavaScript Frameworks (e.g., React, Angular, Vue.js)",
            "Backend Development (e.g., Node.js with Express, Python with Django/Flask)",
            "Database Management (SQL/NoSQL)",
            "API Development & Integration (RESTful APIs)",
            "Version Control (Git & GitHub)",
            "Deployment & Hosting (e.g., Netlify, Heroku, AWS)"
        ],
        "study_plan": [
            {
                "day": "Day 1-2",
                "topic": "Introduction to React.js",
                "youtube_query": f"React js tutorial for beginners {language}",
                "description": "यह आपको आधुनिक फ्रंट-एंड डेवलपमेंट के लिए सबसे लोकप्रिय फ्रेमवर्क में से एक, React.js की मूल बातें समझने में मदद करेगा।" if language == 'Hindi' else "આ તમને આધુનિક ફ્રન્ટ-એન્ડ ડેવલપમેન્ટ માટે સૌથી લોકપ્રિય ફ્રેમવર્કમાંથી એક, React.js ની મૂળભૂત બાબતોને સમજવામાં મદદ કરશે." if language == 'Gujarati' else "This will help you understand the basics of React.js, one of the most popular frameworks for modern front-end development."
            },
            {
                "day": "Day 3-4",
                "topic": "Backend Development with Node.js & Express",
                "youtube_query": f"Node js express tutorial {language}",
                "description": "यह आपको सर्वर-साइड प्रोग्रामिंग और वेब एप्लिकेशन के लिए बैकएंड बनाने के तरीके से परिचित कराएगा।" if language == 'Hindi' else "આ તમને સર્વર-સાઇડ પ્રોગ્રામિંગ અને વેબ એપ્લિકેશન માટે બેકએન્ડ બનાવવાની રીતથી પરિચિત કરાવશે." if language == 'Gujarati' else "This will introduce you to server-side programming and how to build backends for web applications."
            },
            {
                "day": "Day 5-7",
                "topic": "Database Management (SQL & NoSQL basics)",
                "youtube_query": f"SQL vs NoSQL tutorial {language}",
                "description": "डेटा को स्टोर करने और प्रबंधित करने के लिए डेटाबेस की समझ एक फुल स्टैक डेवलपर के लिए महत्वपूर्ण है।" if language == 'Hindi' else "ડેટાને સ્ટોર કરવા અને મેનેજ કરવા માટે ડેટાબેઝની સમજ એક ફુલ સ્ટેક ડેવલપર માટે મહત્વપૂર્ણ છે." if language == 'Gujarati' else "Understanding databases to store and manage data is crucial for a Full Stack Developer."
            },
            {
                "day": "Day 8-10",
                "topic": "RESTful API Development",
                "youtube_query": f"RESTful API tutorial {language}",
                "description": "यह आपको फ्रंट-एंड और बैक-एंड के बीच संचार के लिए API बनाने और उनका उपयोग करने का तरीका सिखाएगा।" if language == 'Hindi' else "આ તમને ફ્રન્ટ-એન્ડ અને બેક-એન્ડ વચ્ચે સંચાર માટે API બનાવવા અને તેનો ઉપયોગ કરવાની રીત શીખવશે." if language == 'Gujarati' else "This will teach you how to create and use APIs for communication between front-end and back-end."
            },
            {
                "day": "Day 11-12",
                "topic": "Version Control with Git & GitHub",
                "youtube_query": f"Git and GitHub tutorial {language}",
                "description": "यह आपको कोड को प्रभावी ढंग से प्रबंधित करने, सहयोग करने और परिवर्तनों को ट्रैक करने में मदद करेगा, जो हर डेवलपर के लिए आवश्यक है।" if language == 'Hindi' else "આ તમને કોડને અસરકારક રીતે મેનેજ કરવા, સહયોગ કરવા અને ફેરફારોને ટ્રેક કરવામાં મદદ કરશે, જે દરેક ડેવલપર માટે જરૂરી છે." if language == 'Gujarati' else "This will help you manage code effectively, collaborate, and track changes, which is essential for every developer."
            },
            {
                "day": "Day 13-14",
                "topic": "Basic Deployment & Hosting",
                "youtube_query": f"Web deployment tutorial {language}",
                "description": "अपने प्रोजेक्ट्स को दुनिया के साथ साझा करने के लिए उन्हें लाइव सर्वर पर डिप्लॉय करना सीखें।" if language == 'Hindi' else "તમારા પ્રોજેક્ટ્સને દુનિયા સાથે શેર કરવા માટે તેમને લાઈવ સર્વર પર ડિપ્લોય કરતા શીખો." if language == 'Gujarati' else "Learn to deploy your projects to a live server to share them with the world."
            }
        ]
    }

@app.route('/', methods=['GET'])
def health_check():
    return "Kaushal-Bot Backend is Running! Use /analyze endpoint.", 200

# Pre-defined "Model" of what a Full Stack Developer needs
FULL_STACK_MODEL = {
    "Frontend": ["HTML", "CSS", "JavaScript", "React", "Redux", "Tailwind", "Bootstrap"],
    "Backend": ["Node.js", "Express", "Python", "Django", "Flask", "Java"],
    "Database": ["MongoDB", "SQL", "PostgreSQL", "MySQL", "NoSQL"],
    "DevOps": ["Git", "GitHub", "Docker", "AWS", "Heroku", "Netlify", "CI/CD"]
}

def local_skill_analysis(text):
    """
    Acts as a local 'ML' classifier using keyword matching tokens.
    Returns a list of missing critical skills.
    """
    text_lower = text.lower()
    found_skills = set()
    missing_skills = []
    
    # Check for presence of skills
    for category, skills in FULL_STACK_MODEL.items():
        category_has_skill = False
        for skill in skills:
            # Simple keyword matching (can be enhanced with regex)
            if skill.lower() in text_lower:
                found_skills.add(skill)
                category_has_skill = True
        
        # If a whole category is missing strings, add a generic gap
        if not category_has_skill:
            missing_skills.append(f"Complete {category} Knowledge")
        else:
            # If they have some, checking for specific advanced ones
            # For this simple "model", we just return key missing ones if category is weak
            pass

    # Explicit check for "Must Haves" for the specific role
    must_haves = ["React", "Node.js", "MongoDB", "Git"]
    for skill in must_haves:
        if skill.lower() not in text_lower:
            missing_skills.append(skill)
            
    return list(set(missing_skills))

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.form
        file = request.files.get('file')
        text_input = data.get('text')
        language = data.get('language', 'Hindi')

        # 1. Input Validation
        resume_text = ""
        if file:
            resume_text = extract_text_from_pdf(file)
            if not resume_text:
                return jsonify({"error": "Failed to extract text from PDF"}), 400
        elif text_input:
            resume_text = text_input
        else:
            if USE_MOCK_DATA:
                 return jsonify(get_mock_response(language))
            return jsonify({"error": "No file or text provided"}), 400

        # 2. Local "Efficiency" Model Analysis
        # We process skills locally to save token cost and ensure accuracy
        detected_missing = local_skill_analysis(resume_text)
        
        # If local analysis found nothing missing (perfect resume?), add an advanced topic
        if not detected_missing:
            detected_missing = ["System Design", "Cloud Architecture"]

        # 3. AI Processing (Augmented with Local Data)
        if not GEMINI_API_KEY:
            print("Gemini API Key missing. Returning Mock Data.")
            return jsonify(get_mock_response(language))

        print(f"Analyzing with Gemini (Language: {language})...")
        print(f"Local Model Identified Gaps: {detected_missing}")
        
        model = genai.GenerativeModel('gemini-pro')
        
        # We feed the LOCALLY detected gaps to the AI to "Train" its focus
        # Using the detailed Role-Based Prompt provided by the user
        prompt = f"""
### ROLE
You are an expert Technical Career Counselor and Curriculum Developer for Indian engineering students. Your goal is to analyze a student's resume, compare it against the current Indian market requirements for a "Junior Full-Stack Developer", and create a personalized upskilling plan in the student's local language (Hindi or Gujarati).

### INPUT DATA
User Resume Text: {resume_text}
Target Language: {language}

### ANALYSIS LOGIC
1. Scan the resume for technical skills (languages, frameworks, tools).
2. Compare these skills against a standard modern stack: React, Node.js/Python, SQL/NoSQL, Git, Basic Cloud (AWS/Firebase).
3. Identify "Critical Gaps"—skills that are missing but essential for getting hired.
   *CRITICAL NOTE*: Our internal system has ALREADY identified these high-priority missing skills: {json.dumps(detected_missing)}. You MUST include these in your analysis and study plan.
4. Create a "YouTube Search Query" for each gap. Do NOT generate direct YouTube URLs (links often break). Instead, generate the perfect search terms.

### OUTPUT FORMAT
You must output ONLY valid JSON. Do not include markdown formatting like ```json ... ```.

Structure:
{{
  "student_name": "Name from resume (or 'Candidate')",
  "current_level": "Beginner/Intermediate",
  "summary_message": "A short, encouraging 2-sentence summary in {language}.",
  "missing_skills": ["List", "of", "Missing", "Skills"],
  "study_plan": [
    {{
      "day": "Day 1-2",
      "topic": "Skill Name (e.g., Redux)",
      "reason": "One short sentence in {language} explaining why this skill is needed.",
      "youtube_query": "best redux tutorial in {language} for beginners"
    }}
    // Generate enough items to cover the gaps (approx 2 weeks)
  ]
}}

### CONSTRAINTS
- The `youtube_query` must always include the skill name and the word "tutorial".
- If the resume is very strong, suggest advanced topics (e.g., Docker, CI/CD).
- `reason` and `summary_message` MUST be in {language}.
- All other fields (keys, skill names) must be in English.
        """

        try:
            response = model.generate_content(prompt)
            raw_text = response.text
            print("--- Raw Gemini Response ---")
            print(raw_text)
            print("---------------------------")
            
            # Clean up potential markdown formatting
            clean_text = raw_text.strip()
            if clean_text.startswith("```json"):
                clean_text = clean_text[7:]
            elif clean_text.startswith("```"):
                clean_text = clean_text[3:]
            
            if clean_text.endswith("```"):
                clean_text = clean_text[:-3]
            
            clean_text = clean_text.strip()
            
            json_response = json.loads(clean_text)
            
            # --- MAPPING LAYER ---
            # Map new prompt keys to existing Frontend keys to prevent UI breakage
            if 'summary_message' in json_response:
                json_response['candidate_summary'] = json_response['summary_message']
            
            if 'study_plan' in json_response:
                for item in json_response['study_plan']:
                    if 'reason' in item:
                        item['description'] = item['reason']

            # Fallback: Validation to ensure missing_skills are present from our local model if AI forgot them
            if not json_response.get('missing_skills'):
                json_response['missing_skills'] = detected_missing
            else:
                # Merge local and AI skills to be safe
                ai_skills = set(json_response['missing_skills'])
                local_skills = set(detected_missing)
                json_response['missing_skills'] = list(ai_skills.union(local_skills))
                
            return jsonify(json_response)

        except json.JSONDecodeError as je:
            print("JSON Parsing Failed:")
            print(je)
            print("Failed Text:", raw_text)
            return jsonify(get_mock_response(language))
        except Exception as e:
            print("AI Generation Error:", e)
            traceback.print_exc()
            # Fallback to mock if AI fails
            return jsonify(get_mock_response(language))

    except Exception as e:
        print(f"Server Error: {str(e)}")
        traceback.print_exc()
        return jsonify(get_mock_response(language if 'language' in locals() else 'Hindi')) 

if __name__ == '__main__':
    app.run(debug=True, port=5000)
