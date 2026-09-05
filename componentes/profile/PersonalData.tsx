"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { me } from "@/lib/api/auth";
import { actualizarUsuario } from "@/lib/api/usuarios";
import { listarCarreras, type Carrera } from "@/lib/api/carreras";
import { ApiError } from "@/lib/api/client";

export default function PersonalData() {
  const [userId, setUserId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    numeroCuenta: "",
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",
    telefono: "",
    carrera: "",
    semestre: "",
    image: "/images/user.jpg",
  });

  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [originalImage, setOriginalImage] = useState("/images/user.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listarCarreras().then(setCarreras).catch(() => {});
    me()
      .then((user) => {
        setUserId(user.id);
        setFormData({
          numeroCuenta: user.numero_cuenta ?? "",
          nombre: user.nombre ?? "",
          primerApellido: user.primer_apellido ?? "",
          segundoApellido: user.segundo_apellido ?? "",
          correo: user.correo ?? "",
          telefono: user.telefono ?? "",
          carrera: user.carrera ?? "",
          semestre: user.semestre ?? "",
          image: user.foto_url || "/images/user.jpg",
        });
        setOriginalImage(user.foto_url || "/images/user.jpg");
      })
      .catch(() => setError("No se pudo cargar tu perfil. Inicia sesión."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    setError(null);
    try {
      await actualizarUsuario(userId, {
        nombre: formData.nombre.trim(),
        primer_apellido: formData.primerApellido.trim(),
        segundo_apellido: formData.segundoApellido.trim() || undefined,
        telefono: formData.telefono.trim(),
        carrera: formData.carrera.trim(),
        semestre: formData.semestre.trim(),
        numero_cuenta: formData.numeroCuenta.trim(),
        foto_url: formData.image,
      });
      setSuccess(true);
      setIsEditing(false);
      // Notificar al Navbar para que refresque la foto de perfil y datos
      window.dispatchEvent(new Event("storage"));
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

  const inputClass = `w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 outline-none transition-all duration-200 ${isEditing
      ? "bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
      : "bg-gray-50 cursor-default opacity-80"
    }`;

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-100 flex justify-center py-20">
        <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 border border-gray-100 relative max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-100 pb-5 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Información Personal</h2>
          <p className="text-gray-500 text-sm mt-1">Consulta y actualiza tus datos de perfil.</p>
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
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-100">
          <div className="relative">
            <Image
              src={formData.image}
              alt="Tu Foto"
              width={100}
              height={100}
              className={`rounded-full border-4 object-cover shadow-sm bg-gray-100 aspect-square transition-all ${
                isEditing ? 'border-blue-300' : 'border-gray-200 opacity-80'
              }`}
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-900 text-white rounded-full p-1.5 shadow-md hover:bg-blue-800 transition-colors"
                title="Cambiar foto"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-gray-700">Foto de perfil</p>
            {isEditing ? (
              <p className="text-xs text-gray-400 mt-1">Haz clic en el ícono de cámara para cambiar tu foto.<br />Formatos: JPG, PNG, WEBP.</p>
            ) : (
              <p className="text-xs text-gray-400 mt-1">Aparecerá en tu perfil y certificados.</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">No. de Cuenta</label>
          <input 
            name="numeroCuenta" 
            type="text" 
            value={formData.numeroCuenta} 
            onChange={handleChange} 
            readOnly={!isEditing} 
            className={inputClass} 
          />
          <p className="text-xs text-gray-400 mt-1">Aparecerá en tus certificados.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre(s)</label>
          <input name="nombre" type="text" value={formData.nombre} onChange={handleChange} readOnly={!isEditing} className={inputClass} required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Primer Apellido</label>
            <input name="primerApellido" type="text" value={formData.primerApellido} onChange={handleChange} readOnly={!isEditing} className={inputClass} required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Segundo Apellido</label>
            <input name="segundoApellido" type="text" value={formData.segundoApellido} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Correo Electrónico</label>
            <input type="email" value={formData.correo} readOnly className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 outline-none bg-gray-50 cursor-default opacity-80" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Teléfono</label>
            <input name="telefono" type="tel" value={formData.telefono} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Carrera</label>
            {isEditing ? (
              <select
                name="carrera"
                value={formData.carrera}
                onChange={(e) => setFormData((prev) => ({ ...prev, carrera: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 outline-none transition-all duration-200 bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
              >
                <option value="">Selecciona tu carrera...</option>
                {carreras.map((c) => (
                  <option key={c.id} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={formData.carrera}
                readOnly
                className={inputClass}
                placeholder="Sin carrera asignada"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Semestre</label>
            <input name="semestre" type="number" min="1" max="12" value={formData.semestre} onChange={handleChange} readOnly={!isEditing} className={inputClass} />
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-4 pt-6 mt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setError(null);
                setFormData((prev) => ({ ...prev, image: originalImage }));
              }}
              className="px-6 py-3 font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-800 shadow-md shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center gap-2 ml-auto sm:ml-0 disabled:opacity-60"
            >
              {saving ? "Guardando..." : (
                <>
                  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
