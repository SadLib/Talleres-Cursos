"use client";

import { useState } from "react";

type CoPonente = {
  nombre: string;
  correo: string;
};

export default function CreateWorkshop() {
  const [titulo, setTitulo] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [horario, setHorario] = useState("");
  const [duracion, setDuracion] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [temario, setTemario] = useState("");

  const [coPonentes, setCoPonentes] = useState<CoPonente[]>([
    { nombre: "", correo: "" },
  ]);

  // ✅ Manejo correcto tipado
  const handleCoPonenteChange = (
    index: number,
    field: keyof CoPonente,
    value: string
  ) => {
    setCoPonentes((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addCoPonente = () => {
    setCoPonentes([...coPonentes, { nombre: "", correo: "" }]);
  };

  const removeCoPonente = (index: number) => {
    setCoPonentes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const data = {
      titulo,
      capacidad,
      fechaInicio,
      horario,
      duracion,
      modalidad,
      ubicacion,
      descripcion,
      temario,
      coPonentes,
    };

    console.log("Nuevo taller:", data);
  };

  return (
    <div className="bg-[#f2f9ff] min-h-screen p-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">

        <h1 className="text-3xl font-bold mb-2">
          Creewgfar Nuevo Taller
        </h1>
        <p className="text-gray-500 mb-6">
          Completa los datos del taller. Al enviar, un administrador deberá confirmar la propuesta.
        </p>

        <div className="grid grid-cols-2 gap-6">

          <input
            placeholder="Título del taller"
            className="input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            placeholder="Capacidad máxima"
            className="input"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
          />

          <input
            type="date"
            className="input"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />

          <input
            placeholder="Horario (Ej: 10:00 - 12:00)"
            className="input"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />

          <input
            placeholder="Duración (Ej: 2 horas)"
            className="input"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
          />

          <select
            className="input bg-white"
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
          >
            <option value="" disabled>Seleccionar modalidad</option>
            <option value="presencial">Presencial</option>
            <option value="en_linea">En Línea</option>
            <option value="hibrida">Híbrida</option>
          </select>

          <input
            placeholder="Ubicación o Enlace"
            className="input col-span-2"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <textarea
          placeholder="Descripción del taller"
          className="input mt-6 w-full h-28 resize-none"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        {/* Temario */}
        <textarea
          placeholder="Temario (Escribe aquí los temas que se abordarán, puedes separarlos por líneas)"
          className="input mt-6 w-full h-32 resize-none"
          value={temario}
          onChange={(e) => setTemario(e.target.value)}
        />

        {/* Co-ponentes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Ponentes adicionales
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Agrega a más ponentes ingresando su nombre y correo.
          </p>

          {coPonentes.map((co, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-4">

              <input
                placeholder="Nombre del ponente"
                className="input"
                value={co.nombre}
                onChange={(e) =>
                  handleCoPonenteChange(index, "nombre", e.target.value)
                }
              />

              <input
                placeholder="Correo electrónico"
                className="input"
                value={co.correo}
                onChange={(e) =>
                  handleCoPonenteChange(index, "correo", e.target.value)
                }
              />

              {coPonentes.length > 1 && (
                <button
                  onClick={() => removeCoPonente(index)}
                  className="bg-red-50 text-red-500 px-4 rounded-md hover:bg-red-100 transition-colors"
                  aria-label="Eliminar ponente"
                >
                  X
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addCoPonente}
            className="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center gap-1"
          >
            + Agregar ponente
          </button>
        </div>

        {/* Botón */}
        <button
          onClick={handleSubmit}
          className="mt-8 bg-[#c58600] text-white px-6 py-3 rounded-md hover:bg-[#a87200] font-medium w-full md:w-auto shadow-sm"
        >
          Enviar para confirmación
        </button>
      </div>
    </div>
  );
}
