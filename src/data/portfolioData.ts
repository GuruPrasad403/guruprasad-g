export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verificationUrl?: string;
}

export interface Hackathon {
  id: string;
  title: string;
  location: string;
  result: string;
  prize?: string;
  description: string;
  image?: string;
  videoUrl?: string;
  githubUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  concurrentWork: string;
  campusActivities: string;
  hackathons: Hackathon[];
}

export const portfolioData = {
  personalInfo: {
    name: "Guruprasad G",
    title: "Software Engineer & AI Champion",
    company: "Indegene Limited",
    email: "guruprasas27@gmail.com",
    phone: "+91 8951657957",
    github: "https://github.com/GuruPrasad403",
    linkedin: "https://www.linkedin.com/in/guruprasad-g-react/", // profile domain
    resumeUrl: "/reume/Guruprasad_G.pdf",
    location: "Ballari, Karnataka",
    bio: "Software Engineer with professional experience at Indegene in enterprise web development, Adobe Experience Manager (AEM), and full-stack React/Node.js ecosystems. Converted from Apprentice to full-time Software Engineer based on performance. Appointed as AI Champion at Indegene, actively coordinating with cross-functional teams to discover workflows, recommend practical AI development tools (GitHub Copilot, ROVO), and mentor 30+ employees monthly to seamlessly integrate AI into their day-to-day engineering and business workflows.",
    yearsOfExperience: 1,
    leadership: "AI Champion & SME Lead",
  },
  
  skills: [
    {
      category: "Frontend Development",
      skills: [
        { name: "React.js", level: 92 },
        { name: "JavaScript (ES6+)", level: 95 },
        { name: "TypeScript", level: 85 },
        { name: "HTML5 & CSS3", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Responsive Web Design", level: 95 },
      ]
    },
    {
      category: "Backend & Databases",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "REST APIs", level: 90 },
        { name: "MongoDB", level: 80 },
        { name: "JWT Authentication", level: 85 },
      ]
    },
    {
      category: "Enterprise & AI Tools",
      skills: [
        { name: "Adobe Experience Manager (AEM)", level: 88 },
        { name: "GitHub Copilot & ROVO", level: 95 },
        { name: "Generative AI & NLP", level: 85 },
        { name: "Git & GitHub", level: 90 },
        { name: "UI Debugging & Code Quality", level: 90 },
      ]
    }
  ] as SkillGroup[],

  experience: [
    {
      id: "exp1",
      company: "Indegene Limited",
      role: "Web Developer & AI Champion",
      period: "Sep 2025 – Present",
      achievements: [
        "Converted from Web Developer Apprentice/Trainee to full-time Software Engineer at Indegene based on exceptional performance.",
        "Develop and maintain responsive web pages, splash pages, HCP portals, and reusable components using HTML5, CSS3, JavaScript, and React.",
        "Build and update enterprise web experiences on Adobe Experience Manager (AEM), following CMS workflows and strict implementation standards.",
        "Appointed as AI Champion alongside regular project responsibilities, engaging with groups of 30+ employees each month to understand workflows and identify AI use cases.",
        "Recommend relevant AI tools (GitHub Copilot, ROVO) and workflow improvements to help employees perform tasks more efficiently.",
        "Troubleshoot front-end rendering issues, review implementation details, and coordinate cross-departmental enablement."
      ]
    },
    {
      id: "exp2",
      company: "Digitide Solutions Limited",
      role: "Customer Care Executive → Subject Matter Expert (SME)",
      period: "Jun 2024 – Sep 2025",
      achievements: [
        "Resolved 50+ customer queries per day while maintaining a 95% customer satisfaction rating.",
        "Promoted to Subject Matter Expert (SME) within three months based on outstanding performance and deep product knowledge.",
        "Mentored four training batches involving 50+ trainees and supported a 100% first-attempt certification pass rate."
      ]
    },
    {
      id: "exp3",
      company: "Aptpath",
      role: "AI-Powered Health Assistant Intern",
      period: "Nov 2024",
      achievements: [
        "Developed CareBot using Python and Generative AI for intelligent medical query processing and context-aware responses."
      ]
    }
  ] as Experience[],

  projects: [
    {
      id: "second-brain",
      title: "Second Brain – AI PWA",
      description: "A full-stack progressive web application for saving, organizing, and semantically searching documents using NLP techniques.",
      longDescription: "Second Brain is a full-stack progressive web app built for organizing personal knowledge and notes. Features tag-based categorization, REST APIs, authentication workflows, and semantic search powered by natural language processing.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "TypeScript", "NLP"],
      features: [
        "Semantic document search using NLP techniques",
        "Tag-based categorization and quick filtering",
        "Secure user authentication with RESTful APIs",
        "Offline-first PWA architecture"
      ],
      githubUrl: "https://github.com/GuruPrasad403/brainly",
      liveUrl: "https://brainly-puce.vercel.app/"
    },
    {
      id: "expense-tracker",
      title: "WealthFlow Expense Tracker",
      description: "A full-stack finance application with CRUD operations, budget calculations, and interactive data visualization.",
      longDescription: "WealthFlow is a responsive finance application featuring MongoDB persistence, JWT authentication, and mobile-first layouts using CSS3 and Flexbox. Helps users calculate budgets and track expenses visually.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "CSS3 Flexbox"],
      features: [
        "CRUD operations for income and expense logs",
        "JWT-authenticated user sessions",
        "Interactive budget calculation graphs",
        "Mobile-first responsive design"
      ],
      githubUrl: "https://github.com/GuruPrasad403/tracker-ui",
      liveUrl: "https://tracker-ui-woad.vercel.app/"
    },
    {
      id: "carebot",
      title: "CareBot – AI Medical Assistant",
      description: "An AI-powered chatbot for medical query processing, context-aware responses, and resource recommendations.",
      longDescription: "CareBot processes health queries using Natural Language Processing and Generative AI, delivering context-aware medical information and smart resource recommendations.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      techStack: ["Python", "NLP", "Generative AI"],
      features: [
        "Context-aware medical query processing",
        "Generative AI response generation",
        "NLP-based intent detection and classification",
        "Intelligent health resource recommendations"
      ],
      githubUrl: "https://github.com/GuruPrasad403/chat-bot",
      liveUrl: "#"
    }
  ] as Project[],

  certifications: [
    {
      id: "cert1",
      title: "Full Stack Developer Certification",
      issuer: "100xDevs",
      date: "2024"
    },
    {
      id: "cert2",
      title: "AI Champion Enablement",
      issuer: "Indegene Limited",
      date: "2025"
    }
  ] as Certification[],

  education: {
    institution: "Shree Medha Degree College (VSKU)",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2022 – 2025",
    concurrentWork: "During BCA, joined as a full-time Customer Care Executive (CCE) at Digitide Solutions, balancing full-time professional industry responsibilities alongside full-time degree coursework.",
    campusActivities: "Actively organized and participated in college events, coordinating seamlessly with classmates, faculty, and guest speakers.",
    hackathons: [
      {
        id: "hack1",
        title: "HACKB24 Inter-College Hackathon",
        location: "BITM College, Ballari",
        result: "2nd Runner Up (3rd Place)",
        prize: "₹10,000 Cash Prize",
        description: "Engineered a high-performance frontend architecture under strict hackathon deadlines, winning 2nd Runner Up against competitive teams.",
        image: "/images/hackathon_runnerup.jpg",
        githubUrl: "https://github.com/GuruPrasad403/SYC/tree/final/frontend"
      },
      {
        id: "hack2",
        title: "0 to 100 Online Global Hackathon",
        location: "Virtual / Remote",
        result: "Participant & Platform Builder",
        description: "Developed a full-fledged web platform prototype. Successfully showcased project architecture via video demonstration.",
        image: "/images/online_hackathon.jpg",
        videoUrl: "https://drive.google.com/file/d/1apOVKJo9psfQpZHeILxfTpNUOUb3WeZ4/view?usp=sharing"
      },
      {
        id: "hack3",
        title: "BGSCET National Level Hackathon",
        location: "BGS College of Engineering and Technology, Bengaluru",
        result: "National Level Participant & Vidyaloop Builder",
        description: "Engineered 'Vidyaloop' at BGSCET National Hackathon—an interactive educational platform enabling teachers to upload video lectures paired with automated transcripts.",
        image: "/images/vidyaloop_hack.jpg",
        githubUrl: "https://github.com/pittiprince/Vidyaloop_hack"
      }
    ]
  } as Education
};
