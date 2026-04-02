"use client";

import { useState } from "react";

export function TabCrearTaller() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Taller creado con éxito! (Simulación)");
    setFormData({ 
      nombre: "", descripcion: "", fechaInicio: "", fechaFin: "", 
      horaInicio: "", horaFin: "", ubicacion: "", cuposTotal: "" 
    });
  };

  return (
    <div className="flex justify-center w-full py-6">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear Nuevo Taller</h2>
        <p className="text-gray-500 text-sm mb-6">
          Llena la información requerida para dar de alta un nuevo curso o taller como ponente.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Taller</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
              placeholder="Ej. React Intermedio"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del Curso</label>
            <textarea
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow resize-none"
              placeholder="Escribe un resumen o descripción de lo que se verá en el curso..."
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
              <input
                type="date"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                value={formData.fechaInicio}
                onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
              <input
                type="date"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                value={formData.fechaFin}
                onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Inicio</label>
              <input
                type="time"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                value={formData.horaInicio}
                onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora de Fin</label>
              <input
                type="time"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                value={formData.horaFin}
                onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación / Modalidad</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                placeholder="Ej. 35"
                value={formData.cuposTotal}
                onChange={(e) => setFormData({ ...formData, cuposTotal: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6 flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-900 text-white font-medium px-8 py-2.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
            >
              Crear Taller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
