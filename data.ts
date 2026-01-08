
import { Profile, Project, Experience, Skill, Achievement } from './types';

export const profile: Profile = {
  name: "Aishwarya R",
  tagline: "Building the next generation of intelligent systems.",
  bio: "Architecting the bridge between complex data and human intuition. I build for speed, scale, and intelligence.",
  email: "aishwarya0111.r@gmail.com",
  phone: "+91 7305750385",
  location: "Chennai, India",
  socials: {
    github: "https://github.com/aish-r-01",
    linkedin: "https://www.linkedin.com/in/aishwarya-r-1b11a6220/",
    twitter: "https://twitter.com/aishwarya"
  }
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Vision Transformers for Bharatanatyam",
    description: "Full-stack video analytics system using DeiT-Tiny + Lion + LSTM for classification.",
    longDescription: "Engineered a system featuring a PyTorch inference backend with REST endpoints and Streamlit interface. Achieved 97.3% accuracy, outperforming ViT-Base by 3.7x in speed.",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop",
    tags: ["PyTorch", "DeiT", "Streamlit", "CV"],
    link: "#",
    github: "https://github.com/aish-r-01"
  },
  {
    id: "2",
    title: "Flight Delay Prediction",
    description: "Machine learning engine exposed via Python API for interactive prediction.",
    longDescription: "Built using Random Forest and XGBoost models trained on large-scale US flight datasets. Achieved 0.93 F1 score and 11.98-minute MAE.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?q=80&w=800&auto=format&fit=crop",
    tags: ["Random Forest", "XGBoost", "Python API", "ML"],
    link: "#",
    github: "https://github.com/aish-r-01"
  },
  {
    id: "3",
    title: "Nextus - Social Media Application",
    description: "Dynamic social media platform enabling user connection and content sharing.",
    longDescription: "Developed using Django framework with SQLite3. Implemented graph data structures for relationships and search algorithms for user suggestions.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    tags: ["Django", "SQLite3", "HTML/CSS", "JS"],
    link: "#",
    github: "https://github.com/aish-r-01"
  }
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Barclays Global Service Centre",
    role: "Technology Developer",
    period: "Jul 2025 — Present",
    description: [
      "Engineering an AI-powered intelligent document automation platform integrating template parsing and LLM-based mapping.",
      "Auto-populating Excel templates using internal API/DB/JSON data, eliminating manual workflows.",
      "Designing automation modules using Python, Autosys, and REST services."
    ]
  },
  {
    id: "exp-2",
    company: "Jithwa Solutions",
    role: "AI/ML Engineer Intern",
    period: "Mar 2024 — Jun 2024",
    description: [
      "Developed a RAG-based legal assistant integrating PDFChat and FAISS-powered vector retrieval.",
      "Achieved <2s response latency and 90%+ retrieval precision on large PDF legal corpora.",
      "Utilized LangChain, FAISS, Streamlit, and BERT for reliable context-aware guidance."
    ]
  }
];

export const skills: Skill[] = [
  { name: "Python", level: 5, category: "Languages" },
  { name: "C++", level: 4, category: "Languages" },
  { name: "SQL", level: 4, category: "Languages" },
  { name: "Bash", level: 3, category: "Languages" },
  { name: "HTML", level: 4, category: "Languages" },
  { name: "CSS", level: 4, category: "Languages" },
  { name: "JS", level: 4, category: "Languages" },
  { name: "PyTorch", level: 5, category: "AI/ML" },
  { name: "Transformers", level: 4, category: "AI/ML" },
  { name: "LangChain", level: 4, category: "AI/ML" },
  { name: "FAISS", level: 4, category: "AI/ML" },
  { name: "Scikit-learn", level: 4, category: "AI/ML" },
  { name: "Pandas/Numpy", level: 5, category: "AI/ML" },
  { name: "OpenCV", level: 4, category: "AI/ML" },
  { name: "Git", level: 4, category: "Tools" },
  { name: "Docker", level: 3, category: "Tools" },
  { name: "Autosys", level: 3, category: "Tools" }
];

export const publications = [
  {
    title: "Rainfall Forecasting Model for Amaravathi Basin Using Machine Learning Approach",
    journal: "Journal of the Institution of Engineers (India): Series A, Springer",
    year: "2025"
  },
  {
    title: "Comparative Analysis of Transformer-Based Models for Bail Prediction Using HLDC Dataset",
    journal: "IEEE TENCON 2025, Singapore (Best Paper Award)",
    year: "2025"
  },
  {
    title: "Blood Pressure Estimation from Photoplethysmography Signals: An EdgeML Approach",
    journal: "AICTA 2024, India",
    year: "2024"
  }
];

export const achievements: Achievement[] = [
  { id: "a1", description: "Among top 35 teams selected for Smart India Hackathon 2023 regional level." },
  { id: "a2", description: "High commendation award in CHINMUN 2019 & PSBBMUN 2019." },
  { id: "a3", description: "First place in city level rhapsody music competition (Madras Youth Coir, 2018)." }
];
