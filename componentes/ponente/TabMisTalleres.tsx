"use client";

import { workshopsData } from "@/lib/data";
import { WorkshopCardPonente } from "./WorkshopCardPonente";

export function TabMisTalleres() {
  // Simulando que el usuario logueado es el Ponente con ID 1 (Juan Pérez)
  const misTalleres = workshopsData.filter((w) => w.ponenteId === 1);

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mis talleres asignados</h2>
          <p className="text-gray-500 text-sm mt-1">
            Administra los cursos que impartes actualmente.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {misTalleres.length > 0 ? (
          misTalleres.map((taller) => (
            <WorkshopCardPonente key={taller.id} taller={taller} />
          ))
        ) : (
          <p className="text-gray-500">Aún no tienes talleres asignados.</p>
        )}
      </div>
    </div>
  );
}
