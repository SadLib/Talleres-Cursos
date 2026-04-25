import Navbar from "@/componentes/Navbar";
import Hero from "@/componentes/home/Hero";
import WorkshopsSection from "@/componentes/home/WorkshopSection";
import FAQSection from "@/componentes/FAQSection";
import Footer from "@/componentes/Footer";

const faqsInicio = [
  { question: "¿Qué es la plataforma de inscripción a talleres y cursos de MAC?", answer: "Es el espacio oficial para la comunidad estudiantil donde puedes inscribirte a talleres extracurriculares, tomar cursos avalados por profesorado y obtener constancias con valor curricular." },
  { question: "¿Tienen algún costo los cursos?", answer: "No, el uso de la plataforma y el registro a la mayoría de los talleres es completamente gratuito para la comunidad estudiantil." },
  { question: "¿Cómo participo como ponente?", answer: "Para ser ponente, debes postularte enviando tu propuesta al equipo administrador. Una vez aprobada, se publicará tu curso y el alumnado podrá inscribirse." }
];

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WorkshopsSection />
      <FAQSection faqs={faqsInicio} title="Preguntas Frecuentes" subtitle="Descubre todo lo que MAC te ofrece" />
      <Footer />
    </main>
  );
}

