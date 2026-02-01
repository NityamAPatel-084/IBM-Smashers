import google.generativeai as genai
import os
import time
from dotenv import load_dotenv

# Load API Key from .env
load_dotenv()

# 1. Setup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY not found in .env file")
    exit(1)

genai.configure(api_key=GEMINI_API_KEY)

# 2. Prepare your Dataset (The "Teaching" Examples)
# This list teaches the AI exactly how you want it to behave.
training_data = [
    {
        "text_input": "Resume: Skills: React, Tailwind. Role: Full Stack Dev.",
        "output": """{"missing_skills": ["Node.js", "Express", "MongoDB"], "youtube_query": "MERN Stack full course hindi"}"""
    },
    {
        "text_input": "Resume: Skills: Python, SQL. Role: Data Analyst.",
        "output": """{"missing_skills": ["PowerBI", "Statistics"], "youtube_query": "PowerBI crash course for beginners in Gujarati"}"""
    },
    # Tip: Add 50+ examples here from your CSV for real accuracy
]

def train_model():
    print("Starting Fine-Tuning... (This happens on Google's servers)")
    try:
        operation = genai.create_tuned_model(
            source_model='models/gemini-1.5-flash-001-tuning',
            training_data=training_data,
            id="kaushal-bot-v1", # Your custom model name
            epoch_count=20, 
            batch_size=4,
            learning_rate=0.001
        )

        for status in operation.wait_bar():
            time.sleep(10)

        print(f"\nModel Trained successfully!")
        print(f"Update your .env file with: TUNED_MODEL_NAME={operation.name}")
        return operation.name
    except Exception as e:
        print(f"Error during training: {e}")
        return None

if __name__ == "__main__":
    train_model()
