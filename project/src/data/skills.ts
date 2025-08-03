export interface Skill {
  name: string;
  level: number;
  years: number;
  category: 'data' | 'web';
}

export const skills: Skill[] = [
  // Data Analytics Skills
  { name: 'Python', level: 85, years: 3, category: 'data' },
  { name: 'SQL', level: 80, years: 2, category: 'data' },
  { name: 'Power BI', level: 75, years: 2, category: 'data' },
  { name: 'Excel', level: 90, years: 4, category: 'data' },
  { name: 'Pandas', level: 80, years: 2, category: 'data' },
  { name: 'Matplotlib', level: 70, years: 2, category: 'data' },
  { name: 'Tableau', level: 65, years: 1, category: 'data' },
  
  
  // Web Development Skills
  { name: 'React', level: 85, years: 3, category: 'web' },
  { name: 'JavaScript', level: 90, years: 4, category: 'web' },
  { name: 'Node.js', level: 70, years: 2, category: 'web' },
  { name: 'Tailwind CSS', level: 80, years: 2, category: 'web' },
  { name: 'Django', level: 60, years: 1, category: 'web' },
  { name: 'Git', level: 85, years: 3, category: 'web' },
];