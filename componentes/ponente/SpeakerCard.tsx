import Image from "next/image";
import Link from "next/link";
import { type Speaker } from "@/lib/data";

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden flex flex-col w-full max-w-sm h-full mx-auto">
      
      {/* Contenedor de la imagen más cuadrado/rectangular (4:3) para evitar que sea muy largo */}
      <div className="relative w-full aspect-[4/3] bg-gray-200 shrink-0">
         <Image 
           src={speaker.image || "/images/user.jpg"} 
           alt={speaker.name} 
           fill 
           className="object-cover"
         />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="font-bold text-lg mb-4 text-gray-800 leading-tight pb-2">{speaker.name}</h3>

        <div className="mb-auto">
          {/* Especialidad / Carrera */}
          <div className="mb-4">
            <p className="font-semibold text-gray-800 text-base">{speaker.specialty || "Sin especialidad"}</p>
            {speaker.career && (
              <p className="text-sm text-gray-500 font-medium">{speaker.career}</p>
            )}
          </div>

          {/* Detalles con iconos minimalistas */}
          <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600">
            {/* Descripción corta / Perfil */}
            {speaker.description && (
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{speaker.description}</span>
              </div>
            )}
            
            {/* Contacto */}
            {speaker.contacts && (
              <div className="flex items-center gap-2 mt-1">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{speaker.contacts}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <Link
            href={`/speakers/${speaker.id}`}
            className="bg-blue-900 border border-transparent text-white font-medium py-2 rounded-md hover:bg-blue-800 transition w-full text-center flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
            Ver talleres
          </Link>
        </div>
      </div>
    </div>
  );
}
