"use client";

import { useState } from "react";
import { crearCurso, agregarTema } from "@/lib/api/cursos";
import { ApiError } from "@/lib/api/client";

export function TabCrearTaller() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    numeroSesiones: "",
    ubicacion: "",
    modalidad: "",
    cuposTotal: "",
    temario: "",
    requisitos: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const taller = await crearCurso({
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        detalles: formData.requisitos || undefined,
        modalidad: formData.modalidad as "presencial" | "en_linea" | "hibrido" | undefined,
        ubicacion: formData.ubicacion,
        fecha_inicio: formData.fechaInicio || undefined,
        fecha_fin: formData.fechaFin || undefined,
        hora_inicio: formData.horaInicio || undefined,
        hora_fin: formData.horaFin || undefined,
        numero_sesiones: formData.numeroSesiones ? parseInt(formData.numeroSesiones) : undefined,
        cupo_total: parseInt(formData.cuposTotal),
        estado: "pendiente",
      });

      // Guardar cada línea del temario como un tema individual
      if (formData.temario.trim()) {
        const temas = formData.temario
          .split("\n")
          .map((t) => t.trim())
          .filter(Boolean);
        for (let i = 0; i < temas.length; i++) {
          await agregarTema(taller.id, { orden: i + 1, tema: temas[i] });
        }
      }

      setSuccess(true);
      setFormData({
        nombre: "", descripcion: "", fechaInicio: "", fechaFin: "",
        horaInicio: "", horaFin: "", numeroSesiones: "", ubicacion: "",
        modalidad: "", cuposTotal: "", temario: "", requisitos: "",
      });
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Ocurrió un error al enviar la propuesta.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center w-full py-6">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear Nuevo Taller</h2>
        <p className="text-gray-500 text-sm mb-6">
          Llena la información requerida para dar de alta un nuevo curso o taller como ponente.
        </p>

        {success && (
          <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ¡Propuesta enviada! Un administrador revisará la información.
          </div>
        )}

        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Taller</label>
            <input
              type="text" required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
              placeholder="Ej. React Intermedio"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del Curso</label>
            <textarea
              required rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow resize-none"
              placeholder="Escribe un resumen o descripción de lo que se verá en el curso..."
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            />
          </div>

          {/* Fechas y horas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                value={formData.fechaInicio}
                onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                value={formData.fechaFin}
                onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Inicio</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                value={formData.horaInicio}
                onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fin</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                value={formData.horaFin}
                onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. de Sesiones</label>
              <input
                type="number" min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                placeholder="Ej. 8"
                value={formData.numeroSesiones}
                onChange={(e) => setFormData({ ...formData, numeroSesiones: e.target.value })}
              />
            </div>
          </div>

          {/* Ubicación, Modalidad, Cupos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación / Enlace</label>
              <input
                type="text" required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                placeholder="Ej. Aula 5 o Teams"
                value={formData.ubicacion}
                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
              <select
                required
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                value={formData.modalidad}
                onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
              >
                <option value="" disabled>Seleccionar...</option>
                <option value="presencial">Presencial</option>
                <option value="en_linea">En Línea</option>
                <option value="hibrido">Híbrida</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cupos Máximos</label>
              <input
                type="number" required min="1"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                placeholder="Ej. 35"
                value={formData.cuposTotal}
                onChange={(e) => setFormData({ ...formData, cuposTotal: e.target.value })}
              />
            </div>
          </div>

          {/* Temario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temario</label>
            <textarea
              required rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow resize-none"
              placeholder="Escribe un tema por línea:&#10;1. Introducción a React&#10;2. Hooks básicos&#10;3. Estado y efectos"
              value={formData.temario}
              onChange={(e) => setFormData({ ...formData, temario: e.target.value })}
            />
            <p className="text-xs text-gray-400 mt-1">Escribe un tema por línea. Se guardarán como ítems individuales.</p>
          </div>

          {/* Requisitos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos y Consideraciones</label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow resize-none"
              placeholder="Ej. Conocimientos previos requeridos, material a llevar..."
              value={formData.requisitos}
              onChange={(e) => setFormData({ ...formData, requisitos: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 italic flex-1">
              * Nota: Al enviar la propuesta, un administrador revisará y aceptará los cambios.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto bg-blue-900 text-white font-medium px-8 py-2.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar para Confirmación"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
