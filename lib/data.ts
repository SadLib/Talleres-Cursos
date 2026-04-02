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
  noCuenta: string;
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
  cuposDisponibles?: number;
  cuposTotal?: number;
  concluido?: boolean;
};

export const speakersData: Speaker[] = [
  {
    id: 1,
    name: "Juan Pérez",
    career: "Ingeniería en Computación",
    specialty: "IA y Machine Learning",
    description: "Experto en modelos predictivos",
    contacts: "juan@email.com",
    image: "/images/user.jpg",
  },
  {
    id: 2,
    name: "Ana López",
    career: "Ciencias de Datos",
    specialty: "Big Data",
    description: "Trabaja con grandes volúmenes de datos",
    contacts: "ana@email.com",
    image: "/images/user.jpg",
  },
  {
    id: 3,
    name: "Carlos Ruiz",
    career: "Software",
    specialty: "Backend",
    description: "Especialista en APIs",
    contacts: "carlos@email.com",
    image: "/images/user.jpg",
  },
  {
    id: 4,
    name: "Luis Torres",
    career: "Matemáticas",
    specialty: "Algoritmos",
    description: "Optimización de sistemas",
    contacts: "luis@email.com",
    image: "/images/user.jpg",
  },
  {
    id: 5,
    name: "María Díaz",
    career: "Ingeniería",
    specialty: "Frontend",
    description: "Interfaces modernas",
    contacts: "maria@email.com",
    image: "/images/user.jpg",
  },
  {
    id: 6,
    name: "Pedro Gómez",
    career: "Data Science",
    specialty: "Python",
    description: "Análisis de datos",
    contacts: "pedro@email.com",
    image: "/images/user.jpg",
  },
];

export const workshopsData: Workshop[] = [
  {
    id: 1,
    nombre: "React desde cero",
    ponenteId: 1,
    fecha: "10 Abril",
    duracion: "2 horas",
    ubicacion: "Online",
    concluido: true,
  },
  {
    id: 2,
    nombre: "Next.js avanzado",
    ponenteId: 2,
    fecha: "12 Abril",
    duracion: "3 horas",
    ubicacion: "Aula 3",
  },
  {
    id: 3,
    nombre: "Bases de datos",
    ponenteId: 3,
    fecha: "15 Abril",
    duracion: "2 horas",
    ubicacion: "Online",
  },
  {
    id: 4,
    nombre: "Algoritmos",
    ponenteId: 4,
    fecha: "18 Abril",
    duracion: "4 horas",
    ubicacion: "Lab 2",
  },
  {
    id: 5,
    nombre: "C++ avanzado",
    ponenteId: 5,
    fecha: "20 Abril",
    duracion: "3 horas",
    ubicacion: "Online",
  },
  {
    id: 6,
    nombre: "Python Data",
    ponenteId: 6,
    fecha: "22 Abril",
    duracion: "2 horas",
    ubicacion: "Aula 1",
    cuposTotal: 25,
    cuposDisponibles: 22,
  },
];

export const studentsData: Student[] = [
  {
    id: 1,
    workshopId: 1,
    name: "Emilio García",
    email: "emilio@alumno.unam.mx",
    image: "/images/user.jpg",
    noCuenta: "318000000",
    asistencia: false,
  },
  {
    id: 2,
    workshopId: 1,
    name: "Sofía Martínez",
    email: "sofia@alumno.unam.mx",
    image: "/images/user.jpg",
    noCuenta: "419000000",
    asistencia: true,
  },
  {
    id: 3,
    workshopId: 2,
    name: "Fernando López",
    email: "fer@alumno.unam.mx",
    image: "/images/user.jpg",
    noCuenta: "420000000",
    asistencia: false,
  },
];
