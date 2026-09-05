"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch, ApiError } from "@/lib/api/client";

type TallerPayload = {
  nombre: string;
  descripcion?: string;
  ubicacion?: string;
  cupo_total: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  hora_inicio?: string;
  hora_fin?: string;
  modalidad?: string;
  estado?: string;
};

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    ubicacion: "",
    modalidad: "",
    cuposTotal: "",
    estado: "",
  });

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
    fetch(`${API}/talleres/${id}`, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setFormData({
          nombre: data.nombre ?? "",
          descripcion: data.descripcion ?? "",
          fechaInicio: data.fecha_inicio ?? "",
          fechaFin: data.fecha_fin ?? "",
          horaInicio: data.hora_inicio ? data.hora_inicio.substring(0, 5) : "",
          horaFin: data.hora_fin ? data.hora_fin.substring(0, 5) : "",
          ubicacion: data.ubicacion ?? "",
          modalidad: data.modalidad ?? "",
          cuposTotal: String(data.cupo_total ?? ""),
          estado: data.estado ?? "",
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload: TallerPayload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion || undefined,
        ubicacion: formData.ubicacion || undefined,
        cupo_total: parseInt(formData.cuposTotal),
        fecha_inicio: formData.fechaInicio || undefined,
        fecha_fin: formData.fechaFin || undefined,
        hora_inicio: formData.horaInicio || undefined,
        hora_fin: formData.horaFin || undefined,
        modalidad: formData.modalidad || undefined,
        estado: formData.estado || undefined,
      };
      await apiFetch(`/talleres/${id}`, { method: "PUT", body: payload });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        router.push("/ponente/dashboard");
      }, 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("No se pudieron guardar los cambios.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f9ff]">
        <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f9ff]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Taller no encontrado</h1>
          <p className="text-gray-500 mb-6">El taller que buscas no existe o fue eliminado.</p>
          <Link href="/ponente/dashboard" className="bg-blue-900 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-colors">
            Volver al panel
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f9ff]">
      <div className="bg-[#00287f] text-white px-6 sm:px-10 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/ponente/dashboard"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm font-medium mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al panel
          </Link>
          <h1 className="text-3xl font-bold mb-1">Editar Taller</h1>
          <p className="text-blue-100 text-lg">{formData.nombre}</p>
        </div>
      </div>

      <div className="flex justify-center w-full px-6 py-10">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 w-full max-w-2xl">
          {saved && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cambios guardados. Redirigiendo...
            </div>
          )}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Taller</label>
              <input
                type="text" required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all resize-none"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.fechaInicio} onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.fechaFin} onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Inicio</label>
                <input type="time" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.horaInicio} onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Fin</label>
                <input type="time" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.horaFin} onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  placeholder="Aula 5 o Teams" value={formData.ubicacion} onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
                <select className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.modalidad} onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}>
                  <option value="">Sin definir</option>
                  <option value="presencial">Presencial</option>
                  <option value="en_linea">En Línea</option>
                  <option value="hibrido">Híbrida</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cupos Máximos</label>
                <input type="number" required min="1" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.cuposTotal} onChange={(e) => setFormData({ ...formData, cuposTotal: e.target.value })} />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/ponente/dashboard")}
                className="w-full sm:w-auto border border-gray-300 text-gray-600 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer order-2 sm:order-1"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving || saved}
                className="w-full sm:w-auto bg-blue-900 text-white font-medium px-8 py-2.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 order-1 sm:order-2 disabled:opacity-60"
              >
                {saving ? "Guardando..." : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
