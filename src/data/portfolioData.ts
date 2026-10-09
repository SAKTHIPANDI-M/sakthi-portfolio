export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  shortDesc: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  highlights: string[];
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    technologies: string[];
    howItWorks: string[];
    myContribution: string[];
    results: string;
    metrics: { label: string; value: string }[];
  };
}

export interface Certificate {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  issuer: string;
  category?: string;
  description: string;
  date?: string;
  verificationUrl?: string;
  poweredBy?: string;
  courseCode?: string;
  recipient?: string;
  institution?: string;
  isHackathon?: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  items: {
    name: string;
    description: string;
    level: string;
    badge: string;
  }[];
}

export interface AITool {
  name: string;
  category: string;
  role: string;
  description: string;
  primaryUse: string;
  tag: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "SAKTHI PANDI",
    shortName: "SAKTHI",
    footerName: "SAKTHIPANDI M",
    title: "AI DEVELOPER",
    secondaryTitle: "COMPUTER SCIENCE STUDENT",
    tagline: "BUILD. LEARN. CREATE. EVOLVE.",
    subTagline: "TURNING IDEAS INTO INTELLIGENT EXPERIENCES.",
    location: "CHENNAI, INDIA",
    year: "2026",
    status: "AVAILABLE FOR INTERNSHIPS",
    statusHero: "OPEN TO INTERNSHIPS & COLLABORATIONS",
    bio: "I build intelligent applications, machine learning solutions and modern digital experiences using Python, AI and web technologies.",
    aboutStatement: "BUILDING WITH CODE. THINKING WITH AI.",
    aboutDescription: "I am a B.Sc Computer Science with Artificial Intelligence student passionate about building practical AI, machine learning and web-based applications. I enjoy learning new technologies, solving problems and turning ideas into working products.",
    email: "sakthipandi.official@gmail.com",
    github: "https://github.com/SAKTHIPANDI-M?tab=repositories",
    linkedin: "https://www.linkedin.com/in/sakthi-pandi-1411h",
  },

  stats: [
    { value: "8.3", label: "CGPA", detail: "Consistent academic excellence" },
    { value: "2027", label: "GRADUATION", detail: "S.I.V.E.T. College, Chennai" },
    { value: "AI", label: "SPECIALIZATION", detail: "Artificial Intelligence & ML" },
    { value: "PYTHON", label: "PRIMARY LANGUAGE", detail: "Core algorithmic & data stack" }
  ],

  education: {
    number: "01",
    degree: "B.Sc Computer Science with Artificial Intelligence",
    institution: "S.I.V.E.T. College, Chennai",
    period: "2024 — 2027",
    highlights: [
      "Focused coursework in Artificial Intelligence, Data Structures & Python Programming",
      "Building practical machine learning models and intelligent web applications",
      "Active participant in technical symposiums, hackathons and peer coding circles"
    ]
  },

  skills: [
    {
      category: "PROGRAMMING",
      items: [
        { name: "Python", desc: "Core language for ML algorithms, data pipelines, automation, and backend APIs." },
        { name: "Java", desc: "Object-oriented programming, standard algorithmic problem solving, and software fundamentals." }
      ]
    },
    {
      category: "AI / MACHINE LEARNING",
      items: [
        { name: "Machine Learning", desc: "Supervised and unsupervised learning, model training, feature selection, and evaluation." },
        { name: "Scikit-learn", desc: "Predictive data analysis, regression, classification, pipelines, and model evaluation metrics." },
        { name: "Pandas", desc: "High-performance data manipulation, exploratory data analysis, wrangling, and feature engineering." },
        { name: "NumPy", desc: "Vectorized numerical computing, multi-dimensional array operations, and mathematical routines." }
      ]
    },
    {
      category: "WEB DEVELOPMENT",
      items: [
        { name: "HTML", desc: "Semantic structural markup with accessible design patterns." },
        { name: "CSS", desc: "Modern styling, flexbox/grid architectures, responsive design, and CSS variables." },
        { name: "JavaScript", desc: "Client-side interactivity, DOM manipulation, asynchronous programming, and API integration." },
        { name: "Flask", desc: "Lightweight Python micro-framework for serving ML models and RESTful web endpoints." },
        { name: "Streamlit", desc: "Rapid prototyping and interactive dashboard generation for machine learning applications." }
      ]
    },
    {
      category: "TOOLS",
      items: [
        { name: "Git", desc: "Distributed version control, branching workflows, and commit history management." },
        { name: "GitHub", desc: "Open-source code hosting, portfolio repositories, and collaborative development." },
        { name: "VS Code", desc: "Primary integrated development environment configured with Python & AI tooling." },
        { name: "Jupyter", desc: "Interactive computing, rapid exploratory data analysis, and step-by-step ML prototyping." }
      ]
    }
  ],

  aiWorkspace: {
    label: "03 — AI WORKSPACE",
    heading: "MY AI TOOLKIT",
    description: "Exploring modern AI tools to research, prototype, build and improve ideas.",
    tools: [
      {
        name: "ChatGPT",
        category: "LLM / Research",
        role: "Conceptual reasoning, architecture design & mathematical validation",
        description: "Utilized for synthesizing complex papers, generating test scenarios, and debugging algorithm logic.",
        tag: "OPENAI"
      },
      {
        name: "Claude",
        category: "Deep Analysis",
        role: "Code refactoring, system architecture & deep contextual reasoning",
        description: "Employed for nuanced documentation review, rigorous logic verification, and clean software patterns.",
        tag: "ANTHROPIC"
      },
      {
        name: "Gemini",
        category: "Multimodal AI",
        role: "Multimodal data processing, long-context analysis & fast prototyping",
        description: "Google's frontier model used for rapid multimodal workflows and API integrations.",
        tag: "GOOGLE"
      },
      {
        name: "Grok",
        category: "Real-time Intelligence",
        role: "Real-time tech trends, unfiltered perspectives & rapid ideation",
        description: "Monitors emerging open-source model releases and industry AI benchmarks.",
        tag: "xAI"
      },
      {
        name: "Cursor AI",
        category: "AI IDE",
        role: "Agentic coding, instant codebase navigation & accelerated development",
        description: "Supercharges development workflow by predicting edits and refactoring full multi-file components.",
        tag: "EDITOR"
      },
      {
        name: "Gamma",
        category: "Visual Storytelling",
        role: "AI presentation generation, system diagrams & visual project briefs",
        description: "Translates complex ML architectures into clean visual presentations for project reviews.",
        tag: "VISUAL"
      },
      {
        name: "Z AI",
        category: "Synthetic Reasoning",
        role: "Specialized model experimentation & workflow acceleration",
        description: "Explores next-generation synthetic agents and generative computing pipelines.",
        tag: "LAB"
      }
    ]
  },

  projects: [
    {
      id: "heart-disease-prediction",
      number: "01",
      title: "AI-POWERED HEART DISEASE RISK PREDICTION",
      category: "AI / MACHINE LEARNING",
      shortDesc: "A machine learning based application that predicts heart disease risk using user health-related input data.",
      tags: ["Python", "Scikit-learn", "Flask", "HTML", "CSS"],
      githubUrl: "https://github.com/SAKTHIPANDI-M?tab=repositories",
      demoUrl: "#interactive-demo",
      highlights: [
        "Trained on validated cardiac health clinical datasets with supervised classification models",
        "Interactive web portal with immediate risk stratification (Low, Moderate, High)",
        "Feature importance scoring highlighting blood pressure, cholesterol, and resting ECG indicators"
      ],
      caseStudy: {
        overview: "Heart disease remains one of the world's leading causes of mortality. Early identification of cardiac vulnerability allows preventative interventions before acute incidents occur. This project develops an end-to-end predictive diagnostic assistant that ingests key clinical health markers and computes real-time cardiovascular risk probability.",
        problem: "Clinical diagnostics often face bottlenecks in early triage. Patients in remote or preliminary checkups need quick, accurate screening metrics to identify whether cardiovascular symptoms warrant immediate cardiologist referral.",
        solution: "Engineered a streamlined machine learning pipeline using Scikit-learn that evaluates patient parameters (age, resting blood pressure, serum cholesterol, fasting blood sugar, maximum heart rate achieved, and exercise-induced angina). Deployed the model via a lightweight Flask web API with a high-contrast, responsive interface.",
        technologies: ["Python", "Scikit-learn", "Flask", "Pandas", "NumPy", "HTML5", "CSS3"],
        howItWorks: [
          "Data pre-processing: missing value handling, outlier clipping, and standard scaling of numerical indicators.",
          "Model training & validation: evaluated Logistic Regression and Random Forest Classifiers with stratified k-fold cross-validation.",
          "Inference engine: receives JSON payload from client, scales features, runs inference, and returns confidence probability score.",
          "Visual risk stratification: categorizes risk index into actionable guidance thresholds."
        ],
        myContribution: [
          "Curated and preprocessed patient datasets ensuring unbiased class distributions.",
          "Implemented cross-validation pipelines and tuned hyper-parameters to minimize false negatives.",
          "Constructed the Flask backend routing and developed the user-facing web diagnostic portal."
        ],
        results: "Delivers reliable real-time risk predictions within 80ms inference response time with over 86% validation accuracy on clinical test subsets.",
        metrics: [
          { label: "Validation Accuracy", value: "86.4%" },
          { label: "Inference Latency", value: "<80ms" },
          { label: "Key Predictors", value: "11 Clinical Factors" }
        ]
      }
    },
    {
      id: "fifa-2026-predictor",
      number: "02",
      title: "FIFA 2026 PREDICTOR",
      category: "AI / DATA ANALYTICS",
      shortDesc: "A football prediction project using data analysis and machine learning concepts to explore FIFA 2026 outcomes.",
      tags: ["Python", "Pandas", "Machine Learning", "Streamlit"],
      githubUrl: "https://github.com/SAKTHIPANDI-M?tab=repositories",
      demoUrl: "#interactive-demo",
      highlights: [
        "Historical World Cup match telemetry, team Elo rankings, and player aggregated metrics",
        "Predictive simulation engine calculating win, draw, and tournament progression probabilities",
        "Streamlit-powered interactive interface with custom head-to-head tactical comparisons"
      ],
      caseStudy: {
        overview: "The FIFA World Cup 2026 introduces an expanded 48-team format across North America. This project applies statistical modeling and machine learning algorithms to simulate tournament bracket outcomes, team win probabilities, and goal distributions based on historical performance data.",
        problem: "Predicting international football match outcomes involves high stochastic variance, team momentum, tactical matchups, and historical tournament pressure factors that simple averages fail to encapsulate.",
        solution: "Built a predictive analytical pipeline leveraging historical match data from past tournaments, FIFA international rankings, goal differentials, and recent form metrics. Developed predictive classification algorithms that calculate expected win-draw-loss probability matrices.",
        technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Streamlit", "Matplotlib"],
        howItWorks: [
          "Dataset ingestion: 30+ years of international match results, goal differentials, and tournament stages.",
          "Feature engineering: calculated rolling form indices, offensive potency, defensive solidity, and Elo differentials.",
          "Predictive model: Poisson regression for expected goals alongside gradient boosting for match winner probabilities.",
          "Interactive interface: Streamlit dashboard allowing users to select any two competing nations to preview simulation odds."
        ],
        myContribution: [
          "Aggregated and cleaned large-scale international football datasets across multiple sources.",
          "Designed dynamic feature extraction scripts calculating home advantage and weighted recent tournament performance.",
          "Implemented the interactive Streamlit simulation portal with radar chart comparisons."
        ],
        results: "Successfully models goal distributions and simulated 1,000+ Monte Carlo tournament paths for 2026 bracket forecasting.",
        metrics: [
          { label: "Historical Matches Analyzed", value: "4,500+" },
          { label: "Simulation Runs", value: "1,000 MC" },
          { label: "Interface Stack", value: "Streamlit + Python" }
        ]
      }
    },
    {
      id: "student-management-system",
      number: "03",
      title: "STUDENT MANAGEMENT SYSTEM",
      category: "WEB DEVELOPMENT",
      shortDesc: "A simple student management interface designed to organize and manage student information through a clean web interface.",
      tags: ["HTML", "CSS", "JavaScript"],
      githubUrl: "https://github.com/SAKTHIPANDI-M?tab=repositories",
      demoUrl: "#interactive-demo",
      highlights: [
        "Complete CRUD lifecycle (Create, Read, Update, Delete) for academic student records",
        "Fast client-side search, filtering by department, GPA sorting, and attendance tracking",
        "Responsive, high-contrast dark dashboard interface with zero external framework dependencies"
      ],
      caseStudy: {
        overview: "Academic institutions require intuitive, reliable record management systems to track student enrollments, course registrations, and grade performance. This application provides a streamlined, lightweight administrative interface built with vanilla web technologies.",
        problem: "Many legacy university portals are cluttered, slow to load, and cumbersome for teachers and department representatives needing quick record updates during lab sessions.",
        solution: "Crafted a clean, high-contrast web application adhering to strict semantic HTML, modular CSS grid structures, and asynchronous JavaScript state handling with local storage persistence and quick export capabilities.",
        technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "LocalStorage API"],
        howItWorks: [
          "State management: modular JavaScript store handling record additions, modifications, and soft deletions.",
          "Search & filter engine: live debounced string matching across student IDs, names, and academic branches.",
          "Data validation: strict client-side validation preventing duplicate roll numbers and verifying grade formats.",
          "Export utility: instant CSV generation of filtered student roster lists for administrative reporting."
        ],
        myContribution: [
          "Designed the complete responsive UI layout prioritizing legible typography and fast data entry.",
          "Programmed modular JavaScript classes for state, validation, and table rendering.",
          "Implemented instant search filtering with zero latency."
        ],
        results: "Zero external dependencies, sub-50KB bundle weight, instantaneous search and record manipulation.",
        metrics: [
          { label: "Framework Footprint", value: "0kb (Pure Vanilla)" },
          { label: "Search Latency", value: "<5ms" },
          { label: "Operations", value: "Full CRUD" }
        ]
      }
    }
  ],

  process: [
    {
      step: "01",
      title: "DISCOVER",
      summary: "Understand the problem and requirements.",
      details: "Deep dive into the underlying problem domain. Identify key user needs, data availability, computational constraints, and success metrics before writing a single line of code."
    },
    {
      step: "02",
      title: "PLAN",
      summary: "Design the solution, architecture and workflow.",
      details: "Formulate the architecture: choose algorithms, data schemas, API contracts, model evaluation strategies, and user interface wireframes to ensure robust foundation."
    },
    {
      step: "03",
      title: "BUILD",
      summary: "Develop the application and AI/ML components.",
      details: "Write clean, modular code. Implement data preprocessing pipelines, train and tune machine learning models, and build high-performance web backends and interfaces."
    },
    {
      step: "04",
      title: "TEST",
      summary: "Debug, test and improve the application.",
      details: "Rigorously validate model metrics, cross-validation scores, edge cases, error handling, responsiveness, and performance profiling."
    },
    {
      step: "05",
      title: "DEPLOY",
      summary: "Deploy, maintain and continuously improve.",
      details: "Ship solutions with clean version control, comprehensive documentation, and iterative enhancements based on testing and user feedback."
    }
  ],

  currentlyLearning: [
    {
      title: "ADVANCED PYTHON",
      desc: "Metaclasses, asynchronous concurrency (asyncio), memory profiling, and high-throughput vector processing."
    },
    {
      title: "MACHINE LEARNING",
      desc: "Deep mathematical intuitions behind gradient descent, ensemble learning, and hyper-parameter optimization."
    },
    {
      title: "NLP",
      desc: "Natural Language Processing, tokenization pipelines, embeddings, semantic search, and transformer architectures."
    },
    {
      title: "COMPUTER VISION",
      desc: "Convolutional neural networks, image classification, object detection fundamentals, and spatial feature maps."
    },
    {
      title: "MODERN WEB DEVELOPMENT",
      desc: "Modern TypeScript, reactive state primitives, and high-performance server-rendered architectures."
    },
    {
      title: "SUPABASE",
      desc: "PostgreSQL relational schemas, row-level security policies, realtime subscriptions, and vector extensions (pgvector)."
    },
    {
      title: "AI TOOLS",
      desc: "Agentic workflows, prompt engineering frameworks, automated code intelligence, and multimodal reasoning loops."
    }
  ],

  certifications: [
    {
      id: "naan-mudhalvan-frontend",
      number: "01",
      title: "Front End Development",
      issuer: "Naan Mudhalvan",
      category: "Web Development",
      description: "Comprehensive front end development curriculum covering responsive UI design, modern web architecture, and interactive client-side engineering.",
      verificationUrl: "http://api.naanmudhalvan.tn.gov.in/api/v1/college/student_certificate/validate?certificate_no=NME2526AUNM38498756894"
    },
    {
      id: "ibm-gen-ai-analytics",
      number: "02",
      title: "Generative AI and Data Analytics",
      issuer: "IBM",
      category: "AI & Data Analytics",
      description: "Practical mastery of generative AI workflows, large language model implementations, and advanced data analytical methodologies.",
      verificationUrl: "https://www.credly.com/badges/ec1865d2-29e9-4349-9bf5-05fa555c0797/public_url"
    },
    {
      id: "ibm-watsonx",
      number: "03",
      title: "IBM WATSONX",
      issuer: "IBM",
      category: "Enterprise AI Platforms",
      description: "Enterprise AI and machine learning lifecycle management using the IBM watsonx AI and data platform.",
      verificationUrl: "https://courses.ibmcep.cognitiveclass.al/certificates/8715d6b6b56241cfb3fb23a21aa1fa38"
    },
    {
      id: "ibm-web-fundamentals",
      number: "04",
      title: "Web Development Fundamentals",
      issuer: "IBM / Credly",
      category: "Web Development",
      description: "Core fundamentals of modern web architecture, client-server models, and industry-standard web development practices.",
      verificationUrl: "https://www.credly.com/badges/1845-48-4362-dal-175663992378"
    },
    {
      id: "gencodare-26",
      number: "05",
      title: "GENCODARE’26",
      subtitle: "24-Hour State-Level Hackathon",
      issuer: "Agni College of Technology",
      department: "Department of Information Technology",
      category: "State-Level Hackathon",
      description: "Certificate of Participation awarded for demonstrating rapid problem solving and technical implementation in the 24-hour state-level hackathon.",
      date: "September 25–26, 2026",
      recipient: "SAKTHIPANDI M",
      institution: "S.I.V.E.T. College",
      isHackathon: true
      // No verificationUrl - verification pending
    },
    {
      id: "deep-learning-analytics",
      number: "06",
      title: "Deep Learning Analytics",
      subtitle: "Successfully completed and received a passing grade",
      issuer: "Star Systems (India) Private Limited",
      poweredBy: "IBM Developer Skills Network",
      category: "Deep Learning & Neural Networks",
      courseCode: "CEDLA1IN",
      description: "Successfully completed and received a passing grade in Deep Learning Analytics, mastering deep neural architectures, feature representation, and model evaluation.",
      date: "September 30, 2026",
      recipient: "SAKTHIPANDI M",
      verificationUrl: "https://courses.starsystems.skillsnetwork.site/certificates/d687d0883f344f308cc2f3926260eed0"
    }
  ]
};
