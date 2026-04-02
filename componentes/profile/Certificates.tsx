"use client";

import Image from "next/image";

const completedWorkshops = [
  {
    id: 1,
    nombre: "React Básico",
    ponenteStr: "Juan Pérez",
    specialty: "IA y Machine Learning",
    fecha: "10 Marzo",
    duracion: "2 horas",
    ubicacion: "Online",
  }
];

export default function Certificates() {
  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 border border-gray-100 relative max-w-6xl mx-auto">
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Mis Certificados</h2>
        <p className="text-gray-500 text-sm mt-1">
          Descarga los certificados oficiales de los talleres que has completado.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedWorkshops.map((workshop) => (
          <div key={workshop.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden flex flex-col w-full h-full mx-auto relative group">
            {/* Pequeña decoración superior tipo certificado */}
            <div className="h-2 w-full bg-yellow-500 absolute top-0 left-0 z-10"></div>
            
            {/* Imagen 4:3 */}
            <div className="relative w-full aspect-[4/3] bg-gray-200 shrink-0">
               <Image 
                 src="/images/hero.jpg" 
                 alt={workshop.nombre} 
                 fill 
                 className="object-cover opacity-90 group-hover:opacity-100 transition"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
               <div className="absolute bottom-4 left-4 right-4 text-white">
                 <p className="text-xs font-semibold tracking-wider uppercase text-yellow-400 mb-1">Certificado Oficial</p>
                 <h3 className="font-bold text-lg leading-tight shadow-sm">{workshop.nombre}</h3>
               </div>
            </div>

            <div className="p-5 flex flex-col flex-grow text-left">
              <div className="mb-auto mt-2">
                <div className="mb-4">
                  <p className="font-semibold text-gray-800">{workshop.ponenteStr}</p>
                  <p className="text-sm text-gray-500 font-medium">{workshop.specialty}</p>
                </div>

                <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z" />
                    </svg>
                    <span>Impartido el {workshop.fecha}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Duración: {workshop.duracion}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <button className="bg-yellow-600 text-white font-medium py-2.5 rounded-md hover:bg-yellow-700 transition w-full flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar certificado
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
