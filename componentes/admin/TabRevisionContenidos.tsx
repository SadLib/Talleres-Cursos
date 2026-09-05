"use client";

import { useState, useEffect } from "react";
import { listarCursos, actualizarCurso } from "@/lib/api/cursos";
import { EditarCursoModal } from "./EditarCursoModal";
import type { Curso } from "@/lib/api/types";

export function TabRevisionContenidos() {
  const [pendientes, setPendientes] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Curso | null>(null);
  const [procesando, setProcesando] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);

  const cargar = () => {
    setLoading(true);
    listarCursos({ estado: "pendiente", limit: 200 })
      .then(setPendientes)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, []);

  const mostrarMensaje = (tipo: "ok" | "error", texto: string) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), 4000);
  };

  const cambiarEstado = async (curso: Curso, estado: "aprobado" | "cancelado") => {
    setProcesando(curso.id);
    try {
      await actualizarCurso(curso.id, { estado });
      setPendientes((prev) => prev.filter((c) => c.id !== curso.id));
      mostrarMensaje("ok", estado === "aprobado" ? `"${curso.nombre}" ha sido aprobado y publicado.` : `"${curso.nombre}" fue rechazado.`);
    } catch {
      mostrarMensaje("error", "Ocurrió un error al actualizar el curso.");
    } finally {
      setProcesando(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Revisión de Contenidos</h2>
            <p className="text-sm text-gray-500">Cursos enviados por instructores para aprobación.</p>
          </div>
          {pendientes.length > 0 && (
            <span className="ml-auto bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
              {pendientes.length} por revisar
            </span>
          )}
        </div>
      </div>

      {/* Mensaje global */}
      {mensaje && (
        <div className={`p-4 rounded-xl border text-sm font-medium flex items-center gap-3 ${mensaje.tipo === "ok" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700"}`}>
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mensaje.tipo === "ok"
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            }
          </svg>
          {mensaje.texto}
        </div>
      )}

      {pendientes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl mx-auto flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">Todo al día</h3>
          <p className="text-gray-500 text-sm">No hay propuestas de cursos pendientes de revisión.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendientes.map((curso) => (
            <div key={curso.id} className="bg-white rounded-xl shadow-sm border border-amber-100 p-6 transition hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-gray-800">{curso.nombre}</h3>
                    <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                      Pendiente de revisión
                    </span>
                  </div>

                  {curso.descripcion && (
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">{curso.descripcion}</p>
                  )}

                  {curso.detalles && (
                    <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-100">
                      <p className="text-xs font-semibold text-amber-700 mb-0.5">Requisitos</p>
                      <p className="text-xs text-gray-600 line-clamp-2">{curso.detalles}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {curso.ubicacion ?? "Sin ubicación"}
                    </span>
                    <span className="flex items-center gap-1.5 capitalize">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {curso.modalidad?.replace("_", " ") ?? "Sin modalidad"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {curso.cupo_total} cupos
                    </span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-row md:flex-col gap-2 flex-shrink-0 mt-2 md:mt-0">
                  <button
                    onClick={() => setEditando(curso)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Editar
                  </button>
                  <button
                    onClick={() => cambiarEstado(curso, "aprobado")}
                    disabled={procesando === curso.id}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 text-sm font-bold transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Publicar
                  </button>
                  <button
                    onClick={() => cambiarEstado(curso, "cancelado")}
                    disabled={procesando === curso.id}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal editar desde revisión */}
      {editando && (
        <EditarCursoModal
          curso={editando}
          onClose={() => setEditando(null)}
          onSaved={(updated) => {
            if (updated.estado !== "pendiente") {
              setPendientes((prev) => prev.filter((c) => c.id !== updated.id));
              mostrarMensaje("ok", `"${updated.nombre}" fue actualizado y ${updated.estado === "aprobado" ? "publicado" : "guardado"}.`);
            } else {
              setPendientes((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            }
            setEditando(null);
          }}
        />
      )}
    </div>
  );
}
