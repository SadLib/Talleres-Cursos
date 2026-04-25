"use client";
import { useState } from "react";
import Link from "next/link";
import { type Workshop } from "@/lib/data";

export function ActionBox({ workshop }: { workshop: Workshop }) {
  const [status, setStatus] = useState<"not_enrolled" | "enrolled" | "concluded">(
    workshop.concluido ? "concluded" : "not_enrolled"
  );

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-fit sticky top-6">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Datos Generales</h3>
        
        <div className="space-y-4 mb-8 flex-grow">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 text-sm">Fecha</span>
            <span className="font-semibold text-gray-800 text-right">{workshop.fecha}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 text-sm">Horario</span>
            <span className="font-semibold text-gray-800 text-right">{workshop.horario || "Por definir"}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 text-sm">Duración</span>
            <span className="font-semibold text-gray-800 text-right">{workshop.duracion}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <span className="text-gray-500 text-sm">Ubicación</span>
            <span className="font-semibold text-gray-800 text-right">{workshop.ubicacion}</span>
          </div>
          {workshop.modalidad && (
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500 text-sm">Modalidad</span>
              <span className="font-semibold text-gray-800 text-right">{workshop.modalidad}</span>
            </div>
          )}
        </div>

        <div className="mt-auto">
          {status === "concluded" && (
            <div className="bg-gray-100 text-gray-500 px-6 py-3.5 rounded-lg text-center font-semibold w-full border border-gray-200">
              Taller Concluido
            </div>
          )}
          
          {status === "not_enrolled" && (
            <Link 
              href={`/courses/${workshop.id}/enroll`}
              className="bg-blue-900 text-white px-6 py-3.5 rounded-lg hover:bg-blue-800 transition w-full font-bold shadow-md text-center block"
            >
              Inscribirse al Taller
            </Link>
          )}

          {status === "enrolled" && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center text-sm font-medium shadow-sm">
                ✨ ¡Estás inscrito en este taller!
              </div>
              <button 
                onClick={() => setStatus("not_enrolled")}
                className="bg-white text-red-600 border border-red-200 px-6 py-3.5 rounded-lg hover:bg-red-50 transition w-full font-semibold shadow-sm cursor-pointer"
              >
                Cancelar Inscripción
              </button>
            </div>
          )}
        </div>
      </div>


    </>
  );
}
