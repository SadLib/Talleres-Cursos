"use client";

import { useState } from "react";
import Image from "next/image";

export default function PersonalData() {
  const [formData, setFormData] = useState({
    numeroCuenta: "318000000",
    nombre: "Emilio",
    primerApellido: "García",
    segundoApellido: "López",
    correo: "emilio@alumno.unam.mx",
    telefono: "5512345678",
    carrera: "Matemáticas Aplicadas y Computación",
    semestre: "8",
    contrasena: "********",
    image: "/images/user.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = () => {
    if (!isEditing) return;
    alert("Simulación: Abriendo selector de archivos para subir nueva imagen...");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos guardados:", formData);
    setIsEditing(false); // Sale del modo edición tras guardar
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 outline-none transition-all duration-200 ${isEditing
      ? "bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
      : "bg-gray-50 cursor-default opacity-80"
    }`;

  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 border border-gray-100 relative max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-100 pb-5 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Información Personal</h2>
          <p className="text-gray-500 text-sm mt-1">
            Consulta y actualiza tus datos de perfil.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-5 rounded-lg transition"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Editar perfil
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Foto de Perfil */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
          <Image 
            src={formData.image} 
            alt="Tu Foto" 
            width={100} 
            height={100} 
            className={`rounded-full border-4 border-gray-200 object-cover shadow-sm bg-gray-100 aspect-square ${!isEditing && 'opacity-80'}`}
          />
          <div className="text-center sm:text-left">
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={!isEditing}
              className={`px-4 py-2 rounded-md font-medium transition-colors mb-2 block w-full sm:w-auto ${
                isEditing 
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer" 
                  : "bg-gray-50 text-gray-400 cursor-default"
              }`}
            >
              Subir nueva foto
            </button>
            <p className="text-xs text-gray-400">Recomendado: Cuadrado, máximo 2MB.</p>
          </div>
        </div>

        {/* IDENTIFICADORES — Siempre solo lectura */}
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="numeroCuenta">No. de Cuenta</label>
            <input id="numeroCuenta" name="numeroCuenta" type="text" value={formData.numeroCuenta} onChange={handleChange} readOnly className={`w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 outline-none bg-gray-50 cursor-default opacity-80`} />
            <p className="text-xs text-gray-400 mt-1">Agrega el numero de cuenta que aparecera en los certificados.</p>
          </div>
        </div>

        {/* NOMBRE */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="nombre">Nombre(s)</label>
          <input id="nombre" name="nombre" type="text" value={formData.nombre} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
        </div>

        {/* APELLIDOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="primerApellido">Primer Apellido</label>
            <input id="primerApellido" name="primerApellido" type="text" value={formData.primerApellido} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="segundoApellido">Segundo Apellido</label>
            <input id="segundoApellido" name="segundoApellido" type="text" value={formData.segundoApellido} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
          </div>
        </div>

        {/* CONTACTO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="correo">Correo Electrónico</label>
            <input id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="telefono">Teléfono</label>
            <input id="telefono" name="telefono" type="tel" value={formData.telefono} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
          </div>
        </div>

        {/* ACADÉMICO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="carrera">Carrera</label>
            <select id="carrera" name="carrera" value={formData.carrera} onChange={handleChange} disabled={!isEditing} className={inputClass}>
              <option value="Matemáticas Aplicadas y Computación">Matemáticas Aplicadas y Computación</option>
              <option value="Actuaría">Actuaría</option>
              <option value="Ingeniería Civil">Ingeniería Civil</option>
              <option value="Arquitectura">Arquitectura</option>
              <option value="Derecho">Derecho</option>
              <option value="Comunicación">Comunicación</option>
              <option value="Pedagogía">Pedagogía</option>
              <option value="Diseño Gráfico">Diseño Gráfico</option>
              <option value="Relaciones Internacionales">Relaciones Internacionales</option>
              <option value="Historia">Historia</option>
              <option value="Filosofía">Filosofía</option>
              <option value="Otra">Otra</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="semestre">Semestre</label>
            <input id="semestre" name="semestre" type="number" min="1" max="12" value={formData.semestre} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
          </div>
        </div>

        {/* CONTRASEÑA */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="contrasena">Contraseña</label>
          <input id="contrasena" name="contrasena" type="password" value={formData.contrasena} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
        </div>

        {/* BOTONES GUARDAR/CANCELAR */}
        {isEditing && (
          <div className="flex items-center gap-4 pt-6 mt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 shadow-md shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center gap-2 ml-auto sm:ml-0"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Guardar cambios
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
