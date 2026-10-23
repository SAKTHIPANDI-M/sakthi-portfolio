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
  image: string;
  originalFileName?: string;
  verificationUrl?: string;
  poweredBy?: string;
  courseCode?: string;
  recipient?: string;
  institution?: string;
  department?: string;
  isHackathon?: boolean;
}

export interface ExperienceItem {
  number: string;
  role: string;
  company: string;
  period: string;
  location: string;
  badge: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  number: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  statusBadge: string;
  highlights: string[];
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
    fullName: "SAKTHIPANDI M",
    shortName: "SAKTHI",
    footerName: "SAKTHIPANDI M",
    title: "AI & ML DEVELOPER",
    secondaryTitle: "COMPUTER SCIENCE WITH AI STUDENT",
    tagline: "BUILD. LEARN. CREATE. EVOLVE.",
    subTagline: "TURNING IDEAS INTO INTELLIGENT EXPERIENCES.",
    location: "CHENNAI, INDIA",
    phone: "+91 9884957854",
    year: "2026",
    status: "AVAILABLE FOR INTERNSHIPS",
    statusHero: "OPEN TO INTERNSHIPS & COLLABORATIONS",
    bio: "Motivated B.Sc. Computer Science with Artificial Intelligence student with a strong foundation in Python, Machine Learning, data analysis, and predictive modeling.",
    aboutStatement: "BUILDING WITH CODE. THINKING WITH AI.",
    aboutDescription: "Motivated B.Sc. Computer Science with Artificial Intelligence student with a strong foundation in Python, Machine Learning, data analysis, and problem-solving. Seeking an opportunity to apply technical knowledge, contribute to AI-driven projects, and develop practical industry experience while continuously improving technical and professional skills.",
    careerObjective: "Motivated B.Sc. Computer Science with Artificial Intelligence student with a strong foundation in Python, Machine Learning, data analysis, and problem-solving. Seeking an opportunity to apply technical knowledge, contribute to AI-driven projects, and develop practical industry experience while continuously improving technical and professional skills.",
    email: "sakthipandi.official@gmail.com",
    github: "https://github.com/SAKTHIPANDI-M?tab=repositories",
    linkedin: "https://www.linkedin.com/in/sakthi-pandi-1411h",
  },

  stats: [
    { value: "8.3", label: "CGPA", detail: "S.I.V.E.T. College (3rd Year)" },
    { value: "2027", label: "GRADUATION", detail: "B.Sc CS with Artificial Intelligence" },
    { value: "AI", label: "SPECIALIZATION", detail: "Machine Learning & Data Analytics" },
    { value: "PYTHON", label: "PRIMARY LANGUAGE", detail: "Core algorithmic & data stack" }
  ],

  experience: [
    {
      number: "01",
      role: "AI Developer Intern",
      company: "Approtech R&D Solutions Pvt. Ltd.",
      period: "May 2026 – June 2026",
      location: "Chennai, India",
      badge: "AI INTERNSHIP",
      description: "Contributed to artificial intelligence and machine learning initiatives, focusing on data pipelines, predictive modeling, and algorithm validation.",
      highlights: [
        "Developed machine learning pipelines for predictive analytics across structured health and business datasets.",
        "Built automated Python scripts for data cleaning, feature normalization, and exploratory data analysis.",
        "Evaluated classification algorithms using Scikit-learn and tuned hyper-parameters to enhance model accuracy."
      ]
    }
  ] as ExperienceItem[],

  education: [
    {
      number: "01",
      degree: "Bachelor of Science – Computer Science with Artificial Intelligence (B.Sc CS AI)",
      institution: "S.I.V.E.T College, Chennai",
      period: "2024 — 2027",
      score: "CGPA: 8.3",
      statusBadge: "3RD YEAR // PURSUING",
      highlights: [
        "Currently studying in 3rd Year with consistent academic performance (CGPA: 8.3).",
        "Developing strong foundations in programming, AI, and data science through coursework and hands-on academic projects.",
        "Active participant in technical symposiums, hackathons (GENCODARE'26), and collaborative coding circles."
      ]
    },
    {
      number: "02",
      degree: "Higher Secondary Certificate (HSC) – Computer Science Stream",
      institution: "Madras Seva Sadan Higher Secondary School, Chennai",
      period: "2022 — 2024",
      score: "Score: 60.33%",
      statusBadge: "COMPLETED",
      highlights: [
        "Secured 60.33% across Computer Science, Mathematics, and Physics coursework.",
        "Established a solid academic base and foundational computing logic for higher studies."
      ]
    }
  ] as EducationItem[],

  personalSkills: [
    { name: "Leadership", desc: "Taking initiative on technical projects and guiding collaborative efforts." },
    { name: "Team Collaboration", desc: "Effective communication and active cooperation in multidisciplinary teams." },
    { name: "Communication Skills", desc: "Articulating complex technical concepts clearly to diverse audiences." },
    { name: "Problem Solving", desc: "Analytical mindset breaking down complex data challenges into actionable steps." }
  ],

  languages: [
    { language: "Tamil", proficiency: "Native / First Language" },
    { language: "English", proficiency: "Professional Working Proficiency" }
  ],

  skills: [
    {
      category: "PROGRAMMING",
      items: [
        { name: "Python", desc: "Core language for ML algorithms, data pipelines, automation, and backend APIs." },
        { name: "Java", desc: "Object-oriented programming, standard algorithmic problem solving, and software fundamentals." },
        { name: "Prolog", desc: "Logic programming, declarative knowledge bases, rule-based inference engines, and artificial intelligence reasoning." },
        { name: "JavaScript", desc: "Modern ES6+, client-side interactivity, asynchronous async/await workflows, and dynamic web applications." },
        { name: "HTML", desc: "Semantic structural markup with accessible design patterns." },
        { name: "CSS", desc: "Modern styling, flexbox/grid architectures, responsive design, and CSS variables." }
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
      category: "DATA & VISUALIZATION",
      items: [
        { name: "Power BI", desc: "Interactive business intelligence dashboards, DAX modeling, automated KPI reporting, and data analytics." },
        { name: "Matplotlib", desc: "Publication-quality scientific plots, statistical distributions, and analytical figures." },
        { name: "Data Analysis", desc: "Quantitative data discovery, metric extraction, hypothesis testing, and pattern recognition." }
      ]
    },
    {
      category: "TOOLS & PLATFORMS",
      items: [
        { name: "GitHub", desc: "Open-source code hosting, portfolio repositories, and collaborative development." },
        { name: "Vercel", desc: "Serverless edge deployments, continuous integration/deployment (CI/CD), and modern web hosting." },
        { name: "Supabase", desc: "Open-source backend-as-a-service, cloud PostgreSQL database, authentication, and real-time APIs." },
        { name: "IBM watsonx", desc: "Enterprise AI and machine learning lifecycle management platform." },
        { name: "Jupyter Notebook", desc: "Interactive computing, rapid exploratory data analysis, and step-by-step ML prototyping." },
        { name: "PowerPoint", desc: "Presentation engineering for executive project reviews and system architecture briefings." }
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
        description: "Frontier model used for rapid multimodal workflows and API integrations.",
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
      title: "HEART DISEASE PREDICTION",
      category: "AI & MACHINE LEARNING",
      shortDesc: "Developed a predictive model to identify the risk of heart disease using patient health data and classification algorithms.",
      tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
      githubUrl: "https://github.com/SAKTHIPANDI-M?tab=repositories",
      demoUrl: "#interactive-demo",
      highlights: [
        "Trained on validated clinical datasets with supervised classification models",
        "Interactive risk calculator with immediate risk stratification (Low, Moderate, High)",
        "Feature importance scoring highlighting blood pressure, cholesterol, and resting ECG indicators"
      ],
      caseStudy: {
        overview: "Heart disease remains one of the world's leading causes of mortality. This project develops an end-to-end predictive diagnostic model that ingests key clinical health markers to compute cardiovascular risk probability.",
        problem: "Clinical diagnostics face bottlenecks in early triage. Patients need quick, accurate screening metrics to identify whether cardiovascular symptoms warrant immediate medical referral.",
        solution: "Engineered a machine learning pipeline using Scikit-learn that evaluates patient parameters (age, resting blood pressure, serum cholesterol, fasting blood sugar, max heart rate, and exercise-induced angina).",
        technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter Notebook"],
        howItWorks: [
          "Data pre-processing: missing value handling, outlier clipping, and standard scaling of numerical indicators.",
          "Model training & validation: evaluated Logistic Regression and Random Forest Classifiers with cross-validation.",
          "Inference engine: receives patient parameters, scales features, runs inference, and returns confidence probability score.",
          "Visual risk stratification: categorizes risk index into actionable guidance thresholds."
        ],
        myContribution: [
          "Curated and preprocessed patient datasets ensuring clean distribution.",
          "Implemented cross-validation pipelines and tuned hyper-parameters to minimize false negatives.",
          "Constructed model evaluation reports and visual metric plots using Matplotlib."
        ],
        results: "Delivers reliable real-time risk predictions with over 86% validation accuracy on clinical test subsets.",
        metrics: [
          { label: "Validation Accuracy", value: "86.4%" },
          { label: "ROC-AUC Score", value: "0.91" },
          { label: "Key Predictors", value: "11 Clinical Factors" }
        ]
      }
    },
    {
      id: "fifa-2026-predictor",
      number: "02",
      title: "FIFA WORLD CUP WINNER PREDICTION",
      category: "AI & DATA ANALYTICS",
      shortDesc: "Built a machine learning model to predict FIFA World Cup winners using historical match statistics and team performance data.",
      tags: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
      githubUrl: "https://github.com/SAKTHIPANDI-M?tab=repositories",
      demoUrl: "#interactive-demo",
      highlights: [
        "Historical World Cup match telemetry, team Elo rankings, and player aggregated metrics",
        "Predictive simulation engine calculating win, draw, and tournament progression probabilities",
        "Interactive interface with custom head-to-head tactical comparisons"
      ],
      caseStudy: {
        overview: "The FIFA World Cup introduces high stochastic variance and team momentum factors. This project applies statistical modeling and machine learning algorithms to simulate tournament outcomes and win probabilities.",
        problem: "Predicting international football match outcomes involves complex multi-factor performance data that simple averages fail to encapsulate.",
        solution: "Built a predictive analytical pipeline leveraging historical match data from past tournaments, FIFA international rankings, goal differentials, and recent form metrics.",
        technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Jupyter Notebook"],
        howItWorks: [
          "Dataset ingestion: 30+ years of international match results, goal differentials, and tournament stages.",
          "Feature engineering: calculated rolling form indices, offensive potency, defensive solidity, and Elo differentials.",
          "Predictive model: evaluated classification algorithms to output expected match outcome probabilities.",
          "Simulation matrix: simulated match progression across competing nations."
        ],
        myContribution: [
          "Aggregated and cleaned large-scale international football datasets across multiple tournaments.",
          "Designed dynamic feature extraction scripts calculating home advantage and weighted recent performance.",
          "Visualized tournament bracket probabilities and team strength matrices."
        ],
        results: "Successfully modeled goal distributions and simulated 1,000+ Monte Carlo tournament paths.",
        metrics: [
          { label: "Historical Matches", value: "4,500+" },
          { label: "Simulation Runs", value: "1,000 MC" },
          { label: "Analytics Core", value: "Python + Pandas" }
        ]
      }
    },
    {
      id: "loan-approval-prediction",
      number: "03",
      title: "LOAN APPROVAL PREDICTION",
      category: "AI & MACHINE LEARNING",
      shortDesc: "Developed a prediction system to determine loan approval status based on applicant financial and demographic information using machine learning techniques.",
      tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter Notebook"],
      githubUrl: "https://github.com/SAKTHIPANDI-M?tab=repositories",
      demoUrl: "#interactive-demo",
      highlights: [
        "Evaluates applicant income, co-applicant income, credit history, loan amount, and term",
        "Automated feature engineering calculating debt-to-income and loan-to-income ratios",
        "Trained classification model delivering 88%+ validation accuracy with low false-positive risk"
      ],
      caseStudy: {
        overview: "Credit underwriting requires rigorous, unbiased evaluation of financial solvency. This machine learning application automates loan qualification assessment by evaluating applicant demographic, credit history, and asset profiles to predict approval status accurately.",
        problem: "Manual loan underwriting is time-consuming and vulnerable to inconsistent subjective scoring, causing delayed approvals for qualified applicants.",
        solution: "Engineered an intelligent classification pipeline using Scikit-learn that assesses applicant credit history, employment stability, property area, and income tiers to compute approval probability instantly.",
        technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter Notebook"],
        howItWorks: [
          "Data preprocessing: imputation of missing values, encoding categorical variables (education, self-employment, credit history).",
          "Feature engineering: derived Total Income and Loan Amount Term ratios for enhanced predictive power.",
          "Model training: trained and tuned Decision Tree, Logistic Regression, and Random Forest Classifiers with cross-validation.",
          "Decision boundary: outputs approval status with confidence scoring and key risk indicators."
        ],
        myContribution: [
          "Preprocessed financial datasets handling missing credit history entries and skewed distributions.",
          "Engineered domain-specific financial ratios that increased model ROC-AUC by 7.4%.",
          "Generated confusion matrices, ROC curves, and feature importance bar charts using Matplotlib."
        ],
        results: "Achieved 88.5% classification accuracy on test folds with credit history identified as the primary predictor.",
        metrics: [
          { label: "Model Accuracy", value: "88.5%" },
          { label: "ROC-AUC Score", value: "0.92" },
          { label: "Key Predictor", value: "Credit History" }
        ]
      }
    }
  ],

  process: [
    {
      step: "01",
      title: "DISCOVER",
      summary: "Understand the problem and requirements.",
      details: "Deep dive into the underlying problem domain. Identify key user needs, data availability, computational constraints, and success metrics before writing code."
    },
    {
      step: "02",
      title: "PLAN",
      summary: "Design the solution, architecture and workflow.",
      details: "Formulate the architecture: choose algorithms, data schemas, API contracts, model evaluation strategies, and feature pipelines."
    },
    {
      step: "03",
      title: "BUILD",
      summary: "Develop the application and AI/ML components.",
      details: "Write clean, modular code. Implement data preprocessing pipelines, train and tune machine learning models, and build accessible interfaces."
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
      id: "ibm-ai-fundamentals",
      number: "01",
      title: "AI Fundamentals: Foundations for Understanding AI",
      issuer: "IBM SkillsBuild",
      category: "Artificial Intelligence",
      description: "Comprehensive foundational credential in artificial intelligence principles, machine learning concepts, deep neural paradigms, ethics, and practical AI applications.",
      date: "June 22, 2026",
      image: "/assets/aistudio/Screenshot_2026-10-14_004107_01abb1a3.png",
      originalFileName: "Screenshot_2026-10-14_004107_01abb1a3.png",
      recipient: "SAKTHIPANDI M"
    },
    {
      id: "ibm-generative-ai-watsonx",
      number: "02",
      title: "Generative AI Using IBM Watsonx",
      subtitle: "CEWXAI1IN — Provided by IBMCE",
      issuer: "IBM Career Education Program",
      poweredBy: "IBM Developer Skills Network",
      category: "Generative AI & LLMs",
      courseCode: "CEWXAI1IN",
      description: "Enterprise generative AI engineering, prompt design, foundation model tuning, and generative application deployment using the IBM watsonx AI and data platform.",
      date: "April 14, 2026",
      image: "/assets/aistudio/Screenshot_2026-10-14_004216_9af0f989.png",
      originalFileName: "Screenshot_2026-10-14_004216_9af0f989.png",
      recipient: "SAKTHIPANDI M"
    },
    {
      id: "officemaster-power-bi",
      number: "03",
      title: "Power BI Workshop",
      subtitle: "AI-Powered Interactive Dashboards",
      issuer: "OfficeMaster",
      category: "Data Analytics & BI",
      description: "Creation of AI-powered interactive business intelligence dashboards, DAX querying, and rapid data visualization workflows in Power BI in under 30 minutes.",
      date: "June 1st, 2026",
      image: "/assets/aistudio/Screenshot_2026-10-14_004301_37a0ce32.png",
      originalFileName: "Screenshot_2026-10-14_004301_37a0ce32.png",
      recipient: "SAKTHIPANDI M"
    },
    {
      id: "ibm-web-development-fundamentals",
      number: "04",
      title: "Web Development Fundamentals",
      issuer: "IBM SkillsBuild",
      category: "Web Technologies",
      description: "In recognition of the commitment to achieve professional excellence in web development fundamentals, responsive architecture, semantic layout, and modern web standards.",
      date: "August 07, 2025",
      image: "/assets/aistudio/Screenshot_2026-10-14_004325_a99de850.png",
      originalFileName: "Screenshot_2026-10-14_004325_a99de850.png",
      recipient: "SAKTHIPANDI M"
    },
    {
      id: "oracle-cloud-ai-foundations",
      number: "05",
      title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      subtitle: "Oracle Certified Foundations Associate",
      issuer: "Oracle University",
      category: "Cloud AI Infrastructure",
      courseCode: "103406225OCI25AICFA",
      description: "Official certification recognizing expertise in Oracle Cloud Infrastructure (OCI) AI portfolio, machine learning services, generative AI models, and enterprise cloud architecture.",
      date: "February 19, 2026",
      image: "/assets/aistudio/Screenshot_2026-10-14_004410_cf7cf03f.png",
      originalFileName: "Screenshot_2026-10-14_004410_cf7cf03f.png",
      recipient: "SAKTHIPANDI M"
    },
    {
      id: "gencodare-26-hackathon",
      number: "06",
      title: "GENCODARE’26 — Hackathon Certificate",
      subtitle: "24-Hour State-Level Hackathon",
      issuer: "Agni College of Technology",
      department: "Department of Information Technology",
      institution: "S.I.V.E.T. College",
      category: "State-Level Hackathon",
      description: "Awarded to Sakthipandi M (S.I.V.E.T. College) in recognition of active participation, teamwork, creativity, and rapid software prototyping in the 24-Hour State-Level Hackathon.",
      date: "September 25–26, 2026",
      image: "/assets/aistudio/Gencodare_26_Certificate_of_Participation_95b04cc2.png",
      originalFileName: "Gencodare_26_Certificate_of_Participation_95b04cc2.png",
      recipient: "SAKTHIPANDI M",
      isHackathon: true
    }
  ]
};
