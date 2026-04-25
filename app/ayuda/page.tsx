"use client";
import { useState } from "react";
import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import FAQSection, { type FAQ } from "@/componentes/FAQSection";
import Image from "next/image";

const categoriasData: Record<string, FAQ[]> = {
  "Inscripción": [
    { question: "¿Cómo me inscribo a un curso?", answer: "Haz clic en el botón 'Inscribirse al Taller' en la vista de detalles. Antes de confirmar, se mostrarán tus datos registrados para verificación. Asegúrate de tener tu perfil completo." },
    { question: "¿Cómo sé si hay cupo en un curso?", answer: "Si aparece la opción de inscribirme, entonces el taller aún cuenta con cupo." },
    { question: "¿Cómo sé que mi inscripción fue aceptada?", answer: "Te aparecerá un mensaje de éxito al apretar confirmar inscripción en el formulario de inscripción, también podrás verificar tu inscripción en la página de mis talleres en tu perfil." },
    { question: "¿Puedo cancelar mi inscripción?", answer: "Sí, aparecerá la opción de cancelar inscripción en la página del curso o desde tus detalles de perfil, siempre y cuando no haya iniciado el taller. Te recomendamos cancelar a tiempo para liberar tu lugar." },
    { question: "¿Hay un límite de cursos a los que me puedo inscribir?", answer: "No hay límite estricto, pero te sugerimos inscribirte solo a los cursos en los que realmente podrás participar para no ocupar el lugar de otra persona." }
  ],
  "Cuenta": [
    { question: "¿Cómo completo mi perfil?", answer: "Ve a tu menú de usuario en la esquina superior derecha, selecciona 'Perfil' y edita tus datos obligatorios como Carrera y Semestre." },
    { question: "Olvidé mi contraseña, ¿qué hago?", answer: "Por ahora, debes comunicarte con el equipo administrador del sistema para solicitar un restablecimiento de clave temporal." }
  ],
  "Cursos": [
    { question: "¿Qué es la plataforma de inscripción a talleres y cursos de MAC?", answer: "Es el espacio oficial para la comunidad estudiantil donde puedes inscribirte a talleres extracurriculares, tomar cursos avalados por profesorado y obtener constancias con valor curricular." },
    { question: "¿Tienen algún costo los cursos?", answer: "No, el uso de la plataforma y el registro a la mayoría de los talleres es completamente gratuito para la comunidad estudiantil." },
    { question: "¿Qué significa modalidad Híbrida?", answer: "Significa que algunas sesiones o participantes estarán de manera presencial en el aula indicada, y el resto estará conectado simultáneamente a través de un enlace en línea." },
    { question: "¿Qué pasa si un taller es en línea?", answer: "Si el taller es en línea, se te indicará la plataforma por la cual será llevado, y por tu correo se te enviará el link correspondiente." },
    { question: "¿Hay un horario específico para los cursos en línea?", answer: "Sí, aunque sean en línea, los talleres tienen horarios definidos. Revisa la información del curso para no perderte las sesiones en vivo." },
    { question: "¿Dónde encuentro el temario?", answer: "Al hacer clic en 'Ver detalles' de cada curso, encontrarás la sección 'Temario' justo debajo de la descripción general." },
    { question: "¿Qué pasa si no asisto al taller?", answer: "Si no asistes, no recibirás el certificado correspondiente. En futuros talleres, el historial de asistencia puede ser considerado para la asignación de cupos." },
    { question: "¿Pueden darme de baja de un taller?", answer: "Si acumulas varias faltas o incumples el reglamento de la persona ponente, podrías recibir una baja y no recibirás el certificado final." },
    { question: "¿Puedo solicitar un taller sobre un tema específico?", answer: "Sí, puedes comunicarte con la persona ponente o con el equipo administrador para sugerir temas de interés. Las propuestas son evaluadas periódicamente." }
  ],
  "Certificados": [
    { question: "¿Cómo obtengo mi certificado?", answer: "Una vez que la persona ponente o el equipo administrador marque tu asistencia al curso y lo concluya, tu certificado se generará automáticamente en tu perfil." },
    { question: "¿Recibiré un certificado al finalizar?", answer: "Sí, al concluir el taller y una vez que la persona ponente confirme tu asistencia, se generará automáticamente un certificado descargable desde tu perfil." },
    { question: "¿Dónde descargo mis certificados?", answer: "En el menú superior, ve a tu Perfil y selecciona la pestaña 'Certificados'. Ahí podrás verlos y descargarlos." }
  ]
};

const categorias = Object.keys(categoriasData);

export default function AyudaPage() {
  const [activa, setActiva] = useState<string>(categorias[0]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f9ff]">
      <Navbar />

      {/* Header Ayuda */}
      <section className="bg-blue-900 text-white py-16 text-center relative overflow-hidden">
        <Image src="/images/fondo2.png" alt="Fondo" fill className="object-cover object-center opacity-85 pointer-events-none" priority />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Centro de Ayuda</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto px-4">
            Te resolvemos cualquier duda sobre la plataforma, inscripciones, certificados y manejo de tu cuenta.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-10">

        {/* Sidebar Categorías */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-28">
            <h3 className="text-lg font-bold text-gray-800 mb-4 px-3">Categorías</h3>
            <ul className="space-y-2">
              {categorias.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => setActiva(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer ${activa === cat
                        ? "bg-blue-50 text-blue-800 border border-blue-100"
                        : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* FAQ Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Reutilizando nuestro componente adaptándole los campos */}
            <FAQSection
              title={`Preguntas sobre ${activa}`}
              subtitle="Explora las dudas más comunes"
              faqs={categoriasData[activa]}
            />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
