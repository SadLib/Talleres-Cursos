"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { studentsData, workshopsData, type Student } from "@/lib/data";

export default function AlumnosTallerPage({ params }: { params: Promise<{ id: string }> }) {
  // En Next.js 15 los parámetros son una promesa asíncrona por defecto en componentes App Router. 
  // Sin embargo, si es 'use client', requerimos resolver esto mediante use() de React si es necesario, 
  // o podemos pasarlo desde un Layout/Server Component. Aquí usaremos use(params).
  const { id } = use(params);
  
  const tallerId = parseInt(id);
  const taller = workshopsData.find((w) => w.id === tallerId);

  // Estado local para los alumnos de este taller
  const [alumnos, setAlumnos] = useState<Student[]>(
    studentsData.filter((s) => s.workshopId === tallerId)
  );

  const handleToggleAsistencia = (alumnoId: number) => {
    setAlumnos((prev) =>
      prev.map((a) =>
        a.id === alumnoId ? { ...a, asistencia: !a.asistencia } : a
      )
    );
  };

  const handeGlobalCertificate = () => {
    const attendees = alumnos.filter(a => a.asistencia);
    if(attendees.length === 0) {
      alert("No hay participantes con asistencia marcada para enviar certificados.");
      return;
    }
    alert(`Enviando ${attendees.length} certificados globalmente a los participantes que asistieron... (Simulación)`);
  };

  if (!taller) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Taller no encontrado</h2>
        <Link href="/ponente/dashboard" className="text-blue-600 hover:text-blue-800 underline mt-4 inline-block">
          Volver al panel principal
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f2f9ff] min-h-screen p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header y Botón Regresar */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <Link 
              href="/ponente/dashboard" 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 mb-4 transition-colors"
            >
              ← Volver a mis talleres
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900">{taller.nombre}</h1>
            <p className="text-gray-600 mt-1">Participantes y control de asistencia.</p>
          </div>
          
          <button 
            onClick={handeGlobalCertificate}
            className="bg-yellow-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-yellow-700 transition shadow-md whitespace-nowrap"
          >
            🎓 Enviar certificados de asistencia
          </button>
        </div>

        {/* Tabla Lista de Alumnos */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
          {alumnos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase text-gray-500 whitespace-nowrap">
                    <th className="p-5 font-semibold">Participante</th>
                    <th className="p-5 font-semibold">Correo</th>
                    <th className="p-5 font-semibold">No. de Cuenta</th>
                    <th className="p-5 font-semibold">Carrera</th>
                    <th className="p-5 font-semibold">Fecha Inscripción</th>
                    <th className="p-5 font-semibold text-center">Asistencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {alumnos.map((alumno) => (
                    <tr key={alumno.id} className="hover:bg-gray-50/50 transition whitespace-nowrap">
                      
                      {/* Participante (Foto y Nombre) */}
                      <td className="p-5 flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden shadow-sm bg-gray-200 mask mask-circle">
                          <Image
                            src={alumno.image}
                            alt={alumno.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-gray-800">{alumno.name}</span>
                      </td>

                      {/* Correo */}
                      <td className="p-5 text-gray-500 text-sm">
                        {alumno.email}
                      </td>

                      {/* No Cuenta */}
                      <td className="p-5 text-gray-700 font-mono text-sm">
                        {alumno.numeroCuenta}
                      </td>

                      {/* Carrera */}
                      <td className="p-5 text-gray-600 text-sm font-medium">
                        {alumno.carrera || "Ingeniería en Computación"}
                      </td>

                      {/* Fecha Inscripción */}
                      <td className="p-5 text-gray-500 text-sm">
                        {alumno.fechaInscripcion || "01 Abr 2026"}
                      </td>

                      {/* Asistencia (Toggle) */}
                      <td className="p-5">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => handleToggleAsistencia(alumno.id)}
                            className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                              alumno.asistencia ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
                                alumno.asistencia ? "translate-x-7" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-gray-500">
              <p>Aún no hay participantes en este taller.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
