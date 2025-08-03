export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  category: 'data' | 'web' | 'other';
  link?: string;
  featured: boolean;
}

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'Full Stack Web development',
    issuer: 'Varcons Technologies Pvt. Ltd',
    date: 'June 2024',
    description: 'Comprehensive Full stack Web development 1-Month internship Using HTML,CSS,Javascript,Django,PostgresSQL.',
    image: 'https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=600',
    category: 'web',
    link: 'https://v.certiefy.com/S0VZR0VOMuKLhQQN2xN8oiMJSEOPLI0Q0yYS6Pan9zbhyRHT5Fq-x8fNl1lCnFQFK4d6pqGFiTOTaXyV4i06Ccz5Qx4KRi65otoZEd12R9ixwSDcNLZ4nlVkLtKVvb-ocLRHCmodEeS_4bdyxFvntO_VMoOOWl9S4JI5BT8F5zWeac-y9h0qi1wkHSSg0TscU0HkPXIjf6hhavV0Twi-JPMePNfZGbTjx-hIWWn6YTWvOtsXJj_iTh3t1gRqBCSHlUDYvcFjJv1xowo9dl2w4hVnsF2DhWEC_udOvw1_o85xJhEKXAElz6t6678QTIwWyXzA3tQuYFXz8ZY2olZCXOoNWXWREMArNjTBRzmohXyddvDxkgnwhgGzkKp1I32MtR_a9fWXkxR3AuKLhW9IWTaQNFlN-jlETJY80Nxkxq3m87Kl1Y-Jlr--osds',
    featured: true,
  },
  {
    id: '2',
    title: 'Data Analytics',
    issuer: '360 DigitMG',
    date: 'March 2023',
    description: 'Comprehensive Data Analytics program covering data visualization, data modeling, and data interpretation.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.hz8KstQDBbfegIf5I-D8LQHaEw?rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'data',
    link: 'https://drive.google.com/file/d/1npTrlSjjoxOC0JadfMXOWlpt94iwntAS/view?usp=sharing',
    featured: true,
  },
  {
    id: '3',
    title: 'Foundations of AI',
    issuer: 'Edunet Foundation',
    date: 'May 2025',
    description: 'Comprehensive Foundations of AI program covering supervised learning, unsupervised learning, and deep learning.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'data',
    link: 'https://drive.google.com/file/d/19eCiWc1ugGBdRn0UO7_0qLvWQHrEuCQW/view?usp=sharing',
    featured: false,

  },
];