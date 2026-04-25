import Link from "next/link";
import Image from "next/image";
import { type Workshop } from "@/lib/data";

export function WorkshopCardPonente({ taller }: { taller: Workshop }) {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row gap-6 items-center md:items-stretch transition hover:shadow-md">
      
      {/* Imagen */}
      <div className="relative w-full md:w-56 h-40 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
        <Image src={taller.image} alt={taller.nombre} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-center text-center md:text-left">
        <h3 className="font-bold text-xl text-gray-800 mb-3">{taller.nombre}</h3>
        
        <div className="flex flex-col gap-2 text-sm text-gray-500 mb-5 justify-center md:justify-start">
          <p className="flex items-center gap-2 justify-center md:justify-start">
            <svg className="w-4 h-4 opacity-70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {taller.fecha} | {taller.duracion}
          </p>
          <p className="flex items-center gap-2 justify-center md:justify-start">
            <svg className="w-4 h-4 opacity-70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {taller.ubicacion}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-auto">
          <Link 
            href={`/ponente/dashboard/courses/${taller.id}/alumnos`}
            className="bg-blue-900 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors text-center shadow-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Ver participantes
          </Link>

          <Link
            href={`/courses/${taller.id}`}
            className="border border-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-center flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Detalles públicos
          </Link>
        </div>
      </div>

      {/* Cupos */}
      <div className="bg-blue-50/50 border border-blue-100 px-6 py-4 rounded-lg flex flex-col justify-center items-center min-w-[140px] text-blue-900 shadow-inner mt-4 md:mt-0">
        <p className="text-xs uppercase tracking-wide font-semibold opacity-70 mb-1">Cupos</p>
        <p className="text-3xl font-extrabold tabular-nums tracking-tight">
          {taller.cuposDisponibles ?? 0}<span className="text-lg opacity-50 font-medium">/{taller.cuposTotal ?? 0}</span>
        </p>
      </div>
    </div>
  );
}
