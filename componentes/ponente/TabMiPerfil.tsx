"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { me } from "@/lib/api/auth";
import { actualizarUsuario } from "@/lib/api/usuarios";
import { obtenerMiPerfilPonente, actualizarMiPerfilPonente } from "@/lib/api/ponentes";
import { ApiError } from "@/lib/api/client";

export function TabMiPerfil() {
  const [userId, setUserId] = useState<number | null>(null);
  const [profile, setProfile] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    afiliacion: "",
    correo: "",
    telefono: "",
    career: "",
    specialty: "",
    description: "",
    image: "/images/user.jpg",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    Promise.all([me(), obtenerMiPerfilPonente()])
      .then(([user, instructor]) => {
        setUserId(user.id);
        setProfile({
          nombre: user.nombre ?? "",
          primerApellido: user.primer_apellido ?? "",
          segundoApellido: user.segundo_apellido ?? "",
          afiliacion: instructor.afiliacion ?? "",
          correo: user.correo ?? "",
          telefono: user.telefono ?? "",
          career: instructor.institucion ?? "",
          specialty: instructor.especialidad ?? "",
          description: instructor.biografia ?? "",
          image: "/images/user.jpg",
        });
      })
      .catch(() => setError("No se pudo cargar el perfil. Asegúrate de tener un perfil de ponente."))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setError(null);
    try {
      await Promise.all([
        actualizarUsuario(userId, {
          nombre: profile.nombre.trim(),
          primer_apellido: profile.primerApellido.trim(),
          segundo_apellido: profile.segundoApellido.trim() || undefined,
          telefono: profile.telefono.trim(),
        }),
        actualizarMiPerfilPonente({
          afiliacion: profile.afiliacion as "interno" | "externo" | "estudiante" | "profesor" | undefined,
          institucion: profile.career.trim(),
          especialidad: profile.specialty.trim(),
          biografia: profile.description.trim(),
        }),
      ]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
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
      <div className="flex justify-center py-20">
        <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full py-4">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Mi Perfil / Datos de Usuario</h2>
        <p className="text-gray-500 text-sm mb-6">
          Actualiza tu información personal, de acceso y datos profesionales públicos.
        </p>

        {success && (
          <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Cambios guardados correctamente.
          </div>
        )}
        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
            <Image
              src={profile.image}
              alt="Tu Foto"
              width={100}
              height={100}
              className="rounded-full border-4 border-gray-200 object-cover shadow-sm bg-gray-100"
            />
            <div>
              <p className="text-xs text-gray-400">Foto de perfil</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre(s)</label>
                <input
                  type="text" required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.nombre}
                  onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primer Apellido</label>
                <input
                  type="text" required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.primerApellido}
                  onChange={(e) => setProfile({ ...profile, primerApellido: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Segundo Apellido</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.segundoApellido}
                  onChange={(e) => setProfile({ ...profile, segundoApellido: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Datos de Cuenta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none bg-gray-50 cursor-default opacity-70"
                  value={profile.correo}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.telefono}
                  onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Afiliación</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 bg-white"
                  value={profile.afiliacion}
                  onChange={(e) => setProfile({ ...profile, afiliacion: e.target.value })}
                >
                  <option value="">Selecciona una afiliación...</option>
                  <option value="interno">Interno (Personal de la facultad)</option>
                  <option value="estudiante">Estudiante</option>
                  <option value="externo">Externo</option>
                  <option value="profesor">Profesor</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2 pb-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Perfil Profesional (Público)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Carrera / Profesión</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.career}
                  onChange={(e) => setProfile({ ...profile, career: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad Principal</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900"
                  value={profile.specialty}
                  onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-900 resize-none"
              value={profile.description}
              onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            />
          </div>

          <div className="pt-4 mt-6 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-auto bg-blue-900 text-white font-medium px-8 py-2.5 rounded-lg hover:bg-blue-800 transition-colors shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
