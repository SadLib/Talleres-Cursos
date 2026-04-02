import Link from "next/link";
import { type Workshop } from "@/lib/data";

export function WorkshopCardPonente({ taller }: { taller: Workshop }) {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row gap-6 items-center md:items-stretch transition hover:shadow-md">
      
      {/* Imagen */}
      <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg flex-shrink-0" />

      {/* Info */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="font-bold text-xl text-gray-800 mb-1">{taller.nombre}</h3>
        <p className="text-sm text-gray-500 mb-0.5">🗓️ {taller.fecha} | ⏱️ {taller.duracion}</p>
        <p className="text-sm text-gray-500 mb-4">📍 {taller.ubicacion}</p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <Link 
            href={`/dashboard/ponente/courses/${taller.id}/alumnos`}
            className="bg-blue-900 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors text-center shadow-sm"
          >
            📋 Ver alumnos
          </Link>

          <Link
            href={`/courses/${taller.id}`}
            className="border border-gray-300 text-gray-700 font-medium px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            🔍 Ver detalles públicos
          </Link>
        </div>
      </div>

      {/* Cupos */}
      <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg flex flex-col justify-center items-center min-w-[120px] text-blue-900 shadow-inner my-4 md:my-0">
        <p className="text-xs uppercase tracking-wide font-semibold opacity-70 mb-1">Cupos</p>
        <p className="text-2xl font-extrabold tabular-nums">
          {taller.cuposDisponibles ?? 0}<span className="text-lg opacity-50 font-medium">/{taller.cuposTotal ?? 0}</span>
        </p>
      </div>

      {/* Acciones */}
      <div className="flex flex-row md:flex-col gap-2 justify-center w-full md:w-auto">
        <button className="bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-yellow-700 transition w-full shadow-sm text-sm">
          ✏️ Editar
        </button>

        <button className="border border-red-200 text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-red-50 hover:border-red-300 transition w-full text-sm">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}
