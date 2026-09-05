import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import FAQSection from "@/componentes/FAQSection";
import WorkshopCard from "@/componentes/home/WorkshopCard";
import Image from "next/image";
import { notFound } from "next/navigation";
import { instructorToSpeaker, cursoToWorkshop } from "@/lib/api/adapters";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const faqsPonente = [
  { question: "¿Puedo contactar directamente a esta persona ponente?", answer: "Sí, puedes escribirle al correo electrónico que aparece en su perfil. Te sugerimos ser claro y respetuoso en tu mensaje." },
  { question: "¿Dónde puedo ver los talleres que ha impartido?", answer: "Justo debajo de la sección 'Acerca de' encontrarás la lista de talleres impartidos por esta persona ponente, con opción de inscribirte si aún hay cupos." },
  { question: "¿Puedo solicitar un taller sobre un tema específico?", answer: "Sí, puedes comunicarte con la persona ponente o con el equipo administrador para sugerir temas de interés. Las propuestas son evaluadas periódicamente." }
];

export default async function SpeakerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let instructorData;
  try {
    const res = await fetch(`${API}/instructores/${id}`, { cache: "no-store" });
    if (!res.ok) return notFound();
    instructorData = await res.json();
  } catch {
    return notFound();
  }

  const speaker = instructorToSpeaker(instructorData);

  let workshops: ReturnType<typeof cursoToWorkshop>[] = [];
  try {
    const res = await fetch(`${API}/talleres?instructor_id=${id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      workshops = data.map((c: any) => cursoToWorkshop(c));
    }
  } catch {
    workshops = [];
  }

  return (
    <>
      <Navbar />

      <section className="bg-blue-950 text-white py-16 relative overflow-hidden">
        <Image src="/images/fondo2.png" alt="Fondo" fill className="object-cover object-center opacity-85 pointer-events-none" priority />
        <div className="max-w-4xl mx-auto px-10 flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden shadow-lg">
            <Image
              src={speaker.image}
              alt={speaker.name}
              width={150}
              height={150}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{speaker.name}</h1>
            <p className="text-xl text-blue-200">{speaker.career}</p>
            <p className="text-md text-blue-100 mt-1">{speaker.specialty}</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-4xl mx-auto px-10">
          <div className="bg-white rounded-lg shadow p-8 mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Acerca de</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{speaker.description || "Sin descripción disponible."}</p>
            <h3 className="font-semibold text-gray-800 mb-2">Contacto</h3>
            <p className="text-blue-600 font-medium">{speaker.contacts}</p>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">Talleres Impartidos</h2>
          {workshops.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {workshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Esta persona ponente no tiene talleres asignados por el momento.</p>
          )}
        </div>
      </section>

      <FAQSection faqs={faqsPonente} title="Preguntas frecuentes" subtitle="Resolvemos tus dudas sobre esta persona ponente" />
      <Footer />
    </>
  );
}
