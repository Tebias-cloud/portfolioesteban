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
  link?: string;
  github?: string;
  status: BilingualText;
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
      ES: "El cálculo manual de puntajes deportivos generaba retrasos y errores en las clasificaciones del campeonato. Desarrollé una plataforma centralizada que procesa inscripciones y genera clasificaciones en tiempo real, utilizada para centralizar la operación de los 7 clubes organizadores del campeonato.",
      EN: "Manual score calculation caused delays and classification errors in the championship. I developed a centralized platform that processes registrations and generates real-time rankings, used to centralize the operations of the 7 organizing clubs."
    },
    engineeringFocus: {
      ES: "Diseñé una arquitectura de datos relacional para gestionar participantes, resultados y clasificaciones. Implementé procesamiento automático de resultados oficiales y funcionalidades administrativas para optimizar la gestión del campeonato.",
      EN: "Designed a relational data architecture to manage participants, results, and leaderboards. Implemented automatic parsing of official race results and administrative tools to optimize league operations."
    },
    tools: [
      { name: 'Next.js 15', icon: 'Globe' },
      { name: 'TypeScript', icon: 'FileCode2' },
      { name: 'Supabase', icon: 'Zap' },
      { name: 'Tailwind CSS', icon: 'Layout' }
    ],
    images: ['/img/chaski1.webp', '/img/chaski2.webp', '/img/chaski3.webp'],
    link: 'https://campeonato-mtb.vercel.app/',
    github: 'https://github.com/Tebias-cloud/Campeonato-MTB-leaderboard',
    status: {
      ES: 'Completado',
      EN: 'Completed'
    }
  },
  {
    id: 'fran',
    title: 'Joyería Fran',
    subtitle: { 
      ES: 'E-Commerce Automatizado y Transacciones de Stock', 
      EN: 'Automated E-Commerce & Stock Transactions' 
    },
    description: {
      ES: "El proceso manual de venta y control de inventario dificultaba la operación de la joyería. Diseñé e implementé una plataforma web para la venta online que automatiza el catálogo, gestiona el inventario e integra la confirmación segura de transacciones.",
      EN: "Manual sales processes and inventory tracking hindered jewelry store operations. I designed and implemented a web platform for online sales that automates the catalog, manages inventory, and integrates secure transaction confirmation."
    },
    engineeringFocus: {
      ES: "Integré Mercado Pago con validación de pagos y diseñé la gestión transaccional de inventario para evitar inconsistencias durante las compras. Optimicé la carga de imágenes mediante procesamiento previo en cliente.",
      EN: "Integrated Mercado Pago with payment validation and designed transactional inventory management to prevent purchase inconsistencies. Optimized image loading via client-side preprocessing."
    },
    tools: [
      { name: 'Next.js', icon: 'Globe' },
      { name: 'PostgreSQL', icon: 'Database' },
      { name: 'Mercado Pago', icon: 'CreditCard' },
      { name: 'Supabase', icon: 'Zap' }
    ],
    images: ['/img/joyas1.webp', '/img/joyas2.webp', '/img/joyas3.webp'],
    link: 'https://joyas-fran.vercel.app/',
    github: 'https://github.com/Tebias-cloud/joyas-fran',
    status: {
      ES: 'Completado',
      EN: 'Completed'
    }
  },
  {
    id: 'deathcloud',
    title: 'DeathCloud',
    subtitle: { 
      ES: 'Plataforma Distribuidora y Sockets en Tiempo Real', 
      EN: 'Launcher Hub & Real-Time Sockets' 
    },
    description: {
      ES: "La dispersión de servicios y la gestión manual de usuarios dificultaba la interacción entre jugadores. Desarrollé una plataforma que conecta un cliente React con un backend Express y base de datos relacional para centralizar chats en tiempo real, tickets de soporte e inventarios de personajes.",
      EN: "Scattered services and manual user management hindered player interaction. I developed a platform linking a React client to an Express backend and relational database to centralize real-time chat, support tickets, and character inventories."
    },
    engineeringFocus: {
      ES: "Diseñé un backend con Express y una arquitectura preparada para manejar distintos servicios del ecosistema del juego. Implementé comunicación en tiempo real mediante Socket.io y una estructura relacional para gestionar usuarios, inventarios y soporte.",
      EN: "Designed an Express backend architecture structured to handle different services within the game's ecosystem. Implemented real-time communications using Socket.io and a relational schema to manage users, inventories, and support."
    },
    tools: [
      { name: 'React', icon: 'Atom' },
      { name: 'Node.js', icon: 'Terminal' },
      { name: 'Express.js', icon: 'Globe' },
      { name: 'PostgreSQL', icon: 'Database' },
      { name: 'Socket.io', icon: 'Zap' }
    ],
    images: ['/img/deathcloud1.webp', '/img/deathcloud2.webp', '/img/deathcloud3.webp'],
    github: 'https://github.com/Tebias-cloud/DeathCloud',
    status: {
      ES: 'Servidor Offline - Demo Local',
      EN: 'Server Offline - Local Demo'
    }
  },
  {
    id: 'bobstore',
    title: 'Bob Store',
    subtitle: { 
      ES: 'Catálogo Digital e Integración de Mensajería', 
      EN: 'Digital Catalog & Messaging Integration' 
    },
    description: {
      ES: "La falta de un canal digital impedía que la tienda de ropa mostrara su stock de forma remota. Desarrollé un catálogo digital optimizado para dispositivos móviles que permite a los clientes explorar productos y enviar consultas de compra detalladas directamente al canal de WhatsApp Business del negocio.",
      EN: "The lack of a digital channel prevented the clothing store from showing its stock remotely. I developed a mobile-optimized digital catalog that allows customers to browse products and send detailed purchase inquiries directly to the business's WhatsApp Business chat."
    },
    engineeringFocus: {
      ES: "Diseñé e implementé la base de datos no relacional sobre Firebase Firestore, integrando un panel privado de administración para la sincronización instantánea de stock de productos y precios. Optimicé la carga de recursos estáticos en móviles mediante pre-procesado de imágenes.",
      EN: "Designed and implemented the non-relational database on Firebase Firestore, integrating a private admin panel for real-time stock and price updates. Optimized mobile asset loading through image preprocessing."
    },
    tools: [
      { name: 'Vanilla JS', icon: 'Terminal' },
      { name: 'Firebase', icon: 'Flame' },
      { name: 'CSS Grid', icon: 'Layout' },
      { name: 'Firebase Deploy', icon: 'Rocket' }
    ],
    images: ['/img/bobstore1.webp', '/img/bobstore2.webp', '/img/bobstore3.webp'],
    link: 'https://bobstore-89a30.web.app/',
    github: 'https://github.com/Tebias-cloud/bobstore-',
    status: {
      ES: 'Completado',
      EN: 'Completed'
    }
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
