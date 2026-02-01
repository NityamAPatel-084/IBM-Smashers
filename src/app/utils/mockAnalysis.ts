// Mock AI Analysis Engine
// Simulates PDF parsing and AI-powered skill gap analysis

export interface StudyPlanItem {
  topic: string;
  duration: string;
  youtube_search_term: string;
  reason: string;
}

export interface AnalysisResult {
  summary: string;
  skill_gaps: string[];
  study_plan: StudyPlanItem[];
}

// Mock resume data extraction (simulates PyPDF2)
const mockResumeProfiles = {
  beginner: {
    skills: ['HTML', 'CSS', 'JavaScript', 'Basic Git'],
    experience: 'fresher',
  },
  intermediate: {
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Git', 'REST APIs'],
    experience: '1-2 years',
  },
  advanced: {
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD', 'Redis'],
    experience: '3+ years',
  },
};

// Role-based skill requirements
const roleRequirements: Record<string, string[]> = {
  'Full Stack Developer': [
    'React',
    'Node.js',
    'TypeScript',
    'SQL/NoSQL Databases',
    'REST APIs',
    'Git',
    'Docker',
    'AWS/Cloud',
    'Redux/State Management',
    'Testing (Jest/Mocha)',
  ],
  'Frontend Developer': [
    'React',
    'TypeScript',
    'CSS/Tailwind',
    'Redux/State Management',
    'Webpack/Vite',
    'Testing (Jest)',
    'Responsive Design',
    'Git',
  ],
  'Backend Developer': [
    'Node.js',
    'Python/Java',
    'SQL/NoSQL',
    'REST APIs',
    'GraphQL',
    'Microservices',
    'Docker',
    'AWS/Cloud',
    'Redis',
    'Authentication/JWT',
  ],
  'Data Scientist': [
    'Python',
    'Pandas/NumPy',
    'Machine Learning',
    'TensorFlow/PyTorch',
    'SQL',
    'Data Visualization',
    'Statistics',
    'Jupyter Notebooks',
  ],
  'DevOps Engineer': [
    'Docker',
    'Kubernetes',
    'CI/CD (Jenkins/GitHub Actions)',
    'AWS/Azure/GCP',
    'Terraform',
    'Linux',
    'Monitoring (Prometheus)',
    'Scripting (Bash/Python)',
  ],
  'Mobile Developer': [
    'React Native',
    'Flutter',
    'iOS/Swift',
    'Android/Kotlin',
    'REST APIs',
    'Mobile UI/UX',
    'App Store Deployment',
    'Git',
  ],
};

// Generate study plan based on skill gaps
const generateStudyPlan = (skillGaps: string[], role: string): StudyPlanItem[] => {
  const studyPlans: Record<string, StudyPlanItem> = {
    React: {
      topic: 'React.js Fundamentals',
      duration: '3-4 Days',
      youtube_search_term: 'React JS full course for beginners 2024',
      reason: 'React is the most in-demand frontend library. Essential for building modern user interfaces.',
    },
    'Node.js': {
      topic: 'Node.js & Express',
      duration: '3-4 Days',
      youtube_search_term: 'Node.js Express MongoDB full tutorial',
      reason: 'Backend development with Node.js is crucial for full-stack roles. High industry demand.',
    },
    TypeScript: {
      topic: 'TypeScript Essentials',
      duration: '2-3 Days',
      youtube_search_term: 'TypeScript crash course for JavaScript developers',
      reason: 'TypeScript adds type safety and is now industry standard. Most companies require it.',
    },
    'SQL/NoSQL Databases': {
      topic: 'Database Management',
      duration: '4-5 Days',
      youtube_search_term: 'MongoDB MySQL PostgreSQL complete tutorial',
      reason: 'Database knowledge is fundamental. Every application needs data persistence.',
    },
    'REST APIs': {
      topic: 'RESTful API Design',
      duration: '2 Days',
      youtube_search_term: 'REST API tutorial for beginners complete guide',
      reason: 'API development is core to backend and full-stack roles. Critical for system integration.',
    },
    Git: {
      topic: 'Git & GitHub',
      duration: '1-2 Days',
      youtube_search_term: 'Git and GitHub complete tutorial for beginners',
      reason: 'Version control is mandatory in all development jobs. Collaboration essential.',
    },
    Docker: {
      topic: 'Docker Containerization',
      duration: '3 Days',
      youtube_search_term: 'Docker tutorial for beginners full course',
      reason: 'Docker is industry standard for deployment. Makes applications portable and scalable.',
    },
    'AWS/Cloud': {
      topic: 'AWS Cloud Basics',
      duration: '5-6 Days',
      youtube_search_term: 'AWS cloud practitioner full course free',
      reason: 'Cloud platforms like AWS are essential. 80% of companies use cloud infrastructure.',
    },
    'Redux/State Management': {
      topic: 'Redux & State Management',
      duration: '2-3 Days',
      youtube_search_term: 'Redux toolkit tutorial complete guide 2024',
      reason: 'State management is crucial for complex React apps. Required for scalable applications.',
    },
    'Testing (Jest/Mocha)': {
      topic: 'Testing & Test-Driven Development',
      duration: '3 Days',
      youtube_search_term: 'Jest testing tutorial React complete course',
      reason: 'Testing ensures code quality. Professional teams require unit and integration tests.',
    },
    'Python': {
      topic: 'Python Programming',
      duration: '4-5 Days',
      youtube_search_term: 'Python full course for beginners complete tutorial',
      reason: 'Python is versatile and used in web dev, data science, and automation.',
    },
    'Pandas/NumPy': {
      topic: 'Data Analysis with Pandas',
      duration: '3-4 Days',
      youtube_search_term: 'Pandas NumPy complete tutorial data analysis',
      reason: 'Essential libraries for data manipulation and analysis in Python.',
    },
    'Machine Learning': {
      topic: 'Machine Learning Fundamentals',
      duration: '7-10 Days',
      youtube_search_term: 'Machine learning full course Python scikit-learn',
      reason: 'ML is the foundation of AI/Data Science roles. High-paying skill.',
    },
    'TensorFlow/PyTorch': {
      topic: 'Deep Learning Frameworks',
      duration: '6-8 Days',
      youtube_search_term: 'TensorFlow PyTorch deep learning tutorial complete',
      reason: 'Deep learning frameworks are required for advanced AI projects.',
    },
    'Kubernetes': {
      topic: 'Kubernetes Orchestration',
      duration: '5-6 Days',
      youtube_search_term: 'Kubernetes tutorial for beginners full course',
      reason: 'K8s is the industry standard for container orchestration at scale.',
    },
    'CI/CD (Jenkins/GitHub Actions)': {
      topic: 'CI/CD Pipelines',
      duration: '3-4 Days',
      youtube_search_term: 'GitHub Actions CI CD tutorial complete guide',
      reason: 'Automated deployments are essential in modern DevOps practices.',
    },
    'Terraform': {
      topic: 'Infrastructure as Code',
      duration: '4 Days',
      youtube_search_term: 'Terraform tutorial for beginners complete course',
      reason: 'IaC is critical for managing cloud infrastructure efficiently.',
    },
    'React Native': {
      topic: 'React Native Mobile Development',
      duration: '5-6 Days',
      youtube_search_term: 'React Native full course build mobile apps',
      reason: 'Build cross-platform mobile apps. One codebase for iOS and Android.',
    },
    'Flutter': {
      topic: 'Flutter Mobile Development',
      duration: '5-6 Days',
      youtube_search_term: 'Flutter complete course for beginners mobile apps',
      reason: 'Flutter is Google\'s framework for beautiful native mobile apps.',
    },
    GraphQL: {
      topic: 'GraphQL API Development',
      duration: '2-3 Days',
      youtube_search_term: 'GraphQL tutorial complete guide Node.js',
      reason: 'Modern alternative to REST. Efficient data fetching for complex apps.',
    },
  };

  return skillGaps.map((skill) => studyPlans[skill] || {
    topic: skill,
    duration: '3 Days',
    youtube_search_term: `${skill} complete tutorial for beginners`,
    reason: `${skill} is an important skill for ${role} positions.`,
  });
};

// Main analysis function (simulates Gemini AI)
export const analyzeResume = async (file: File, role: string): Promise<AnalysisResult> => {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Randomly select a profile level (simulates PDF parsing)
  const profiles = Object.values(mockResumeProfiles);
  const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];

  // Get required skills for the role
  const requiredSkills = roleRequirements[role] || roleRequirements['Full Stack Developer'];

  // Calculate skill gaps
  const skillGaps = requiredSkills.filter(
    (skill) => !randomProfile.skills.some((userSkill) => 
      skill.toLowerCase().includes(userSkill.toLowerCase()) ||
      userSkill.toLowerCase().includes(skill.toLowerCase())
    )
  );

  // Generate study plan
  const studyPlan = generateStudyPlan(skillGaps.slice(0, 6), role);

  // Generate summary
  const summaryTemplates = [
    `Based on your resume analysis for ${role}, you have a ${randomProfile.experience} profile with ${randomProfile.skills.length} core skills. ${skillGaps.length} critical gaps identified. Focus on the recommended study plan to bridge these gaps and become job-ready.`,
    `Your resume shows ${randomProfile.experience} level expertise with strong foundation in ${randomProfile.skills.slice(0, 3).join(', ')}. To compete for ${role} positions, you need to master ${skillGaps.length} additional skills. Follow the personalized roadmap below.`,
    `Analysis complete! You're at ${randomProfile.experience} level with ${randomProfile.skills.length} skills mapped. ${skillGaps.length} high-priority gaps found. Companies hiring for ${role} expect these skills. Start learning today!`,
  ];

  const summary = summaryTemplates[Math.floor(Math.random() * summaryTemplates.length)];

  return {
    summary,
    skill_gaps: skillGaps,
    study_plan: studyPlan,
  };
};
