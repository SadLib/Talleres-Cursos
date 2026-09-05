"use client";

import { useState, useEffect } from "react";
import { listarPonentes, actualizarPonente, eliminarPonente } from "@/lib/api/ponentes";
import { ApiError } from "@/lib/api/client";
import type { PonenteDetalle } from "@/lib/api/types";
import Image from "next/image";

const AFILIACION_LABEL: Record<string, string> = {
  interno: "Interno",
  externo: "Externo",
  estudiante: "Estudiante",
  profesor: "Profesor",
};

const AFILIACION_BADGE: Record<string, string> = {
  interno: "bg-blue-100 text-blue-800 border-blue-200",
  externo: "bg-violet-100 text-violet-800 border-violet-200",
  estudiante: "bg-emerald-100 text-emerald-800 border-emerald-200",
  profesor: "bg-amber-100 text-amber-800 border-amber-200",
};

type EditForm = {
  afiliacion: string;
  institucion: string;
  especialidad: string;
  biografia: string;
};

function EditarPonenteModal({
  ponente,
  onClose,
  onSaved,
}: {
  ponente: PonenteDetalle;
  onClose: () => void;
  onSaved: (updated: PonenteDetalle) => void;
}) {
  const [form, setForm] = useState<EditForm>({
    afiliacion: ponente.afiliacion ?? "",
    institucion: ponente.institucion ?? "",
    especialidad: ponente.especialidad ?? "",
    biografia: ponente.biografia ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await actualizarPonente(ponente.id, {
        afiliacion: (form.afiliacion as "interno" | "externo" | "estudiante" | "profesor") || undefined,
        institucion: form.institucion || undefined,
        especialidad: form.especialidad || undefined,
        biografia: form.biografia || undefined,
      });
      onSaved({ ...ponente, ...updated });
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("No se pudieron guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-1">Editar Perfil de Ponente</h2>
        <p className="text-sm text-gray-500 mb-5">
          {ponente.usuario?.nombre} {ponente.usuario?.primer_apellido}
        </p>

        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Afiliación</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-900"
              value={form.afiliacion}
              onChange={(e) => setForm({ ...form, afiliacion: e.target.value })}
            >
              <option value="">Sin afiliación</option>
              <option value="interno">Interno</option>
              <option value="externo">Externo</option>
              <option value="estudiante">Estudiante</option>
              <option value="profesor">Profesor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institución</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Ej. UNAM, ITESM..."
              value={form.institucion}
              onChange={(e) => setForm({ ...form, institucion: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Ej. Desarrollo Web, Ciencia de Datos..."
              value={form.especialidad}
              onChange={(e) => setForm({ ...form, especialidad: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900 resize-none"
              placeholder="Breve descripción del ponente..."
              value={form.biografia}
              onChange={(e) => setForm({ ...form, biografia: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium cursor-pointer">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 text-sm font-medium cursor-pointer disabled:opacity-60">
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function TabGestionPonentes() {
  const [ponentes, setPonentes] = useState<PonenteDetalle[]>([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<PonenteDetalle | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<PonenteDetalle | null>(null);
  const [expandido, setExpandido] = useState<number | null>(null);

  useEffect(() => {
    listarPonentes()
      .then(setPonentes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (ponente: PonenteDetalle) => {
    try {
      await eliminarPonente(ponente.id);
      setPonentes((prev) => prev.filter((p) => p.id !== ponente.id));
    } catch {
      alert("Error al eliminar el ponente.");
    } finally {
      setConfirmDelete(null);
    }
  };

  const filtrados = ponentes.filter((p) => {
    const term = filtro.toLowerCase();
    const nombre = `${p.usuario?.nombre ?? ""} ${p.usuario?.primer_apellido ?? ""}`.toLowerCase();
    return nombre.includes(term) || p.especialidad?.toLowerCase().includes(term);
  });

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Gestión de Ponentes</h2>
            <p className="text-sm text-gray-500 mt-0.5">Instructores registrados en la plataforma.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text" placeholder="Buscar por nombre, especialidad..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
              value={filtro} onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="font-medium">No se encontraron ponentes</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtrados.map((ponente) => {
            const usuario = ponente.usuario;
            const isExpanded = expandido === ponente.id;
            return (
              <div key={ponente.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 transition hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={usuario?.foto_url || "/images/user.jpg"}
                      alt={usuario?.nombre ?? "Ponente"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-gray-800 leading-tight">
                          {usuario?.nombre} {usuario?.primer_apellido} {usuario?.segundo_apellido ?? ""}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{usuario?.correo}</p>
                      </div>
                      {ponente.afiliacion && (
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium flex-shrink-0 ${AFILIACION_BADGE[ponente.afiliacion] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                          {AFILIACION_LABEL[ponente.afiliacion] ?? ponente.afiliacion}
                        </span>
                      )}
                    </div>

                    {ponente.especialidad && (
                      <p className="text-sm text-blue-700 font-medium mt-1">{ponente.especialidad}</p>
                    )}

                    {isExpanded && ponente.biografia && (
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{ponente.biografia}</p>
                    )}

                    {ponente.institucion && (
                      <p className="text-xs text-gray-500 mt-1">🏫 {ponente.institucion}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <button
                    onClick={() => setExpandido(isExpanded ? null : ponente.id)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
                  >
                    {isExpanded ? "Ver menos" : "Ver más info"}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditando(ponente)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => setConfirmDelete(ponente)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editando && (
        <EditarPonenteModal
          ponente={editando}
          onClose={() => setEditando(null)}
          onSaved={(updated) => {
            setPonentes((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
            setEditando(null);
          }}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Eliminar ponente</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              ¿Eliminar el perfil de ponente de <strong>{confirmDelete.usuario?.nombre} {confirmDelete.usuario?.primer_apellido}</strong>? Solo se elimina el perfil de instructor, no la cuenta de usuario.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium cursor-pointer">Cancelar</button>
              <button onClick={() => handleDelete(confirmDelete)} className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium cursor-pointer">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
