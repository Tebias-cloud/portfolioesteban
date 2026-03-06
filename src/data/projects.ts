import * as Icons from "lucide-react";

interface BilingualText {
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

export const myProjects: Project[] = [
  {
    id: 'chaski',
    title: 'Campeonato Regional MTB',
    subtitle: { 
      ES: 'Arquitectura de Datos y Ranking en Tiempo Real', 
      EN: 'Data Architecture & Real-Time Leaderboard' 
    },
    description: {
      ES: 'El cálculo manual de puntajes deportivos generaba retrasos e inconsistencias críticas. Desarrollé una plataforma centralizada y automatizada para procesar miles de inscripciones y generar clasificaciones en tiempo real de forma precisa.',
      EN: 'Manual sports score calculations caused critical delays and inconsistencies. I developed a centralized, automated platform to process thousands of registrations and accurately generate real-time leaderboards.'
    },
    engineeringFocus: {
      ES: 'Diseñé una base de datos relacional protegida con Supabase RLS. Implementé Server Actions en Next.js para la validación automática de categorías y optimicé las consultas SQL para soportar picos de alto tráfico durante los días de carrera.',
      EN: 'Designed a relational database secured with Supabase RLS. Implemented Next.js Server Actions for automatic category validation and optimized SQL queries to handle high-traffic spikes during race days.'
    },
    tools: [
      { name: 'Next.js', icon: 'Globe' },
      { name: 'TypeScript', icon: 'FileCode2' },
      { name: 'Supabase', icon: 'Database' },
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
      ES: 'Las ventas basadas en mensajería de texto limitaban la escalabilidad del negocio. Construí un e-commerce desde cero centrado estrictamente en maximizar la conversión mediante un diseño UI premium y un flujo de checkout de cero fricciones.',
      EN: 'Text-messaging based sales severely limited business scalability. I built an e-commerce platform from scratch strictly focused on maximizing conversion through a premium UI design and a zero-friction checkout flow.'
    },
    engineeringFocus: {
      ES: 'Implementé Next.js con renderizado estático (SSG) para asegurar tiempos de carga en milisegundos y un SEO superior. Integré webhooks asíncronos de Mercado Pago para la validación segura de transacciones y automaticé el control de stock.',
      EN: 'Implemented Next.js with static site generation (SSG) to ensure millisecond load times and superior SEO. Integrated asynchronous Mercado Pago webhooks for secure transaction validation and automated stock control.'
    },
    tools: [
      { name: 'Next.js', icon: 'Zap' },
      { name: 'PostgreSQL', icon: 'Database' },
      { name: 'Mercado Pago', icon: 'CreditCard' },
      { name: 'Supabase', icon: 'Database' }
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
      ES: 'Para escalar el negocio y profesionalizar el proceso de venta, el cliente requería digitalizar su inventario. Desarrollé una SPA ultraligera que actúa como un catálogo instantáneo y redirige eficientemente las intenciones de compra hacia WhatsApp.',
      EN: 'To scale the business and professionalize the sales process, the client needed to digitize their inventory. I developed an ultra-lightweight SPA that acts as an instant catalog, efficiently redirecting purchase intents to WhatsApp.'
    },
    engineeringFocus: {
      ES: 'Anticipando el crecimiento del catálogo, diseñé proactivamente un algoritmo de compresión de imágenes en el cliente (Canvas API) antes de subir a Firebase, garantizando fluidez móvil y ahorro de ancho de banda. Arquitecté una base NoSQL ágil e implementé CI/CD.',
      EN: 'Anticipating catalog growth, I proactively designed a client-side image compression algorithm (Canvas API) prior to Firebase uploads, guaranteeing mobile fluidity and bandwidth savings. Architected an agile NoSQL database and implemented CI/CD.'
    },
    tools: [
      { name: 'Vanilla JS', icon: 'Terminal' },
      { name: 'Firebase', icon: 'Flame' },
      { name: 'CSS Grid', icon: 'Layout' },
      { name: 'CI/CD', icon: 'GitMerge' }
    ],
    images: ['/img/bobstore1.webp', '/img/bobstore2.webp', '/img/bobstore3.webp'],
    link: 'https://bobstore-89a30.web.app/',
    github: 'https://github.com/Tebias-cloud/bobstore-'
  }
];