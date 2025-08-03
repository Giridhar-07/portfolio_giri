export interface TimelineItem {
  id: string;
  type: 'work' | 'education' | 'achievement';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills?: string[];
  current?: boolean;
}

export const timelineData: TimelineItem[] = [
  {
    id: '1',
    type: 'education',
    title: 'Bachelor of Engineering in Electronics and Communication',
    organization: 'BLDEA\'s V.P. Dr. P.G. Halakatti College of Engineering and Technology',
    location: 'India',
    startDate: '2021-10',
    endDate: '2025-06',
    description: 'Currently pursuing Bachelor of Engineering with focus on Electronics and Communication, specializing in Data Analytics and Web Development.',
    skills: ['Electronics', 'Communication Systems', 'Data Analytics', 'Web Development'],
    current: true,
  },
  {
    id: '2',
    type: 'work',
    title: 'AI Foundations Virtual Intern',
    organization: 'Microsoft & AICTE (via Edunet Foundation)',
    location: 'Remote',
    startDate: '2025-04',
    endDate: '2025-05',
    description: 'Completed intensive 4-week program covering AI fundamentals including supervised/unsupervised learning, neural networks, and ethical AI considerations. Applied theoretical concepts through practical exercises.',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Neural Networks', 'Ethical AI'],
  },
  {
    id: '3',
    type: 'work',
    title: 'Data Analytics Intern',
    organization: '360DigiTMG',
    location: 'Remote',
    startDate: '2025-03',
    endDate: '2025-04',
    description: 'Gained hands-on experience in Exploratory Data Analysis (EDA), Python programming, and PostgreSQL database management. Worked on real-world data projects and developed analytical skills.',
    skills: ['EDA', 'Python', 'PostgreSQL', 'Data Analysis', 'Database Management'],
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Python Full Stack Certification',
    organization: 'Varcons Technologies Pvt. Ltd',
    location: 'Online',
    startDate: '2024-05',
    endDate: '2024-06',
    description: 'Earned Python Full Stack Certification demonstrating proficiency in Python fundamentals, web development, and database management. Completed projects using Django, and SQLite.',
    skills: ['Python', 'SQL','Django', 'SQLite'],
  },
];