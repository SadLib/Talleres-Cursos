"use client";

import { useState, useEffect } from "react";
import { WorkshopCardPonente } from "./WorkshopCardPonente";
import { obtenerMiPerfilPonente } from "@/lib/api/ponentes";
import { listarCursos } from "@/lib/api/cursos";
import { cursoToWorkshop } from "@/lib/api/adapters";
import type { Workshop } from "@/lib/data";

export function TabMisTalleres() {
  const [talleres, setTalleres] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    obtenerMiPerfilPonente()
      .then((instructor) => listarCursos({ instructor_id: instructor.id }))
      .then((cursos) => setTalleres(cursos.map(cursoToWorkshop)))
      .catch(() => setError("No se pudieron cargar tus talleres."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex justify-center py-20">
        <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

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

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {talleres.length > 0 ? (
          talleres.map((taller) => (
            <WorkshopCardPonente key={taller.id} taller={taller} />
          ))
        ) : (
          <p className="text-gray-500">Aún no tienes talleres asignados.</p>
        )}
      </div>
    </div>
  );
}
