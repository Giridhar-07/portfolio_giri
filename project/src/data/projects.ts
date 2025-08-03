export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: 'data' | 'web' | 'all';
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  links: {
    github?: string;
    demo?: string;
    caseStudy?: string;
  };
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Sales Data Analysis Dashboard',
    description: 'Comprehensive sales data analysis with interactive visualizations and key performance indicators.',
    longDescription: 'A detailed analysis of sales data using Python, Pandas, and visualization libraries. This project includes data cleaning, exploratory data analysis, trend identification, and actionable business insights.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'data',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    status: 'completed',
    links: {
      github: 'https://github.com/Giridhar-07/Sales_analysis',
    },
    featured: true,
  },
  {
    id: '2',
    title: 'Sentiment Analysis Project',
    description: 'Natural Language Processing project for analyzing sentiment in text data using machine learning.',
    longDescription: 'Advanced sentiment analysis using NLP techniques and machine learning algorithms. The project processes text data to determine emotional tone and sentiment polarity with high accuracy.',
    image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'data',
    technologies: ['Python', 'NLTK', 'Scikit-learn', 'Pandas', 'TextBlob'],
    status: 'completed',
    links: {
      github: 'https://github.com/Giridhar-07/Sentiment_analysis',
    },
    featured: true,
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Modern, responsive portfolio website built with React and TypeScript.',
    longDescription: 'A professional portfolio website showcasing projects, skills, and experience. Built with modern web technologies and featuring dark mode, smooth animations, and responsive design.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'completed',
    links: {
      github: 'https://github.com/Giridhar-07/portfolio_giri',
    },
    featured: true,
  },
  {
    id: '4',
    title: 'Consulting firm website',
    description: 'Full-stack Consulting firm website built with React, Django, and SQLlite.',
    longDescription: 'Modern and responsive website for a consulting firm, featuring contact forms, Job posting,About the Projects, and dynamic content updates.',
    image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    category: 'web',
    technologies: ['React', 'Django', 'SQLlite'],
    status: 'in-progress',
    links: {
      github: 'https://github.com/Giridhar-07/Azad_proj',
    },
    featured: false,
  },
  {
    id: '5',
    title: 'Weather Analytics Dashboard',
    description: 'Real-time weather data visualization with historical trend analysis.',
    longDescription: 'Interactive dashboard that displays weather patterns and climate trends using real-time API data and historical datasets.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'data',
    technologies: ['Python', 'Streamlit', 'Plotly', 'Weather API'],
    status: 'planned',
    links: {},
    featured: false,
  },
  {
    id: '6',
    title: 'HeliumThinks',
    description: 'Connect. Collaborate. Innovate.',
    longDescription: 'A cutting-edge platform to share skills, collaborate on groundbreaking projects, and find the perfect business partner in the digital age.',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'web',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    status: 'in-progress',
    links: {
      demo: 'https://technology-company-landing-page-76-48.lovable.app/',
      
    },
    featured: false,
  },
];