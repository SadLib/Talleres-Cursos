"use client";

import { useState } from "react";

export function TabCrearTaller() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    duracion: "",
    ubicacion: "",
    modalidad: "",
    cuposTotal: "",
    temario: "",
    requisitos: "",
  });

  const [coPonentes, setCoPonentes] = useState<{nombre: string, correo: string}[]>([
    { nombre: "", correo: "" }
  ]);

  const handleCoPonenteChange = (index: number, field: "nombre" | "correo", value: string) => {
    setCoPonentes((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addCoPonente = () => setCoPonentes([...coPonentes, { nombre: "", correo: "" }]);
  const removeCoPonente = (index: number) => setCoPonentes((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Propuesta enviada! Un administrador revisará la información.");
    setFormData({ 
      nombre: "", descripcion: "", duracion: "", ubicacion: "", modalidad: "", cuposTotal: "", temario: "", requisitos: "" 
    });
    setCoPonentes([{ nombre: "", correo: "" }]);
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
            <input
              type="text"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
              placeholder="Ej. 1 día, 3 semanas, 5 meses..."
              value={formData.duracion}
              onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación / Enlace</label>
              <input
                type="text"
                required
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
                <option value="hibrida">Híbrida</option>
              </select>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temario</label>
            <textarea
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow resize-none"
              placeholder="Escribe el temario separado por líneas o detallando los temas a tratar..."
              value={formData.temario}
              onChange={(e) => setFormData({ ...formData, temario: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos y Consideraciones</label>
            <textarea
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow resize-none"
              placeholder="Ej. Conocimientos previos requeridos, material a llevar, consideraciones especiales..."
              value={formData.requisitos}
              onChange={(e) => setFormData({ ...formData, requisitos: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-2 mt-4">
            <h3 className="text-[15px] font-semibold text-gray-800 mb-1">Ponentes Adicionales</h3>
            <p className="text-sm text-gray-500 mb-4">Añade a otros ponentes invitados mediante su nombre y correo.</p>
            
            {coPonentes.map((co, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 mb-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                    placeholder="Nombre del ponente"
                    value={co.nombre}
                    onChange={(e) => handleCoPonenteChange(index, "nombre", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 transition-shadow"
                    placeholder="correo@ejemplo.com"
                    value={co.correo}
                    onChange={(e) => handleCoPonenteChange(index, "correo", e.target.value)}
                  />
                </div>
                {coPonentes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCoPonente(index)}
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors h-[42px] font-medium"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCoPonente}
              className="text-blue-700 hover:text-blue-800 font-medium text-sm flex items-center gap-1 mt-2"
            >
              + Agregar otro ponente
            </button>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 italic flex-1">
              * Nota: Al enviar la propuesta, un administrador revisará y aceptará los cambios.
            </p>
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-900 text-white font-medium px-8 py-2.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Enviar para Confirmación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
