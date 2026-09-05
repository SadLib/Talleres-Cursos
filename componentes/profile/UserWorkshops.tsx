"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { misInscripciones, cancelarInscripcion } from "@/lib/api/inscripciones";
import { cursoToWorkshop } from "@/lib/api/adapters";
import { ApiError } from "@/lib/api/client";
import type { InscripcionDetalle } from "@/lib/api/types";
import type { Workshop } from "@/lib/data";

type InscripcionConTaller = InscripcionDetalle & { workshop: Workshop };

export default function UserWorkshops() {
  const [inscripciones, setInscripciones] = useState<InscripcionConTaller[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    misInscripciones()
      .then((data) =>
        setInscripciones(
          data.map((i) => ({ ...i, workshop: cursoToWorkshop(i.taller) }))
        )
      )
      .catch(() => setError("No se pudieron cargar tus talleres."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCancel = async (inscripcionId: number) => {
    setCancelling(inscripcionId);
    setError(null);
    try {
      await cancelarInscripcion(inscripcionId);
      setInscripciones((prev) => prev.filter((i) => i.id !== inscripcionId));
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("No se pudo cancelar la inscripción.");
      }
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 border border-gray-100 relative max-w-6xl mx-auto">
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Mis Talleres y Cursos</h2>
        <p className="text-gray-500 text-sm mt-1">
          Aquí encuentras los talleres en los que estás inscrito.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : inscripciones.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">Aún no estás inscrito en ningún taller.</p>
          <Link href="/courses" className="bg-blue-900 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-800 transition">
            Ver talleres disponibles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inscripciones.map((inscripcion) => {
            const w = inscripcion.workshop;
            const activa = inscripcion.estado === "activa";
            return (
              <div key={inscripcion.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden flex flex-col w-full h-full mx-auto">
                <div className="relative w-full aspect-[4/3] bg-gray-200 shrink-0">
                  <Image src={w.image} alt={w.nombre} fill className="object-cover" />
                </div>

                <div className="p-5 flex flex-col flex-grow text-left">
                  <h3 className="font-bold text-lg mb-3 text-gray-800 leading-tight">{w.nombre}</h3>

                  <div className="mb-auto">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 font-medium">{w.ponenteStr}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z" />
                        </svg>
                        <span>{w.fecha}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{w.ubicacion}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${activa ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-500"}`}>
                      {activa ? "Inscrito" : "Cancelado"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/courses/${inscripcion.taller_id}`}
                      className="bg-blue-900 border border-transparent text-white font-medium py-2 rounded-md hover:bg-blue-800 transition w-full text-center"
                    >
                      Ver detalles
                    </Link>
                    {activa && (
                      <button
                        onClick={() => handleCancel(inscripcion.id)}
                        disabled={cancelling === inscripcion.id}
                        className="bg-white border border-red-500 text-red-600 font-medium py-2 rounded-md hover:bg-red-50 transition w-full text-center flex items-center justify-center gap-2 disabled:opacity-60"
                      >
                        {cancelling === inscripcion.id ? (
                          "Cancelando..."
                        ) : (
                          <>
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Cancelar inscripción
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
