"use client";

import { useState, useEffect } from "react";
import { actualizarCurso, obtenerCurso, asignarInstructor, quitarInstructor } from "@/lib/api/cursos";
import { listarPonentes } from "@/lib/api/ponentes";
import { ApiError } from "@/lib/api/client";
import type { Curso, CursoDetalle, Modalidad, EstadoCurso, PonenteDetalle } from "@/lib/api/types";

interface EditarCursoModalProps {
  curso: Curso;
  onClose: () => void;
  onSaved: (updated: Curso) => void;
}

const MODALIDADES: { value: Modalidad; label: string }[] = [
  { value: "presencial", label: "Presencial" },
  { value: "en_linea", label: "En Línea" },
  { value: "hibrido", label: "Híbrido" },
];

const ESTADOS: { value: EstadoCurso; label: string }[] = [
  { value: "borrador", label: "Borrador" },
  { value: "pendiente", label: "Pendiente" },
  { value: "aprobado", label: "Aprobado" },
  { value: "concluido", label: "Concluido" },
  { value: "cancelado", label: "Cancelado" },
];

export function EditarCursoModal({ curso, onClose, onSaved }: EditarCursoModalProps) {
  const [detalle, setDetalle] = useState<CursoDetalle | null>(null);
  const [todosLosPonentes, setTodosLosPonentes] = useState<PonenteDetalle[]>([]);
  const [ponentesAsignados, setPonentesAsignados] = useState<PonenteDetalle[]>([]);
  const [ponenteSel, setPonenteSel] = useState("");
  const [asignando, setAsignando] = useState(false);
  const [quitando, setQuitando] = useState<number | null>(null);

  const [form, setForm] = useState({
    nombre: curso.nombre ?? "",
    descripcion: curso.descripcion ?? "",
    detalles: curso.detalles ?? "",
    modalidad: curso.modalidad ?? ("" as Modalidad | ""),
    ubicacion: curso.ubicacion ?? "",
    fecha_inicio: curso.fecha_inicio ?? "",
    fecha_fin: curso.fecha_fin ?? "",
    hora_inicio: curso.hora_inicio ?? "",
    hora_fin: curso.hora_fin ?? "",
    numero_sesiones: curso.numero_sesiones ? String(curso.numero_sesiones) : "",
    cupo_total: String(curso.cupo_total ?? ""),
    estado: curso.estado ?? ("pendiente" as EstadoCurso),
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      obtenerCurso(curso.id),
      listarPonentes(),
    ]).then(([d, todos]) => {
      setDetalle(d);
      setPonentesAsignados(d.ponentes ?? []);
      setTodosLosPonentes(todos);
      setForm((prev) => ({
        ...prev,
        detalles: d.detalles ?? "",
        fecha_inicio: d.fecha_inicio ?? "",
        fecha_fin: d.fecha_fin ?? "",
        hora_inicio: d.hora_inicio ?? "",
        hora_fin: d.hora_fin ?? "",
        numero_sesiones: d.numero_sesiones ? String(d.numero_sesiones) : "",
      }));
    }).catch(() => {});
  }, [curso.id]);

  const handleAgregarPonente = async () => {
    if (!ponenteSel) return;
    const instructorId = parseInt(ponenteSel);
    setAsignando(true);
    try {
      await asignarInstructor(curso.id, instructorId);
      const ponente = todosLosPonentes.find((p) => p.id === instructorId);
      if (ponente) setPonentesAsignados((prev) => [...prev, ponente]);
      setPonenteSel("");
    } catch {
      setError("No se pudo asignar el ponente.");
    } finally {
      setAsignando(false);
    }
  };

  const handleQuitarPonente = async (ponente: PonenteDetalle) => {
    setQuitando(ponente.id);
    try {
      await quitarInstructor(curso.id, ponente.id);
      setPonentesAsignados((prev) => prev.filter((p) => p.id !== ponente.id));
    } catch {
      setError("No se pudo quitar el ponente.");
    } finally {
      setQuitando(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent, publishNow?: boolean) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim() || undefined,
        detalles: form.detalles.trim() || undefined,
        modalidad: (form.modalidad as Modalidad) || undefined,
        ubicacion: form.ubicacion.trim() || undefined,
        fecha_inicio: form.fecha_inicio || undefined,
        fecha_fin: form.fecha_fin || undefined,
        hora_inicio: form.hora_inicio || undefined,
        hora_fin: form.hora_fin || undefined,
        numero_sesiones: form.numero_sesiones ? parseInt(form.numero_sesiones) : undefined,
        cupo_total: parseInt(form.cupo_total) || curso.cupo_total,
        estado: publishNow ? ("aprobado" as EstadoCurso) : (form.estado as EstadoCurso),
      };
      const updated = await actualizarCurso(curso.id, payload);
      onSaved({ ...curso, ...updated });
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("No se pudieron guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  // Ponentes disponibles para agregar (los que aún no están asignados)
  const asignadosIds = new Set(ponentesAsignados.map((p) => p.id));
  const disponibles = todosLosPonentes.filter((p) => !asignadosIds.has(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-1">Editar Curso / Taller</h2>
        <p className="text-sm text-gray-500 mb-5">Revisa y modifica los datos enviados por el ponente.</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        {/* ── PONENTES ASIGNADOS ── */}
        <div className="mb-5 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
          <p className="text-xs font-semibold text-indigo-700 mb-3 uppercase tracking-wide">
            Ponentes Asignados
          </p>

          {ponentesAsignados.length === 0 ? (
            <p className="text-sm text-gray-400 mb-3">Ningún ponente asignado aún.</p>
          ) : (
            <div className="space-y-2 mb-3">
              {ponentesAsignados.map((p) => (
                <div key={p.id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-indigo-100 shadow-sm">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {p.usuario?.nombre} {p.usuario?.primer_apellido}
                    </p>
                    {p.especialidad && (
                      <p className="text-xs text-indigo-600">{p.especialidad}</p>
                    )}
                    <p className="text-xs text-gray-400">{p.usuario?.correo}</p>
                  </div>
                  <button
                    type="button"
                    disabled={quitando === p.id}
                    onClick={() => handleQuitarPonente(p)}
                    className="ml-3 text-red-500 hover:text-red-700 transition-colors cursor-pointer disabled:opacity-40"
                    title="Quitar ponente"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Agregar ponente */}
          {disponibles.length > 0 && (
            <div className="flex gap-2 mt-1">
              <select
                className="flex-1 border border-indigo-200 rounded-lg px-3 py-1.5 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-400"
                value={ponenteSel}
                onChange={(e) => setPonenteSel(e.target.value)}
              >
                <option value="">Agregar ponente...</option>
                {disponibles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.usuario?.nombre} {p.usuario?.primer_apellido}
                    {p.especialidad ? ` — ${p.especialidad}` : ""}
                  </option>
                ))}
              </select>
              <button
                type="button"
                disabled={!ponenteSel || asignando}
                onClick={handleAgregarPonente}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer disabled:opacity-50"
              >
                {asignando ? "..." : "Agregar"}
              </button>
            </div>
          )}
        </div>

        {/* Temario (solo lectura) */}
        {detalle && detalle.temario.length > 0 && (
          <div className="mb-5 p-4 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">Temario</p>
            <ol className="list-decimal list-inside space-y-1">
              {detalle.temario.map((t) => (
                <li key={t.id} className="text-sm text-gray-700">{t.tema}</li>
              ))}
            </ol>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Taller</label>
            <input type="text" required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
              value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900 resize-none"
              value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos / Detalles</label>
            <textarea rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900 resize-none"
              placeholder="Requisitos y consideraciones..."
              value={form.detalles} onChange={(e) => setForm({ ...form, detalles: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
              <input type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.fecha_inicio} onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
              <input type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.fecha_fin} onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Inicio</label>
              <input type="time"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.hora_inicio} onChange={(e) => setForm({ ...form, hora_inicio: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fin</label>
              <input type="time"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.hora_fin} onChange={(e) => setForm({ ...form, hora_fin: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Sesiones</label>
              <input type="number" min="1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.numero_sesiones} onChange={(e) => setForm({ ...form, numero_sesiones: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-900"
                value={form.modalidad} onChange={(e) => setForm({ ...form, modalidad: e.target.value as Modalidad })}
              >
                <option value="">Seleccionar...</option>
                {MODALIDADES.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación / Enlace</label>
              <input type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.ubicacion} onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cupos Máximos</label>
              <input type="number" min="1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.cupo_total} onChange={(e) => setForm({ ...form, cupo_total: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-900"
              value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value as EstadoCurso })}
            >
              {ESTADOS.map((e) => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <div className="flex gap-3">
              <button type="submit" disabled={saving}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 text-sm font-medium transition-colors cursor-pointer disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
              <button type="button" disabled={saving}
                onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
                className="px-6 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-600 text-sm font-bold transition-colors cursor-pointer disabled:opacity-60 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Publicar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
