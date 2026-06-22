import * as Icons from "lucide-react";

export interface BilingualText {
  ES: string;
  EN: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: BilingualText;
  description: BilingualText;
  engineeringFocus: BilingualText;
  tools: { name: string; icon: keyof typeof Icons }[];
  images: string[];
  link: string;
  github?: string;
}

export interface TechItem {
  name: string;
  icon: keyof typeof Icons;
}

export interface TechCategory {
  title: BilingualText;
  color: string;
  shadow: string;
  items: TechItem[];
}

export const myProjects: Project[] = [
  {
    id: 'chaski',
    title: 'Campeonato Regional MTB',
    subtitle: { 
      ES: 'Arquitectura de Datos y Ranking en Tiempo Real', 
      EN: 'Data Architecture & Real-Time Leaderboard' 
    },
    description: {
      ES: "El cálculo manual de puntajes deportivos generaba retrasos y errores en las clasificaciones. Desarrollé una plataforma centralizada que procesa miles de inscripciones y genera clasificaciones en tiempo real.",
      EN: "Manual score calculation caused delays and classification errors. I developed a centralized platform that processes thousands of registrations and generates real-time rankings."
    },
    engineeringFocus: {
      ES: "Diseñé una base de datos relacional con Supabase RLS. Implementé Server Actions en Next.js para validar automáticamente las categorías y escribí consultas SQL eficientes para manejar múltiples inscripciones sin bloqueos.",
      EN: "Designed a relational database with Supabase RLS. Implemented Next.js Server Actions for automatic category validation and wrote efficient SQL queries to handle multiple registrations without locks."
    },
    tools: [
      { name: 'Next.js', icon: 'Globe' },
      { name: 'TypeScript', icon: 'FileCode2' },
      { name: 'Supabase', icon: 'Zap' },
      { name: 'Tailwind', icon: 'Layout' }
    ],
    images: ['/img/chaski1.webp', '/img/chaski2.webp', '/img/chaski3.webp'],
    link: 'https://campeonato-mtb.vercel.app/',
    github: 'https://github.com/Tebias-cloud/Campeonato-MTB-leaderboard'
  },
  {
    id: 'fran',
    title: 'Joyería Fran',
    subtitle: { 
      ES: 'Optimización de Conversión y E-Commerce', 
      EN: 'Conversion Optimization & E-Commerce' 
    },
    description: {
      ES: "Las ventas por mensajería limitaban la escalabilidad. Construí un e-commerce desde cero centrado en maximizar la conversión mediante un diseño de interfaz optimizado y un flujo de compra simplificado.",
      EN: "Messaging-based sales limited scalability. I built an e-commerce from scratch focused on maximizing conversion through an optimized UI design and a simplified checkout flow."
    },
    engineeringFocus: {
      ES: "Usé renderizado estático (SSG) en Next.js para mejorar el rendimiento y el SEO. Integré webhooks asíncronos de Mercado Pago para procesar pagos seguros y desarrollé un panel que automatiza el control de stock.",
      EN: "Used static site generation (SSG) in Next.js to improve performance and SEO. Integrated asynchronous Mercado Pago webhooks for secure payment processing and built an admin panel that automates stock control."
    },
    tools: [
      { name: 'Next.js', icon: 'Globe' },
      { name: 'PostgreSQL', icon: 'Database' },
      { name: 'Mercado Pago', icon: 'CreditCard' },
      { name: 'Supabase', icon: 'Zap' }
    ],
    images: ['/img/joyas1.webp', '/img/joyas2.webp', '/img/joyas3.webp'],
    link: 'https://joyas-fran.vercel.app/',
    github: 'https://github.com/Tebias-cloud/joyas-fran'
  },
  {
    id: 'bobstore',
    title: 'Bobstore',
    subtitle: { 
      ES: 'Catálogo Digital y Rendimiento Mobile', 
      EN: 'Digital Catalog & Mobile Performance' 
    },
    description: {
      ES: "Para escalar el negocio, el cliente requería digitalizar su inventario. Desarrollé un catálogo instantáneo ultraligero que redirige al cliente a WhatsApp para concretar la compra.",
      EN: "To scale the business, the client needed to digitize their inventory. I developed an ultra-lightweight instant catalog that redirects the customer to WhatsApp to complete the purchase."
    },
    engineeringFocus: {
      ES: "Ante el crecimiento previsto del catálogo, diseñé un algoritmo de compresión de imágenes en el cliente (Canvas API) antes de subirlas a Firebase, lo que reduce el consumo de ancho de banda y mejora la experiencia en móviles. Usé Firebase Firestore como base de datos y Firebase Deploy para el despliegue.",
      EN: "Anticipating catalog growth, I designed a client-side image compression algorithm (Canvas API) before uploading to Firebase, reducing bandwidth usage and improving the mobile experience. Used Firebase Firestore as the database and Firebase Deploy for deployment."
    },
    tools: [
      { name: 'Vanilla JS', icon: 'Terminal' },
      { name: 'Firebase', icon: 'Flame' },
      { name: 'CSS Grid', icon: 'Layout' },
      { name: 'Firebase Deploy', icon: 'Rocket' }
    ],
    images: ['/img/bobstore1.webp', '/img/bobstore2.webp', '/img/bobstore3.webp'],
    link: 'https://bobstore-89a30.web.app/',
    github: 'https://github.com/Tebias-cloud/bobstore-'
  }
];

export const techCategories: TechCategory[] = [
  {
    title: { ES: "Lenguajes", EN: "Languages" },
    color: "bg-blue-500",
    shadow: "rgba(59,130,246,0.4)",
    items: [
      { name: "TypeScript", icon: "FileCode2" },
      { name: "Python", icon: "Code2" },
      { name: "Java", icon: "Coffee" },
      { name: "C", icon: "Terminal" },
    ]
  },
  {
    title: { ES: "Frameworks y Librerías", EN: "Frameworks & Libraries" },
    color: "bg-cyan-500",
    shadow: "rgba(6,182,212,0.4)",
    items: [
      { name: "Next.js", icon: "Globe" },
      { name: "React", icon: "Atom" },
      { name: "Tailwind CSS", icon: "Wind" },
      { name: "Astro", icon: "Rocket" },
    ]
  },
  {
    title: { ES: "Bases de Datos y Cloud", EN: "Databases & Cloud" },
    color: "bg-emerald-500",
    shadow: "rgba(16,185,129,0.4)",
    items: [
      { name: "PostgreSQL", icon: "Database" },
      { name: "Supabase", icon: "Zap" },
      { name: "Firebase", icon: "Flame" },
    ]
  },
  {
    title: { ES: "Infraestructura y Deploy", EN: "Infrastructure & Deploy" },
    color: "bg-purple-500",
    shadow: "rgba(168,85,247,0.4)",
    items: [
      { name: "Vercel", icon: "Triangle" },
    ]
  },
  {
    title: { ES: "Herramientas de Desarrollo", EN: "Development Tools" },
    color: "bg-zinc-500",
    shadow: "rgba(113,113,122,0.4)",
    items: [
      { name: "Git", icon: "GitBranch" },
      { name: "GitHub", icon: "Github" },
      { name: "Figma", icon: "PenTool" },
    ]
  },
];
