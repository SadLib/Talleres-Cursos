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
  const [ubicacion, setUbicacion] = useState("");
  const [descripcion, setDescripcion] = useState("");

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

  const handleSubmit = () => {
    const data = {
      titulo,
      capacidad,
      fechaInicio,
      horario,
      duracion,
      ubicacion,
      descripcion,
      coPonentes,
    };

    console.log("Nuevo taller:", data);
  };

  return (
    <div className="bg-[#f2f9ff] min-h-screen p-10">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
        
        <h1 className="text-3xl font-bold mb-6">
          Crear Nuevo Taller
        </h1>

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

          <input
            placeholder="Ubicación"
            className="input"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <textarea
          placeholder="Descripción del taller"
          className="input mt-6 w-full h-28"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        {/* Co-ponentes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Co-ponentes
          </h2>

          {coPonentes.map((co, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
              
              <input
                placeholder="Nombre"
                className="input"
                value={co.nombre}
                onChange={(e) =>
                  handleCoPonenteChange(index, "nombre", e.target.value)
                }
              />

              <input
                placeholder="Correo"
                className="input"
                value={co.correo}
                onChange={(e) =>
                  handleCoPonenteChange(index, "correo", e.target.value)
                }
              />
            </div>
          ))}

          <button
            onClick={addCoPonente}
            className="text-blue-600 hover:underline"
          >
            + Agregar co-ponente
          </button>
        </div>

        {/* Botón */}
        <button
          onClick={handleSubmit}
          className="mt-8 bg-[#c58600] text-white px-6 py-3 rounded-md hover:bg-[#a87200]"
        >
          Crear Taller
        </button>
      </div>
    </div>
  );
}
