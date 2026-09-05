"use client";

import { useState, useEffect } from "react";
import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import WorkshopCard from "@/componentes/home/WorkshopCard";
import FAQSection from "@/componentes/FAQSection";
import Image from "next/image";
import { listarCursos } from "@/lib/api/cursos";
import { cursoToWorkshop } from "@/lib/api/adapters";
import type { Workshop } from "@/lib/data";

const faqsCursos = [
  { question: "¿Cómo sé si hay cupo en un curso?", answer: "Si aparece la opcion de inscribirme, entonces el taller aun cuenta con cupo" },
  { question: "¿Hay un horario específico para los cursos en línea?", answer: "Sí, aunque sean en línea, los talleres tienen horarios definidos. Revisa la información del curso para no perderte las sesiones en vivo." },
  { question: "¿Pueden darme de baja de un taller?", answer: "Si acumulas varias faltas o incumples el reglamento de la persona ponente, podrías recibir una baja y no recibirás el certificado final." },
  { question: "¿Que pasa si un taller es en linea?", answer: "Si el taller es en linea, se te indicara la plataforma por la cual sera llevado, y por tu correo se te sera enviado el link correspondiente a el taller/curso." },
  { question: "¿Puedo cancelar mi inscripción?", answer: "Aparecera un boton de cancelar inscripcion en el detalle del curso, siempre y cuando no se haya iniciado el taller." },
  { question: "¿Como se que mi inscripcion fue aceptada?", answer: "Te aparecera un mensaje de exito al apretar confirmar inscripcion en el formulario de inscripcion, tambien podras verificar tu inscripcion en la pagina de mis talleres en tu perfil." }
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarCursos()
      .then((data) => setCourses(data.map(cursoToWorkshop)))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <section className="bg-blue-950 text-white py-14 text-center relative overflow-hidden">
        <Image src="/images/fondo2.png" alt="Fondo" fill className="object-cover object-center opacity-85 pointer-events-none" priority />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">Catálogo de Talleres y Cursos</h1>
          <p className="text-xl font-light text-blue-100">Explora nuestra oferta y encuentra el perfecto para ti</p>
        </div>
      </section>

      <section className="bg-gray-100 py-6 flex justify-center px-6">
        <div className="bg-white shadow-sm rounded-xl p-4 w-full max-w-3xl flex gap-4 items-center border border-gray-100">
          <span className="text-gray-500 text-sm whitespace-nowrap font-medium">
            {loading ? "..." : `${filteredCourses.length} talleres`}
          </span>
          <div className="flex-1 relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar curso..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
            />
          </div>
          <span className="text-gray-400 text-sm whitespace-nowrap hidden sm:inline">Ordenado por fecha</span>
        </div>
      </section>

      <section className="py-10 px-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredCourses.map((course) => (
              <WorkshopCard key={course.id} workshop={course} />
            ))}
          </div>
        )}
        {!loading && filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No se encontraron cursos</p>
        )}
      </section>

      <FAQSection faqs={faqsCursos} title="Dudas sobre los cursos" subtitle="Información rápida sobre inscripciones y asistencias" />
      <Footer />
    </>
  );
}
