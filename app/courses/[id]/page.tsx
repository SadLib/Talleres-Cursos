import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import { workshopsData, speakersData } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ActionBox } from "@/componentes/course/ActionBox";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const workshop = workshopsData.find((w) => w.id === parseInt(id));

  if (!workshop) {
    return notFound();
  }

  // Permite renderizar múltiples ponentes si la información está disponible
  const mainPonente = speakersData.find((s) => s.id === workshop.ponenteId);
  const ponentes = mainPonente ? [mainPonente] : [];

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-400 to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3 max-w-4xl mx-auto px-4">
            {workshop.nombre}
          </h1>
          <p className="text-xl font-light text-blue-100">
            Detalles del taller e inscripción
          </p>
        </div>
      </section>

      <section className="py-12 px-6 lg:px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Box 1: Descripción del Curso */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Descripción del Curso</h2>
              <div className="text-gray-600 space-y-4 leading-relaxed text-justify w-full">
                <p>
                  Bienvenido al taller <strong>{workshop.nombre}</strong>. En este curso aprenderás los conceptos fundamentales e intermedios para dominar esta área y aplicarla en proyectos reales.
                </p>
                <p>
                  Nuestra metodología se enfoca en la práctica estructurada y el aprendizaje colaborativo. Esperamos que disfrutes cada módulo y aproveches al máximo la experiencia interactiva que hemos preparado para todos los asistentes.
                </p>
              </div>
            </div>

            {/* Box 3: Ponentes */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {ponentes.length > 1 ? "Ponentes" : "Ponente del Taller"}
              </h2>
              
              <div className="space-y-6">
                {ponentes.length > 0 ? (
                  ponentes.map(ponente => (
                    <div key={ponente.id} className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                      <div className="flex-shrink-0">
                        <Image
                          src={ponente.image}
                          alt={ponente.name}
                          width={110}
                          height={110}
                          className="rounded-full border-4 border-white shadow-md object-cover"
                        />
                      </div>
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="font-bold text-xl text-gray-800 mb-1">{ponente.name}</h3>
                        <p className="text-sm text-blue-700 font-semibold mb-2">{ponente.career}</p>
                        <p className="text-sm text-gray-600 font-medium mb-3">{ponente.specialty}</p>
                        <p className="text-sm text-gray-500 mb-5">{ponente.description}</p>
                        
                        <Link
                          href={`/speakers/${ponente.id}`}
                          className="inline-block text-sm bg-white text-blue-700 hover:bg-blue-50 border border-blue-200 font-semibold px-5 py-2.5 rounded-lg transition shadow-sm"
                        >
                          Ver perfil completo
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-center py-4">Información del ponente no disponible.</p>
                )}
              </div>
            </div>

          </div>

          {/* Box 2: Datos Generales e Inscripción */}
          <div className="lg:col-span-1">
            <ActionBox workshop={workshop} />
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
