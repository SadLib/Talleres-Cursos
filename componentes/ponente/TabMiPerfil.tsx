"use client";

import { useState } from "react";
import Image from "next/image";

export function TabMiPerfil() {
  const [profile, setProfile] = useState({
    nombre: "Juan",
    paterno: "Pérez",
    materno: "López",
    afiliacion: "interno",
    correo: "juan@email.com",
    telefono: "5512345678",
    contrasena: "********",
    career: "Ingeniería en Computación",
    specialty: "IA y Machine Learning",
    description: "Experto en modelos predictivos",
    image: "/images/user.jpg",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cambios de perfil guardados (Simulación)");
  };

  const handleImageUpload = () => {
    alert("Simulación de selector de archivo de imagen abierto");
  };

  return (
    <div className="flex justify-center w-full py-4">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Mi Perfil / Datos de Usuario</h2>
        <p className="text-gray-500 text-sm mb-6">
          Actualiza tu información personal, de acceso y datos profesionales públicos.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Foto Subida */}
          <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
            <Image 
              src={profile.image} 
              alt="Tu Foto" 
              width={100} 
              height={100} 
              className="rounded-full border-4 border-gray-200 object-cover shadow-sm bg-gray-100"
            />
            <div>
              <button
                type="button"
                onClick={handleImageUpload}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors mb-2 block cursor-pointer"
              >
                Subir nueva foto
              </button>
              <p className="text-xs text-gray-400">Recomendado: Cuadrado, máximo 2MB.</p>
            </div>
          </div>

          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre(s)</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.nombre}
                  onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.paterno}
                  onChange={(e) => setProfile({ ...profile, paterno: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.materno}
                  onChange={(e) => setProfile({ ...profile, materno: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Datos de Acceso y Contacto */}
          <div className="pt-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Datos de Cuenta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.correo}
                  onChange={(e) => setProfile({ ...profile, correo: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.telefono}
                  onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input
                  type="password"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.contrasena}
                  onChange={(e) => setProfile({ ...profile, contrasena: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Afiliación</label>
                <select
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 bg-white"
                  value={profile.afiliacion}
                  onChange={(e) => setProfile({ ...profile, afiliacion: e.target.value })}
                >
                  <option value="">Selecciona una afiliación...</option>
                  <option value="interno">Interno</option>
                  <option value="alumno">Alumno</option>
                  <option value="externo">Externo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Perfil Profesional */}
          <div className="pt-2 pb-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Perfil Profesional (Público)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Carrera / Profesión</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.career}
                  onChange={(e) => setProfile({ ...profile, career: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad Principal</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.specialty}
                  onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Breve Descripción sobre ti</label>
            <textarea
               required
               rows={4}
               className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 resize-none"
               value={profile.description}
               onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            />
          </div>

          <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-900 text-white font-medium px-8 py-2.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
