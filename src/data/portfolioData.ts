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

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details: string[];
}

export const portfolioData = {
  personalInfo: {
    name: "Guruprasad G",
    title: "Junior Software Engineer",
    company: "Indegene",
    email: "guruprasas27@gmail.com",
    github: "https://github.com/guruprasad403",
    linkedin: "https://www.linkedin.com/in/guruprasad-g-react/",
    resumeUrl: "#",
    location: "Bangalore, India",
    bio: "Passionate Junior Software Engineer with a track record of building performant, scalable, and beautifully animated user interfaces. Specialized in modern frontend technologies, reusable UI architectures, and content management systems. Proven team contributor, quick learner, and dedicated Agile practitioner.",
    yearsOfExperience: 1,
    leadership: "Backup POD Lead at Indegene",
  },
  
  skills: [
    {
      category: "Frontend Development",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 75 },
        { name: "React", level: 75 },
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "Tailwind CSS", level: 90 },
      ]
    },
    {
      category: "Backend & Services",
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Express", level: 80 },
        { name: "REST APIs", level: 85 },
        { name: "JWT", level: 80 },
        { name: "Socket.IO", level: 70 },
      ]
    },
    {
      category: "Databases & Tools",
      skills: [
        { name: "MongoDB", level: 75 },
        { name: "Git", level: 85 },
        { name: "GitHub", level: 85 },
        { name: "AEM (Adobe Experience Manager)", level: 80 },
        { name: "Agile / Scrum", level: 80 },
        { name: "Framer Motion", level: 85 },
      ]
    }
  ] as SkillGroup[],

  experience: [
    {
      id: "exp1",
      company: "Indegene",
      role: "Junior Software Engineer",
      period: "Jul 2024 - Present",
      achievements: [
        "Developed, optimized, and maintained highly reusable  components and frontend templates, reducing visual regressions across key projects.",
        "Engineered customized workflows and components within Adobe Experience Manager (AEM), enabling marketing teams to deliver content 30% faster.",
        "Guaranteed pixel-perfect, cross-browser compatibility and responsive design, resolving high-priority rendering and performance bottlenecks.",
        "Proactively identified, debugged, and resolved critical production issues, improving application stability and user satisfaction metrics.",
        "Actively participated in  sprint planning and daily stand-ups to align engineering tasks with dynamic product requirements.",
        "Contributed to rigorous peer code reviews, ensuring high standards of code readability, safety, and adherence to company patterns.",
      ]
    },
    {
      id: "exp2",
      company: "Digitide Solutions",
      role: "Customer Care Executive",
      period: "Oct 2022 - Jun 2024",
      achievements: [
        "Delivered premium customer support and engagement, building strong, trusted relationships with critical enterprise and SME clients.",
        "Spearheaded SME promotion activities, elevating regional business exposure and driving strategic outreach initiatives."
      ]
    }
  ] as Experience[],

  projects: [
    {
      id: "second-brain",
      title: "Second Brain Space",
      description: "A premium, personal knowledge management dashboard that lets users link thoughts, store files, organize tasks, and query their mind using an interactive canvas mapping.",
      longDescription: "Second Brain Space is a comprehensive, client-side offline-first productivity workspace. It features bidirectional document linking, a dynamic node-graph visualization of notes, task progress bars, and localized storage. Built specifically with ultra-smooth layouts and high-performance list processing, it enables seamless indexing of personal projects, code snippets, and design cards.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "lucide-react"],
      features: [
        "Interactive node graph visualizer of interconnected markdown notes",
        "Rich text editor with syntax highlighting and bidirectional linking",
        "Command Palette interface (Cmd+K) for lightning-fast search and operations",
        "Draggable task board with kanban lists and focus-mode Pomodoro timer"
      ],
      githubUrl: "https://github.com/GuruPrasad403/brainly",
      liveUrl: "https://brainly-puce.vercel.app/"
    },
    {
      id: "expense-tracker",
      title: "WealthFlow Expense Tracker",
      description: "An elegant, high-performance financial analytics and budgeting app with real-time charts, custom category tracking, and predictive budget forecasting.",
      longDescription: "WealthFlow reimagines personal finance with beautiful micro-interactions, responsive charts, and strict privacy. It parses financial metrics locally, generates interactive SVG reports, and tracks monthly budgets in highly customized category clusters. The interface utilizes pristine negative space and premium glass card frames to prevent structural clutter.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      techStack: ["React", "Tailwind CSS", "Framer Motion", "Recharts"],
      features: [
        "Interactive analytics charts tracking monthly income, savings, and investments",
        "Dynamic recurring transaction scheduler and multi-currency exchange rates",
        "One-click PDF/CSV statement generator and export options",
        "Budget-limit alerts and progressive notification card system"
      ],
      githubUrl: "https://github.com/GuruPrasad403/tracker-ui",
      liveUrl: "https://tracker-ui-woad.vercel.app/"
    },
    {
      id: "carebot",
      title: "CareBot Assistant",
      description: "An intelligent healthcare support agent providing prompt response matching, wellness suggestions, and symptom mapping using natural language processing.",
      longDescription: "CareBot is an elegant healthcare triage and support interface. It provides users with rapid symptom mapping, wellness checklists, and localized resource finders. Built with a robust conversational interface that emphasizes clear typography, screen-reader accessibility, and dark/light ambient adjustments.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "lucide-react"],
      features: [
        "Symptom tracking check-ins with clear, accessible UI workflows",
        "Secure local-first chat history storage and export tools",
        "Comprehensive health guides catalog and interactive dosage planner",
        "Low-latency response system with custom loading indicators and speech-to-text"
      ],
      githubUrl: "https://github.com/GuruPrasad403/chat-bot",
      liveUrl: "#"
    }
  ] as Project[],

  certifications: [
    
    {
      id: "cert1",
      title: "Full Stack Developer",
      issuer: "100x Devs",
      date: "2024"
    },
    
  ] as Certification[],

  education: {
    institution: "Vijayanagara Sri Krishnadevaraya University",
    degree: "Bachelor of Computer Applications",
    period: "2022 - 2025",
    details: [
      "Graduated with First Class Distinction.",
      "Core coursework in Data Structures, Web Technology, Software Engineering, and Database Management Systems.",
      "Completed a Capstone Project on web-based diagnostic assistant using cloud resources."
    ]
  } as Education
};
