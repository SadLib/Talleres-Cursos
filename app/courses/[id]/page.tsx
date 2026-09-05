import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import FAQSection from "@/componentes/FAQSection";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ActionBox } from "@/componentes/course/ActionBox";
import SpeakerCard from "@/componentes/ponente/SpeakerCard";
import { cursoToWorkshop, instructorToSpeaker } from "@/lib/api/adapters";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const faqsCursoDetalle = [
  { question: "¿Cómo me inscribo a este taller?", answer: "Haz clic en el botón 'Inscribirse al Taller' en el panel lateral. Antes de confirmar, se mostrarán tus datos registrados para verificación. Asegúrate de tener tu perfil completo." },
  { question: "¿Puedo cancelar mi inscripción?", answer: "Sí, una vez inscrito aparecerá la opción de cancelar inscripción en esta misma página. Te recomendamos cancelar a tiempo para liberar tu lugar." },
  { question: "¿Qué pasa si no asisto al taller?", answer: "Si no asistes, no recibirás el certificado correspondiente. En futuros talleres, el historial de asistencia puede ser considerado para la asignación de cupos." },
  { question: "¿Recibiré un certificado al finalizar?", answer: "Sí, al concluir el taller y una vez que la persona ponente confirme tu asistencia, se generará automáticamente un certificado descargable desde tu perfil." }
];

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let cursoData;
  try {
    const res = await fetch(`${API}/talleres/${id}`, { cache: "no-store" });
    if (!res.ok) return notFound();
    cursoData = await res.json();
  } catch {
    return notFound();
  }

  const workshop = cursoToWorkshop(cursoData);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ponentes = (cursoData.ponentes ?? []).map((p: any) => instructorToSpeaker(p));

  return (
    <>
      <Navbar />

      <section className="bg-blue-950 text-white py-14 text-center relative overflow-hidden">
        <Image src="/images/fondo2.png" alt="Fondo" fill className="object-cover object-center opacity-85 pointer-events-none" priority />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3 max-w-4xl mx-auto px-4">{workshop.nombre}</h1>
          <p className="text-xl font-light text-blue-100">Detalles del taller e inscripción</p>
        </div>
      </section>

      <section className="py-12 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          <div className="lg:col-span-2 space-y-10">

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Descripción del Taller</h2>
              <div className="text-gray-600 space-y-4 leading-relaxed text-justify w-full">
                {workshop.descripcion ? (
                  <p>{workshop.descripcion}</p>
                ) : (
                  <>
                    <p>Bienvenido al taller <strong>{workshop.nombre}</strong>. En este curso aprenderás los conceptos fundamentales e intermedios para dominar esta área y aplicarla en proyectos reales.</p>
                    <p>Nuestra metodología se enfoca en la práctica estructurada y el aprendizaje colaborativo.</p>
                  </>
                )}
              </div>
            </div>

            {workshop.temario && workshop.temario.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Temario</h2>
                <ul className="list-inside list-disc text-gray-600 space-y-2 text-lg">
                  {workshop.temario.map((tema, index) => (
                    <li key={index}>{tema}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {ponentes.length > 1 ? "Ponentes" : "Ponente del Taller"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ponentes.length > 0 ? (
                  ponentes.map((ponente: ReturnType<typeof instructorToSpeaker>, i: number) => (
                    <SpeakerCard key={i} speaker={ponente} />
                  ))
                ) : (
                  <p className="text-gray-500 italic py-4 col-span-full text-center">Información del ponente no disponible.</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <ActionBox workshop={workshop} />
          </div>

        </div>
      </section>

      <FAQSection faqs={faqsCursoDetalle} title="Preguntas sobre este taller" subtitle="Información útil sobre la inscripción y el curso" />
      <Footer />
    </>
  );
}
