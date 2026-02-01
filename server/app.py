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

# Multi-Role "Expert System" Model for deterministic skill gap analysis
SKILL_MODELS = {
    "Full Stack Developer": {
        "Frontend": ["HTML", "CSS", "JavaScript", "React", "Redux", "Tailwind", "Bootstrap", "Next.js"],
        "Backend": ["Node.js", "Express", "Python", "Django", "Flask", "Java", "PHP"],
        "Database": ["MongoDB", "SQL", "PostgreSQL", "MySQL", "Prisma", "Redis"],
        "MustHaves": ["React", "Node.js", "SQL", "Git"]
    },
    "Data Scientist": {
        "Languages": ["Python", "R", "SQL", "Scala"],
        "ML_Libraries": ["Scikit-learn", "Pandas", "NumPy", "TensorFlow", "PyTorch", "Keras"],
        "Visualization": ["Tableau", "PowerBI", "Matplotlib", "Seaborn"],
        "MustHaves": ["Python", "Pandas", "Scikit-learn", "SQL"]
    },
    "DevOps Engineer": {
        "Cloud": ["AWS", "Azure", "GCP", "DigitalOcean"],
        "Containers": ["Docker", "Kubernetes", "Containerd"],
        "CI_CD": ["Jenkins", "GitHub Actions", "GitLab CI", "CircleCI"],
        "Infrastructure": ["Terraform", "Ansible", "CloudFormation"],
        "MustHaves": ["Docker", "Kubernetes", "AWS", "Git"]
    },
    "Mobile App Developer": {
        "CrossPlatform": ["React Native", "Flutter", "Ionic"],
        "Native": ["Swift", "Kotlin", "Java", "Objective-C"],
        "Tools": ["Xcode", "Android Studio", "Firebase"],
        "MustHaves": ["React Native", "Flutter", "Mobile UI", "API"]
    }
}

def local_skill_analysis(text, target_role):
    """
    Acts as a local 'ML' classifier using keyword matching tokens.
    Returns a list of missing critical skills based on the target role.
    """
    text_lower = text.lower()
    missing_skills = []
    
    # Get model for the specific role (fallback to Full Stack)
    role_model = SKILL_MODELS.get(target_role, SKILL_MODELS["Full Stack Developer"])
    
    # Check category coverage
    for category, skills in role_model.items():
        if category == "MustHaves": continue
        
        category_found = False
        for skill in skills:
            if skill.lower() in text_lower:
                category_found = True
                break
        
        if not category_found:
            missing_skills.append(f"Basic {category} Knowledge")

    # Explicit check for "Must Haves"
    for skill in role_model.get("MustHaves", []):
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
        target_role = data.get('role', 'Full Stack Developer')  # NEW: Target role

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
        detected_missing = local_skill_analysis(resume_text, target_role)
        
        # If local analysis found nothing missing (perfect resume?), add an advanced topic
        if not detected_missing:
            detected_missing = ["System Design", "Cloud Architecture"]

        # 3. AI Processing (Augmented with Local Data)
        if not GEMINI_API_KEY:
            print("Gemini API Key missing. Returning Mock Data.")
            return jsonify(get_mock_response(language))

        print(f"Analyzing with Gemini (Language: {language}, Role: {target_role})...")
        print(f"Local Model Identified Gaps: {detected_missing}")
        
        # Expert Brain Integration: Check for custom tuned model
        tuned_model = os.getenv("TUNED_MODEL_NAME")
        model_name = tuned_model if tuned_model else 'gemini-1.5-flash'
        model = genai.GenerativeModel(model_name)
        
        # Enhanced prompt combining both approaches
        prompt = f"""
### ROLE
You are an expert Technical Career Counselor and Curriculum Developer for Indian engineering students.

### TASK
Analyze this resume against the requirements for a **{target_role}** position in the Indian job market.

### INPUT DATA
Resume Text: {resume_text}
Target Role: {target_role}
Response Language: {language}

### ANALYSIS LOGIC
1. Compare the candidate's skills against standard requirements for a {target_role}
2. Our internal ML system has flagged these high-priority gaps: {json.dumps(detected_missing)}
3. Identify additional critical skill gaps beyond what our system detected
4. For each gap, create optimized YouTube search terms (use keywords like "crash course", "full tutorial", "complete guide")

### OUTPUT FORMAT
Return ONLY valid JSON (no markdown, no code blocks):

{{
  "student_name": "Name from resume or 'Candidate'",
  "current_level": "Beginner/Intermediate/Advanced",
  "summary": "2-3 sentence encouraging analysis in {language} about their readiness for {target_role}",
  "skill_gaps": ["Skill 1", "Skill 2", "Skill 3"],
  "study_plan": [
    {{
      "topic": "Skill Name",
      "duration": "X Days",
      "youtube_search_term": "optimized search query for best tutorials in {language}",
      "reason": "Why this skill is critical for {target_role} (in {language})"
    }}
  ]
}}

### CONSTRAINTS
- `summary` and `reason` MUST be in {language}
- `youtube_search_term` must include skill name + "tutorial" or "crash course"
- Generate 5-7 study plan items covering 2 weeks
- Prioritize the gaps identified by our system: {json.dumps(detected_missing)}
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
            if 'summary' in json_response:
                json_response['candidate_summary'] = json_response['summary']
            elif 'summary_message' in json_response:
                json_response['candidate_summary'] = json_response['summary_message']
            
            # Map skill_gaps to missing_skills for consistency
            if 'skill_gaps' in json_response:
                json_response['missing_skills'] = json_response['skill_gaps']
            
            if 'study_plan' in json_response:
                for item in json_response['study_plan']:
                    # Map reason -> description
                    if 'reason' in item:
                        item['description'] = item['reason']
                    
                    # Map duration -> day if needed
                    if 'duration' in item and 'day' not in item:
                        item['day'] = item['duration']
                    
                    # Map youtube_search_term -> youtube_query for consistency
                    if 'youtube_search_term' in item:
                        item['youtube_query'] = item['youtube_search_term']

            # Fallback: Validation to ensure missing_skills are present from our local model if AI forgot them
            if not json_response.get('missing_skills') and not json_response.get('skill_gaps'):
                json_response['missing_skills'] = detected_missing
            else:
                # Merge local and AI skills to be safe
                ai_skills = set(json_response.get('missing_skills', []) or json_response.get('skill_gaps', []))
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
