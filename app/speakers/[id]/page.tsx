import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import { speakersData, workshopsData } from "@/lib/data";
import WorkshopCard from "@/componentes/home/WorkshopCard";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function SpeakerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const speaker = speakersData.find((s) => s.id === parseInt(id));

  if (!speaker) {
    return notFound();
  }

  const ponenteWorkshops = workshopsData.filter((w) => w.ponenteId === speaker.id);

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-yellow-400 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-10 flex flex-col md:flex-row items-center gap-8 relative z-10">
          <Image
            src={speaker.image}
            alt={speaker.name}
            width={150}
            height={150}
            className="rounded-full border-4 border-white shadow-lg object-cover"
          />
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
            <p className="text-gray-700 leading-relaxed mb-6">{speaker.description}</p>
            <h3 className="font-semibold text-gray-800 mb-2">Contacto</h3>
            <p className="text-blue-600 font-medium">{speaker.contacts}</p>
          </div>

          <h2 className="text-3xl font-bold mb-6 text-gray-800">Talleres Impartidos</h2>
          
          {ponenteWorkshops.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {ponenteWorkshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Este ponente no tiene talleres asignados por el momento.</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
