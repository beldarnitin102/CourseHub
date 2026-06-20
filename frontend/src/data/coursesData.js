const coursesData = [
  {
    id: 1,
    category: "Web Development",
    title: "Complete MERN Stack Development",
    instructor: "Nitin Beldar",
    price: "₹999",
    students: "2450",
    description: "Master MongoDB, Express, React, and Node.js by building real-world projects from scratch.",
    learn: [
      "Build Full Stack Applications",
      "Authentication & Authorization",
      "REST APIs Development",
      "Deployment & Cloud Hosting"
    ],
    curriculum: [
      {
        section: "Introduction",
        lectures: ["Course Overview", "Development Setup"]
      },
      {
        section: "Frontend",
        lectures: ["React Fundamentals", "Components & Props", "Routing with React Router"]
      },
      {
        section: "Backend",
        lectures: ["Express Server Setup", "MongoDB & Mongoose Schema", "JWT Authentication"]
      }
    ]
  },
  {
    id: 2,
    category: "Web Development",
    title: "React JS Masterclass",
    instructor: "John Smith",
    price: "₹899",
    students: "1900",
    description: "Dive deep into React JS. Master hooks, state management, and modern component architecture.",
    learn: [
      "Advanced React Hooks (useEffect, useMemo, useCallback)",
      "Global State Management with Redux Toolkit",
      "Performance Optimization Techniques",
      "Custom Hook Architecture"
    ],
    curriculum: [
      {
        section: "Getting Started",
        lectures: ["Why React?", "JSX Deep Dive", "Setting up Vite & Tailwind"]
      },
      {
        section: "State & Effects",
        lectures: ["useState Under the Hood", "Handling Side Effects", "Data Fetching & Error States"]
      },
      {
        section: "Advanced Concepts",
        lectures: ["Context API vs Redux Toolkit", "Code Splitting & Lazy Loading", "Testing React Components"]
      }
    ]
  },
  {
    id: 3,
    category: "Web Development",
    title: "Node.js Backend API",
    instructor: "Sarah Wilson",
    price: "₹799",
    students: "1500",
    description: "Build scalable, production-ready RESTful APIs using Node.js, Express, and SQL/NoSQL databases.",
    learn: [
      "Asynchronous JavaScript Architecture",
      "Database Modeling and Relations",
      "Error Handling Middleware",
      "API Security Best Practices (Cors, Helmet, Rate Limiting)"
    ],
    curriculum: [
      {
        section: "Node.js Core",
        lectures: ["Event Loop Explained", "File System Module", "Working with Streams and Buffers"]
      },
      {
        section: "Express.js API",
        lectures: ["MVC Architecture Pattern", "Custom Middlewares", "Validation with Joi/Zod"]
      },
      {
        section: "Data & Deployment",
        lectures: ["Connecting to Databases", "Environment Configurations", "Deploying APIs to Render/AWS"]
      }
    ]
  },
  {
    id: 4,
    category: "Web Development",
    title: "Advanced JavaScript",
    instructor: "David Lee",
    price: "₹699",
    students: "2100",
    description: "Master the hidden mechanisms of JavaScript, from closures and prototypes to asynchronous workflows.",
    learn: [
      "Understand the Execution Context & Event Loop",
      "Master Prototypal Inheritance & OOP in JS",
      "Write Clean, Functional JavaScript Code",
      "Advanced Async Programming (Promises, Async/Await)"
    ],
    curriculum: [
      {
        section: "JS Foundations under the Hood",
        lectures: ["Execution Context & Hoisting", "Scope Chain & Closures", "The 'this' Keyword Explained"]
      },
      {
        section: "Object-Oriented JS",
        lectures: ["Prototypes & Inheritances", "ES6 Classes & Subclasses", "Factory Functions vs Constructors"]
      },
      {
        section: "Asynchronous Workflows",
        lectures: ["Callbacks & Promises", "Async/Await Patterns", "Microtasks vs Macrotasks"]
      }
    ]
  },
  {
    id: 5,
    category: "AI & Machine Learning",
    title: "Machine Learning Bootcamp",
    instructor: "Andrew Miller",
    price: "₹1499",
    students: "3200",
    description: "Go from zero to building predictive models using Python, Scikit-Learn, and real datasets.",
    learn: [
      "Supervised & Unsupervised Learning Algorithms",
      "Data Preprocessing & Feature Engineering",
      "Model Evaluation & Hyperparameter Tuning",
      "Deploying ML Models as APIs"
    ],
    curriculum: [
      {
        section: "Math & Libraries Setup",
        lectures: ["Linear Algebra Basics", "NumPy & Pandas Essentials", "Data Visualization with Matplotlib"]
      },
      {
        section: "Regression & Classification",
        lectures: ["Linear & Logistic Regression", "Decision Trees & Random Forests", "Support Vector Machines"]
      },
      {
        section: "Unsupervised Learning",
        lectures: ["K-Means Clustering", "Dimensionality Reduction with PCA", "Evaluating Model Accuracy"]
      }
    ]
  },
  {
    id: 6,
    category: "AI & Machine Learning",
    title: "Deep Learning with Python",
    instructor: "Sophia Brown",
    price: "₹1799",
    students: "2400",
    description: "Build, train, and optimize Artificial Neural Networks using TensorFlow, Keras, and PyTorch.",
    learn: [
      "Neural Network Structures and Backpropagation",
      "Computer Vision using Convolutional Neural Networks (CNNs)",
      "Natural Language Processing using RNNs and LSTMs",
      "Transfer Learning with Pre-trained Models"
    ],
    curriculum: [
      {
        section: "Introduction to Neural Networks",
        lectures: ["Perceptrons to Multi-Layer Perceptrons", "Activation Functions", "Loss Functions & Optimizers"]
      },
      {
        section: "Computer Vision",
        lectures: ["Understanding Convolution Layers", "Building a CNN for Image Classification", "Data Augmentation"]
      },
      {
        section: "Sequential Data Models",
        lectures: ["Recurrent Neural Networks (RNN)", "LSTM Architecture", "Text Tokenization and Embedding"]
      }
    ]
  },
  {
    id: 7,
    category: "AI & Machine Learning",
    title: "Generative AI",
    instructor: "Michael Scott",
    price: "₹1299",
    students: "1800",
    description: "Learn to build applications utilizing Large Language Models (LLMs), Prompt Engineering, and Vector Databases.",
    learn: [
      "Prompt Engineering Techniques",
      "Building Apps with LangChain and LlamaIndex",
      "Working with Vector DBs like Pinecone or ChromaDB",
      "Fine-tuning LLMs for Specific Tasks"
    ],
    curriculum: [
      {
        section: "GenAI Foundations",
        lectures: ["Introduction to Transformers", "How LLMs Work", "OpenAI API Integration"]
      },
      {
        section: "RAG & Vector Search",
        lectures: ["What is Retrieval-Augmented Generation?", "Creating Text Embeddings", "Vector Store Implementations"]
      },
      {
        section: "AI Agents",
        lectures: ["Building Autonomous Agents", "LangChain Chains & Memory", "Deploying GenAI Web Apps"]
      }
    ]
  },
  {
    id: 8,
    category: "Data Science",
    title: "Data Science Complete Guide",
    instructor: "Emily Clark",
    price: "₹999",
    students: "2900",
    description: "The complete pipeline: from raw data ingestion and statistical analysis to business storytelling.",
    learn: [
      "Statistical Analysis & Hypothesis Testing",
      "Advanced SQL for Data Analytics",
      "Data Cleaning and Manipulation Workflows",
      "Interactive Dashboard Creation"
    ],
    curriculum: [
      {
        section: "Data Science Pipeline",
        lectures: ["Understanding Data Types", "Exploratory Data Analysis (EDA)", "Dealing with Missing Values"]
      },
      {
        section: "Statistical Methods",
        lectures: ["Probability Distributions", "Hypothesis Testing & P-Values", "A/B Testing Frameworks"]
      },
      {
        section: "Data Storytelling",
        lectures: ["Business Intelligence Principles", "Creating Dashboards", "Presenting Insights"]
      }
    ]
  },
  {
    id: 9,
    category: "Data Science",
    title: "Python for Data Analysis",
    instructor: "Robert Green",
    price: "₹899",
    students: "2200",
    description: "Master Pandas, NumPy, and Seaborn to manipulate large datasets and extract valuable insights.",
    learn: [
      "Advanced Data Transformations with Pandas",
      "Handling Time Series Datasets",
      "Building Custom Interactive Visualizations",
      "Parsing and Scraping Web Data"
    ],
    curriculum: [
      {
        section: "Environment Setup",
        lectures: ["Jupyter Notebook Configuration", "Advanced NumPy Arrays", "Pandas DataFrames Essentials"]
      },
      {
        section: "Data Wrangling",
        lectures: ["Merging and Joining DataFrames", "Groupby operations", "Filtering Complex Data Profiles"]
      },
      {
        section: "Time Series & Exporting",
        lectures: ["Working with Datetime Objects", "Resampling Datasets", "Exporting Clean Reports"]
      }
    ]
  },
  {
    id: 10,
    category: "Cyber Security",
    title: "Ethical Hacking Masterclass",
    instructor: "Alex White",
    price: "₹1299",
    students: "1700",
    description: "Learn network security, penetration testing, and security fundamentals like a professional white-hat hacker.",
    learn: [
      "Network Scanning and Vulnerability Assessment",
      "Web Application Hacking (SQLi, XSS)",
      "Wireless Network Security Penetration",
      "System Hardening and Security Protocols"
    ],
    curriculum: [
      {
        section: "Lab Configuration",
        lectures: ["Setting Up Kali Linux", "Virtual Network Architecture", "Anonymity Protocols"]
      },
      {
        section: "Information Gathering",
        lectures: ["Footprinting and Reconnaissance", "Nmap Network Scanning", "Vulnerability Exploitation"]
      },
      {
        section: "Web App Pen-testing",
        lectures: ["OWASP Top 10 Exploits", "SQL Injection Lab", "Cross-Site Scripting Mitigation"]
      }
    ]
  },
  {
    id: 11,
    category: "Cloud Computing",
    title: "AWS Cloud Practitioner",
    instructor: "James Walker",
    price: "₹999",
    students: "2100",
    description: "Master the cloud computing paradigm and prepare perfectly for the official AWS Cloud Practitioner Certification.",
    learn: [
      "Core AWS Services (EC2, S3, RDS, Lambda)",
      "Cloud Security and IAM Policies",
      "AWS Architecture Best Practices",
      "Pricing and Cost Management Structures"
    ],
    curriculum: [
      {
        section: "Cloud Concepts",
        lectures: ["Introduction to Cloud Infrastructure", "AWS Global Infrastructure Overview", "Shared Responsibility Model"]
      },
      {
        section: "Core AWS Infrastructure",
        lectures: ["Compute Options (EC2 vs LightSail)", "Storage Frameworks (S3 vs EBS)", "Database Offerings"]
      },
      {
        section: "Billing & Security",
        lectures: ["AWS IAM Roles", "AWS Pricing Calculator Essentials", "Certification Prep Quick Guide"]
      }
    ]
  },
  {
    id: 12,
    category: "Mobile Development",
    title: "Flutter App Development",
    instructor: "Emma Watson",
    price: "₹1099",
    students: "1800",
    description: "Build beautiful, natively compiled cross-platform applications for iOS and Android using Dart.",
    learn: [
      "Dart Programming Language Ecosystem",
      "Advanced State Management (Provider, Bloc)",
      "Native Device Hardware Integration (Camera, GPS)",
      "Publishing Apps to App Store & Google Play"
    ],
    curriculum: [
      {
        section: "Introduction to Dart",
        lectures: ["Variables & Functions in Dart", "Object-Oriented Dart", "Asynchronous Programming"]
      },
      {
        section: "Flutter UI Basics",
        lectures: ["Stateless vs Stateful Widgets", "Layout Widgets (Row, Column, Stack)", "Handling Forms & Inputs"]
      },
      {
        section: "State & API Integration",
        lectures: ["Provider State Architecture", "Consuming REST APIs in Flutter", "Local Database Integration"]
      }
    ]
  }
];

export default coursesData;