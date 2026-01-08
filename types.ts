
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'Languages' | 'Frameworks & Libraries' | 'Tools' | 'AI/ML';
}

export interface Achievement {
  id: string;
  description: string;
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}
