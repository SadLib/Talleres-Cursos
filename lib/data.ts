export type Speaker = {
  id: number;
  name: string;
  career: string;
  specialty: string;
  description: string;
  contacts: string;
  image: string;
};

export type Student = {
  id: number;
  workshopId: number;
  name: string;
  email: string;
  image: string;
  numeroCuenta: string;
  asistencia: boolean;
  carrera?: string;
  fechaInscripcion?: string;
};

export type Workshop = {
  id: number;
  nombre: string;
  ponenteId: number | null;
  ponenteStr?: string;
  fecha: string;
  duracion: string;
  ubicacion: string;
  modalidad?: string;
  horario?: string;
  temario?: string[];
  cuposDisponibles?: number;
  cuposTotal?: number;
  concluido?: boolean;
  image: string;
  descripcion?: string;
  requisitos?: string[] | string;
};

export const speakersData: Speaker[] = [
  {
    id: 1,
    name: "Juan Pérez",
    career: "Ingeniería en Computación",
    specialty: "IA y Machine Learning",
    description: "Experto en modelos predictivos y aprendizaje automático con más de 5 años de experiencia en proyectos de investigación aplicada.",
    contacts: "juan@email.com",
    image: "/images/12.jpg",
  },
  {
    id: 2,
    name: "Ana López",
    career: "Ciencias de Datos",
    specialty: "Big Data",
    description: "Especialista en procesamiento y análisis de grandes volúmenes de datos utilizando tecnologías distribuidas y pipelines en la nube.",
    contacts: "ana@email.com",
    image: "/images/13.jpg",
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    career: "Ingeniería de Software",
    specialty: "Backend y APIs",
    description: "Desarrollador con amplia experiencia en arquitecturas de microservicios, diseño de APIs RESTful y bases de datos relacionales.",
    contacts: "carlos@email.com",
    image: "/images/15.avif",
  },
  {
    id: 4,
    name: "Luis Torres",
    career: "Matemáticas Aplicadas y Computación",
    specialty: "Algoritmos y Optimización",
    description: "Investigador enfocado en la optimización de sistemas computacionales y análisis de complejidad algorítmica.",
    contacts: "luis@email.com",
    image: "/images/16.jpg",
  },
  {
    id: 5,
    name: "María Díaz",
    career: "Ingeniería en Computación",
    specialty: "Frontend y UX",
    description: "Diseñadora de interfaces modernas con enfoque en experiencia de usuario, accesibilidad web y frameworks reactivos.",
    contacts: "maria@email.com",
    image: "/images/18.avif",
  },
  {
    id: 6,
    name: "Pedro Gómez",
    career: "Ciencias de Datos",
    specialty: "Python y Análisis de Datos",
    description: "Analista de datos con experiencia en limpieza, transformación y visualización de datos para la toma de decisiones.",
    contacts: "pedro@email.com",
    image: "/images/17.jpg",
  },
];

export const workshopsData: Workshop[] = [
  {
    id: 1,
    nombre: "React desde cero",
    ponenteId: 1,
    fecha: "10 de abril, 2026",
    duracion: "2 horas",
    ubicacion: "Enlace Teams",
    modalidad: "En Línea",
    horario: "10:00 - 12:00 hrs",
    temario: [
      "Introducción a React y JSX",
      "Estado y propiedades (useState, props)",
      "Ciclo de vida y useEffect",
      "Buenas prácticas"
    ],
    requisitos: [
      "Conocimientos básicos de HTML, CSS y JavaScript",
      "Computadora con Node.js instalado",
      "Mantener cámara encendida durante las sesiones prácticas"
    ],
    cuposTotal: 40,
    cuposDisponibles: 0,
    concluido: true,
    image: "/images/react.webp",
  },
  {
    id: 2,
    nombre: "Next.js avanzado",
    ponenteId: 2,
    fecha: "12 de abril, 2026",
    duracion: "3 horas",
    ubicacion: "Aula 3",
    modalidad: "Presencial",
    horario: "14:00 - 17:00 hrs",
    temario: [
      "App Router y Server Components",
      "Data Fetching nativo",
      "Optimizaciones en Next.js"
    ],
    cuposTotal: 30,
    cuposDisponibles: 12,
    image: "/images/nec.webp",
  },
  {
    id: 3,
    nombre: "Bases de datos",
    ponenteId: 3,
    fecha: "15 de abril, 2026",
    duracion: "2 horas",
    ubicacion: "Enlace Zoom",
    modalidad: "En Línea",
    horario: "16:00 - 18:00 hrs",
    temario: ["Modelado Relacional", "Consultas avanzadas en SQL", "Índices y rendimiento"],
    cuposTotal: 50,
    cuposDisponibles: 35,
    image: "/images/BD.jpeg",
  },
  {
    id: 4,
    nombre: "Algoritmos",
    ponenteId: 4,
    fecha: "18 de abril, 2026",
    duracion: "4 horas",
    ubicacion: "Lab 2",
    modalidad: "Presencial",
    horario: "09:00 - 13:00 hrs",
    temario: ["Complejidad computacional (Big O)", "Algoritmos de ordenamiento", "Grafos y árboles"],
    cuposTotal: 25,
    cuposDisponibles: 8,
    image: "/images/alg.jpg",
  },
  {
    id: 5,
    nombre: "C++ avanzado",
    ponenteId: 5,
    fecha: "20 de abril, 2026",
    duracion: "3 horas",
    ubicacion: "Aula 5 / Discord",
    modalidad: "Híbrida",
    horario: "11:00 - 14:00 hrs",
    temario: ["Punteros y manejo de memoria", "Programación orientada a objetos avanzada", "Templates"],
    cuposTotal: 35,
    cuposDisponibles: 20,
    image: "/images/c++.webp",
  },
  {
    id: 6,
    nombre: "Python Data",
    ponenteId: 6,
    fecha: "22 de abril, 2026",
    duracion: "2 horas",
    ubicacion: "Aula 1",
    modalidad: "Presencial",
    horario: "10:00 - 12:00 hrs",
    temario: ["Pandas y NumPy", "Limpieza de datos", "Visualización con Matplotlib"],
    cuposTotal: 25,
    cuposDisponibles: 22,
    image: "/images/python.jpg",
  },
];

export const studentsData: Student[] = [
  {
    id: 1,
    workshopId: 1,
    name: "Emilio García",
    email: "emilio@alumno.unam.mx",
    image: "/images/user.jpg",
    numeroCuenta: "318000000",
    asistencia: false,
  },
  {
    id: 2,
    workshopId: 1,
    name: "Sofía Martínez",
    email: "sofia@alumno.unam.mx",
    image: "/images/user.jpg",
    numeroCuenta: "419000000",
    asistencia: true,
  },

  {
    id: 3,
    workshopId: 2,
    name: "Fernando López",
    email: "fer@alumno.unam.mx",
    image: "/images/user.jpg",
    numeroCuenta: "420000000",
    asistencia: false,
  },
];
