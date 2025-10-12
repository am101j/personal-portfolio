
export const resumeData = {
  name: 'Abeer Makin',
  title: 'Software & AI Engineer',
  contact: {
    email: 'abeermakin@gmail.com',
    phone: '+1 (548)-332-2337',
    linkedin: 'https://www.linkedin.com/in/abeer-makin',
    github: 'https://github.com/am101j',
  },
  summary: `a computer science student at the university of waterloo with an interest in building intelligent software solutions. i also enjoy playing guitar and choreographing dance.`,
  stats: {
    yearsOfExperience: 5,
    linesOfCode: 100000,
    coffeesConsumed: 1000,
  },
  fullResume: `Abeer Makin
Creative Developer & Designer
Contact: abeermakin@gmail.com | LinkedIn: /in/abeer-makin | GitHub: /am101j

TECHNICAL SKILLS
Languages: Java, Python, C, Racket, SQL, JavaScript, XML, HTML
Frameworks and Libraries: Spring Boot, Node.js, OpenCV, TensorFlow, NumPy, Matplotlib, Pandas, Flask, React
Developer Tools: Git, VS Code, PyCharm, IntelliJ IDEA, Google Cloud Platform, Spark, BigQuery, AWS, DataDog

EXPERIENCE
Wipro (May 2025 – August 2025) | Reading, United Kingdom
- Designed and deployed enterprise onboarding assistant tool with React and Typescript frontend, leveraged by Java Spring Boot APIs and PostgreSQL, serving 1000+ employees and reducing onboarding time by 25%
- Led development of metric pipelines on GCP with BigQuery for asset risk analysis in the water industry, enabling predictive asset maintenance and preventing £50K in infrastructure failures, through leveraging regression models.
- Leveraged LLM chatbot using Hugging Face transformers on AWS EC2 handling 1000+ equipment maintenance queries
- Delivered business solutions managing deliverables across cross-functional teams using Git and integrating CI/CD pipelines

West Berkshire Council (June 2023) | Newbury, United Kingdom
- Optimised helpdesk and audit trail processes in SQL systems, improving query performance by 25% and reducing latency
- Automated document processing pipelines via data extraction using XML and JavaScript, eliminating 10+ hours of manual work 
- Collaborated on enhancing chatbot integration, utilising Natural Language Processing for improved training while integrating DataDog monitoring for performance tracking, increasing query accuracy by 30% and reducing response time to <5 seconds

Siemens (May 2023) | London, United Kingdom
- Implemented A/B testing framework for industrial control systems for £100K operations, improving feedback loop efficiency by 12%
- Calibrated digital twin models for manufacturing equipment via real-time sensor data, achieving 85% accuracy in maintenance
- Validated next-gen IoT sensor technologies through software-hardware integration testing methodologies

GeeseHacks (January 2025) | Waterloo, Canada
- Developed high-traffic web application, serving 500+ students at University of Waterloo for study space finding optimization
- Engineered an end-to-end recommendation system with ETL pipelines, real-time user input processing and OOP based Python algorithms, achieving 82% satisfaction rate
- Built a responsive React frontend with live campus mapping and GraphQL API integration, supporting 1000+ queries daily

PROJECTS
AI Billing Anomaly Reporter | FastAPI, CrewAI, Tensorflow, React (December 2024)
- Building AI Agent framework processing 500+ bills, achieving 90% anomaly detection accuracy and reducing manual review by 50% 
- Implementing ML models with RAG-enhanced LLMs for charge validation, automatically flagging £20K in inconsistencies
- Built end-to-end pipelines with automated stakeholder reporting, delivering actionable insights through interactive dashboards

Resistor Classification | OpenCV, Tkinter, Python (January 2024)
- Engineered real-time resistor detection achieving 90% accuracy with GUI interface processing live camera feed
- Implemented computer vision pipelines using Canny edge detection, HSV spaces, and morphological operations for robust recognition
- Developed colour band extraction with contour analysis, reducing misclassification errors by 30% under varying lighting

EDUCATION
Bachelor of Computer Science, University of Waterloo, Canada (2024 - Present)
A Levels (Computer Science, Further Maths, Physics): Reading Grammar School, United Kingdom (2022 - 2024)

ADDITIONAL INFO
Skills: Problem-Solving, Analytical Thinking, Emotional Intelligence, Multilingual (English, French, Hindi, Punjabi), Microsoft Office
Certifications: IDEA Silver Award- Digital and Enterprise Skills. Qualified for Silver award in UKMT Math Challenge`,
  technicalSkills: {
    languages: ['Java', 'Python', 'C', 'Racket', 'SQL', 'JavaScript', 'XML', 'HTML'],
    frameworks: ['Spring Boot', 'Node.js', 'React', 'Flask', 'OpenCV', 'TensorFlow', 'NumPy', 'Matplotlib', 'Pandas'],
    developerTools: ['Git', 'VS Code', 'PyCharm', 'IntelliJ IDEA', 'GCP', 'Spark', 'BigQuery', 'AWS', 'DataDog'],
  },
  experience: [
    {
      company: 'Wipro',
      role: 'Software Engineer Intern',
      duration: 'May 2025 – August 2025',
      location: 'Reading, United Kingdom',
      technologies: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'GCP', 'BigQuery', 'AWS', 'Git'],
      description: [
        'Designed and deployed an enterprise onboarding assistant tool, reducing onboarding time by 25%.',
        'Led development of metric pipelines on GCP for predictive asset maintenance, preventing £50K in failures.',
        'Leveraged an LLM chatbot on AWS to handle over 1000 equipment maintenance queries.',
      ],
    },
    {
      company: 'West Berkshire Council',
      role: 'Software Developer Intern',
      duration: 'June 2023',
      location: 'Newbury, United Kingdom',
      technologies: ['SQL', 'XML', 'JavaScript', 'NLP', 'DataDog'],
      description: [
        'Optimised SQL helpdesk systems, improving query performance by 25%.',
        'Automated document processing pipelines, eliminating 10+ hours of manual work weekly.',
        'Enhanced an NLP chatbot, increasing query accuracy by 30% and reducing response time to <5s.',
      ],
    },
    {
        company: 'Siemens',
        role: 'Technology Intern',
        duration: 'May 2023',
        location: 'London, United Kingdom',
        technologies: ['A/B Testing', 'Digital Twin', 'IoT', 'Hardware Integration'],
        description: [
          'Implemented an A/B testing framework for industrial control systems, improving feedback loop efficiency by 12%.',
          'Calibrated digital twin models for manufacturing equipment, achieving 85% accuracy in predicting maintenance needs.',
          'Validated next-gen IoT sensor technologies through software-hardware integration testing.',
        ],
    },
    {
        company: 'GeeseHacks',
        role: 'Software Engineer',
        duration: 'January 2025',
        location: 'Waterloo, Canada',
        technologies: ['React', 'Python', 'GraphQL', 'ETL', 'OOP'],
        description: [
            'Developed a high-traffic web app serving 500+ students to find optimal study spaces.',
            'Engineered an end-to-end recommendation system with ETL pipelines, achieving an 82% user satisfaction rate.',
            'Built a responsive React frontend with live campus mapping, supporting over 1000 queries daily.',
        ],
    },
  ],
  projects: [
    {
      title: 'ClimateLens 🌍',
      summary: 'AI-powered web app for climate risk and environmental insights by location, with AI-generated PDF reports.',
      technologies: [
        'React', 'Vite', 'TailwindCSS', 'Vercel Analytics', 'FastAPI', 'Python', 'OpenAI API', 'Matplotlib', 'ReportLab', 'Poetry', 'CORS', 'dotenv'
      ],
      description: [
        'Enter an address to preview climate data: temperature trends, flooding risks, sustainability metrics, and more.',
        'Download detailed, AI-generated PDF reports for any location.',
        'Combines data visualization, automated report generation, and an intuitive interface.',
        'Frontend: React, Vite, TailwindCSS, Vercel Analytics, deployed on Vercel.',
        'Backend: FastAPI, Python, OpenAI API, Matplotlib, ReportLab, deployed on Render.',
        'AI: OpenAI GPT models for analysis and text generation.',
        'Other: Poetry for Python dependency management, CORS middleware, dotenv for environment management.'
      ],
      link: 'https://climatelens.vercel.app',
      github: 'https://github.com/am101j/climatelens',
      image: 'https://i.postimg.cc/3N4RV4FX/climatelens.png',
      "data-ai-hint": "climate intelligence app"
    },
    {
      title: 'AI Personal Finance Manager',
      summary: 'Intelligent personal finance management system with AI-powered analysis, real-time banking data, forecasting, and automated subscription management.',
      technologies: [
        'React', 'Recharts', 'Plaid API', 'Axios', 'FastAPI', 'Python', 'LangGraph', 'Groq LLM', 'Supabase', 'Prophet', 'PostgreSQL'
      ],
      description: [
        'Plaid API integration for secure connection to 11,000+ banks and real-time transaction sync.',
        'Automatic transaction categorization, multi-account support, and balance tracking.',
        'AI-powered chat agent for natural language financial queries and advice.',
        '2-week spending forecasting using Prophet time series analysis.',
        'AI identifies recurring payments and subscriptions, with automated subscription management.',
        'Interactive React dashboard with real-time charts and spending trends by category.',
        'Automated budget alerts and predictive analytics for future expenses.',
        'Negotiation automation: generates and sends discount request emails for subscriptions.',
        'Finds cheaper alternatives and tracks potential savings opportunities.',
        'Backend: FastAPI, LangGraph, Groq LLM, Supabase/PostgreSQL, Prophet.',
        'Frontend: React 18, Recharts, Plaid Link, Axios.'
      ],
      link: '#',
      github: 'https://github.com/am101j/ai_finance_agent.git',
      image: 'https://postimg.cc/tZ5Jfqx1',
      "data-ai-hint": "personal finance dashboard"
    },
    {
      title: 'AI Billing Anomaly Reporter',
      summary: 'AI agent to process bills, detect anomalies, and flag inconsistencies, reducing manual review by 50%.',
      technologies: ['FastAPI', 'CrewAI', 'Tensorflow', 'React'],
      description: [
        'Built an AI agent to process 500+ bills, achieving 90% anomaly detection accuracy.',
        'Reduced manual bill review time by 50% using RAG-enhanced LLMs.',
        'Flagged over £20K in billing inconsistencies automatically.'
      ],
      link: '#',
      github: 'https://github.com/Pear277/BillingAnomolyFixer',
      image: 'https://i.postimg.cc/wv4nvzRV/billing.png',
      "data-ai-hint": "AI dashboard",
    },
    {
      title: 'Resistor Classification',
      summary: 'A real-time resistor color code reader using computer vision to identify resistor values from a live camera feed.',
      technologies: ['OpenCV', 'Tkinter', 'Python'],
      description: [
        'Engineered real-time resistor detection from a live camera feed with 90% accuracy.',
        'Implemented computer vision pipelines to reduce misclassification errors by 30%.',
        'Developed a GUI for easy interaction and live analysis.'
      ],
      link: '#',
      github: 'https://github.com/am101j/resistor-recognition',
      image: 'https://i.postimg.cc/KjMFhjpL/image.png',
      "data-ai-hint": "circuit board",
    },
    {
      title: 'WatSpot',
      summary: 'A smart web app that helps University of Waterloo students find ideal study spots based on personal preferences.',
      technologies: ['React', 'Node.js', 'GraphQL', 'Google Maps API'],
      description: [
        'Provides tailored recommendations based on preferences like noise level and amenities.',
        'Features real-time campus maps to guide users from their location.',
        'Simplifies the process of finding a suitable study space, saving students time.'
      ],
      link: '#',
      github: 'https://github.com/am101j/WatSpot',
      image: 'https://i.postimg.cc/j5r24vyV/406722433-07b2d8e3-d70e-4e56-b701-e78d69020785.png',
      "data-ai-hint": "campus map study",
    },
    {
      title: 'Note Summariser',
      summary: 'An AI-powered app that transforms lengthy notes into concise summaries using NLP.',
      technologies: ['React', 'FastAPI', 'Python', 'Transformers', 'Supabase'],
      description: [
        "Uses Facebook's BART model for high-quality text summarization.",
        "Get instant summaries with a simple click.",
        "View and manage previously generated summaries.",
        "Clean, responsive interface with glass morphism design.",
        "Summaries are stored in Supabase for future reference."
      ],
      link: '#',
      github: 'https://github.com/am101j/ai-note-summariser',
      image: 'https://i.postimg.cc/7PKP5qtr/image.png',
      "data-ai-hint": "text summarizer",
    },
    {
      title: 'WaterRunner Game',
      summary: 'An endless runner game built in Unity to gamify and promote water-saving habits.',
      technologies: ['Unity', 'C#'],
      description: [
        'Genre: Endless Runner',
        'Platform: Unity Game Engine',
        'Objective: Navigate through obstacles, repair them using tools, and achieve the highest score',
        'Player movement and controls',
        'Obstacle spawning system',
        'Interactive repair mechanics with drag-and-drop tools',
        'Score tracking and leaderboard system',
        'User authentication and database integration',
        'Fun facts display',
        'Audio and visual effects',
        'Movement: Player runs automatically and can move between lanes',
        'Obstacles: Various obstacles spawn that need to be repaired',
        'Repair System: Drag tools to target zones to fix obstacles',
        'Scoring: Points awarded for successfully repairing obstacles',
        'Game Over: Game ends after encountering 10 obstacles',
      ],
      link: '#',
      github: 'https://github.com/am101j/RunAway',
      image: 'https://i.postimg.cc/Z5H2YqK1/image.png',
      "data-ai-hint": "endless runner game",
    },
    {
      title: 'Onboarding Assistant',
      summary: 'A Flask web application for managing employee onboarding processes, featuring role-based dashboards for HR, managers, and new hires.',
      technologies: ['Flask', 'Python', 'SQL', 'HTML/CSS'],
      description: [
        'Admin Dashboard: HR and managers can view employees under their supervision and mark onboarding tasks as complete.',
        'Employee Dashboard: New hires can view their assigned onboarding tasks and completion status.',
        'User Authentication: Role-based access control (HR, Manager, New Hire).',
        'Task Management: Track onboarding progress with due dates and status updates.'
      ],
      link: '#',
      github: '#',
      image: 'https://i.postimg.cc/3N4RV4FX/image.png',
      "data-ai-hint": "employee dashboard tasks",
    }
  ],
  education: [
      // Education data could be added here if needed for a separate section
  ]
};
