"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const myWorkshops = [
  {
    id: 1,
    nombre: "React Básico",
    ponenteStr: "Juan Pérez",
    specialty: "IA y Machine Learning",
    fecha: "10 Marzo",
    duracion: "2 horas",
    ubicacion: "Online",
    inscrito: true,
    asistencia: true,
    concluido: true,
  },
  {
    id: 2,
    nombre: "Next.js Avanzado",
    ponenteStr: "Ana López",
    specialty: "Big Data",
    fecha: "12 Marzo",
    duracion: "3 horas",
    ubicacion: "Aula 3",
    inscrito: true,
    asistencia: false,
    concluido: true,
  },
  {
    id: 4,
    nombre: "Algoritmos",
    ponenteStr: "Luis Torres",
    specialty: "Optimización",
    fecha: "18 Mayo",
    duracion: "4 horas",
    ubicacion: "Lab 2",
    inscrito: true,
    asistencia: false,
    concluido: false,
  },
];

export default function UserWorkshops() {
  const [workshops] = useState(myWorkshops);

  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 border border-gray-100 relative max-w-6xl mx-auto">
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Mis Talleres y Cursos</h2>
        <p className="text-gray-500 text-sm mt-1">
          Aquí encuentras los talleres y cursos en los que estás inscrito y tu estatus.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <div key={workshop.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden flex flex-col w-full h-full mx-auto">
            {/* Imagen 4:3 */}
            <div className="relative w-full aspect-[4/3] bg-gray-200 shrink-0">
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
                <div className="mb-4">
                  <p className="font-semibold text-gray-800">{workshop.ponenteStr}</p>
                  <p className="text-sm text-gray-500 font-medium">{workshop.specialty}</p>
                </div>

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
                <Link
                  href={`/courses/${workshop.id}`}
                  className="bg-blue-900 border border-transparent text-white font-medium py-2 rounded-md hover:bg-blue-800 transition w-full text-center"
                >
                  Ver detalles
                </Link>

                {workshop.asistencia && (
                  <div className="bg-green-100 text-green-800 font-semibold py-2 rounded-md transition w-full text-center flex items-center justify-center gap-2 border border-green-200 mt-1 cursor-default">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Completado
                  </div>
                )}

                {!workshop.concluido && !workshop.asistencia && workshop.inscrito && (
                  <button className="bg-white border border-red-500 text-red-600 font-medium py-2 rounded-md hover:bg-red-50 transition w-full text-center flex items-center justify-center gap-2 mt-1">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Cancelar inscripción
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
