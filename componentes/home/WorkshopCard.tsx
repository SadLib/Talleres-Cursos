import Link from "next/link";
import Image from "next/image";
import { type Workshop, speakersData } from "@/lib/data";

type Props = {
  workshop: Workshop;
};

export default function WorkshopCard({ workshop }: Props) {
  const ponente = speakersData.find((s) => s.id === workshop.ponenteId);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden flex flex-col w-full max-w-sm h-full mx-auto">
      
      {/* Contenedor de la imagen más cuadrado/rectangular (4:3) para evitar que sea muy largo */}
      <div className="relative w-full aspect-[4/3] bg-gray-200 shrink-0">
         {/* Se prepara la Image para que contenga correctamente el src usando object-cover */}
         <Image 
           src="/images/hero.jpg" 
           alt={workshop.nombre} 
           fill 
           className="object-cover"
         />
      </div>

      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="font-bold text-lg mb-4 text-gray-800 leading-tight">{workshop.nombre}</h3>

        <div className="mb-auto">
          {/* Ponente */}
          <div className="mb-4">
            <p className="font-semibold text-gray-800">{ponente?.name || workshop.ponenteStr || "Por asignar"}</p>
            {ponente?.specialty && (
              <p className="text-sm text-gray-500">{ponente.specialty}</p>
            )}
          </div>

          {/* Detalles con iconos minimalistas */}
          <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z" />
              </svg>
              <span>{workshop.fecha}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{workshop.duracion}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{workshop.ubicacion}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          {!workshop.concluido && (
            <button className="bg-yellow-600 text-white font-medium py-2 rounded-md hover:bg-yellow-700 transition w-full flex items-center justify-center gap-2">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Inscribirse
            </button>
          )}

          <Link
            href={`/courses/${workshop.id}`}
            className="bg-blue-900 border border-transparent text-white font-medium py-2 rounded-md hover:bg-blue-800 transition w-full text-center"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}
