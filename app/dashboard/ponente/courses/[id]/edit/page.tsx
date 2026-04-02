"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { workshopsData } from "@/lib/data";

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const workshop = workshopsData.find((w) => w.id === id);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    ubicacion: "",
    cuposTotal: "",
  });

  const [saved, setSaved] = useState(false);

  // Pre-llenar con datos del taller
  useEffect(() => {
    if (workshop) {
      setFormData({
        nombre: workshop.nombre,
        descripcion: `Taller de ${workshop.nombre} impartido para los estudiantes del MAC. Contenido teórico-práctico enfocado en desarrollar competencias clave en el área.`,
        fechaInicio: "",
        fechaFin: "",
        horaInicio: "",
        horaFin: "",
        ubicacion: workshop.ubicacion,
        cuposTotal: workshop.cuposTotal?.toString() || "30",
      });
    }
  }, [workshop]);

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f9ff]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Taller no encontrado</h1>
          <p className="text-gray-500 mb-6">El taller que buscas no existe o fue eliminado.</p>
          <Link
            href="/dashboard/ponente"
            className="bg-blue-900 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Volver al panel
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f2f9ff]">

      {/* Header */}
      <div className="bg-[#00287f] text-white px-6 sm:px-10 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400 to-transparent pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/dashboard/ponente"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm font-medium mb-4"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al panel
          </Link>
          <h1 className="text-3xl font-bold mb-1">Editar Taller</h1>
          <p className="text-blue-100 text-lg">{workshop.nombre}</p>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex justify-center w-full px-6 py-10">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 w-full max-w-2xl animate-[fadeInUp_0.3s_ease-out_both]">

          {/* Mensaje de éxito */}
          {saved && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 animate-[fadeInUp_0.2s_ease-out_both]">
              <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Cambios guardados exitosamente.</span>
            </div>
          )}

          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Editar información</h2>
              <p className="text-gray-500 text-sm">
                Modifica los datos del taller. Los cambios se reflejarán en el catálogo público.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 my-6"></div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Taller</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                placeholder="Ej. React Intermedio"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del Curso</label>
              <textarea
                required
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all resize-none"
                placeholder="Escribe un resumen o descripción de lo que se verá en el curso..."
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              ></textarea>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
                <input
                  type="date"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.fechaInicio}
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
                <input
                  type="date"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.fechaFin}
                  onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                />
              </div>
            </div>

            {/* Horas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Inicio</label>
                <input
                  type="time"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.horaInicio}
                  onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Fin</label>
                <input
                  type="time"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  value={formData.horaFin}
                  onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                />
              </div>
            </div>

            {/* Ubicación y Cupos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación / Modalidad</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  placeholder="Ej. Aula 5 o Microsoft Teams"
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cupos Máximos</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  placeholder="Ej. 35"
                  value={formData.cuposTotal}
                  onChange={(e) => setFormData({ ...formData, cuposTotal: e.target.value })}
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="pt-4 border-t border-gray-100 mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/dashboard/ponente")}
                className="w-full sm:w-auto border border-gray-300 text-gray-600 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer order-2 sm:order-1"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-900 text-white font-medium px-8 py-2.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 order-1 sm:order-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}