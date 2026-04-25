"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

export default function PonenteRegister() {
  const [formData, setFormData] = useState({
    nombre: "",
    primerApellido: "",
    segundoApellido: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
    aceptaTerminos: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    setError(null);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Este campo es obligatorio";
    if (!formData.primerApellido.trim()) newErrors.primerApellido = "Este campo es obligatorio";
    if (!formData.correo.trim()) newErrors.correo = "Este campo es obligatorio";
    if (!formData.contrasena) newErrors.contrasena = "Ingresa una contraseña";
    if (formData.contrasena.length > 0 && formData.contrasena.length < 6) newErrors.contrasena = "Mínimo 6 caracteres";
    if (formData.contrasena !== formData.confirmarContrasena) newErrors.confirmarContrasena = "Las contraseñas no coinciden";
    if (!formData.aceptaTerminos) newErrors.aceptaTerminos = "Debes aceptar los términos";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await register({
        numero_cuenta: Date.now().toString(), // Dummy value to satisfy unique constraint
        nombre: formData.nombre.trim(),
        primer_apellido: formData.primerApellido.trim(),
        segundo_apellido: formData.segundoApellido.trim() || null,
        correo: formData.correo.trim(),
        telefono: formData.telefono.trim() || null,
        password: formData.contrasena,
        roles: ["ponente"],
      });
      setSuccess(true);
      setTimeout(() => router.push("/ponente/auth/login"), 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputBase = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 disabled:opacity-50";

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800 selection:bg-blue-100">

      {/* 🔵 LADO IZQUIERDO - BRANDING (ADAPTADO PARA PONENTE) */}
      <div className="hidden lg:flex w-5/12 bg-blue-950 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-sm">
          <h1 className="text-4xl font-extrabold mb-6 leading-tight">
            Únete como <span className="text-yellow-500">Ponente</span>
          </h1>
          <p className="text-blue-200 text-lg mb-10">
            Comparte tu conocimiento, administra tus propios talleres y conecta con nuestra comunidad de estudiantes.
          </p>

          <div className="space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-blue-900/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Crea planes de estudio</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-900/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Certifica estudiantes</span>
            </div>
          </div>
        </div>
      </div>

      {/* ⚪ LADO DERECHO (FORMULARIO) */}
      <div className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <Link href="/" className="absolute top-6 left-6 sm:top-10 sm:left-10 text-gray-400 hover:text-gray-700 transition flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-medium">Volver a inicio (Público)</span>
        </Link>

        <div className="w-full max-w-xl bg-white p-8 sm:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mt-12 sm:mt-0">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Registro de Instructores
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Crea tu perfil como instructor para unirte al equipo.
            </p>
          </div>

          {/* SUCCESS MESSAGE */}
          {success && (
            <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ¡Registro exitoso! Redirigiendo al inicio de sesión...
            </div>
          )}

          {/* SERVER ERROR */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="nombre">Nombre *</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={loading || success}
                  className={`${inputBase} ${errors.nombre ? "!border-red-400" : ""}`}
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="primerApellido">Primer Apellido *</label>
                <input
                  id="primerApellido"
                  name="primerApellido"
                  type="text"
                  placeholder="Primer apellido"
                  value={formData.primerApellido}
                  onChange={handleChange}
                  disabled={loading || success}
                  className={`${inputBase} ${errors.primerApellido ? "!border-red-400" : ""}`}
                />
                {errors.primerApellido && <p className="text-red-500 text-xs mt-1">{errors.primerApellido}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="segundoApellido">Segundo Apellido</label>
              <input
                id="segundoApellido"
                name="segundoApellido"
                type="text"
                placeholder="Segundo apellido (opcional)"
                value={formData.segundoApellido}
                onChange={handleChange}
                disabled={loading || success}
                className={inputBase}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="correo">Correo Electrónico *</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="ponente@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                  disabled={loading || success}
                  className={`${inputBase} ${errors.correo ? "!border-red-400" : ""}`}
                />
                {errors.correo && <p className="text-red-500 text-xs mt-1">{errors.correo}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="Ej. 10 dígitos"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={loading || success}
                  className={inputBase}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="contrasena">Contraseña *</label>
                <input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.contrasena}
                  onChange={handleChange}
                  disabled={loading || success}
                  className={`${inputBase} ${errors.contrasena ? "!border-red-400" : ""}`}
                />
                {errors.contrasena && <p className="text-red-500 text-xs mt-1">{errors.contrasena}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="confirmarContrasena">Confirmar Contraseña *</label>
                <input
                  id="confirmarContrasena"
                  name="confirmarContrasena"
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={formData.confirmarContrasena}
                  onChange={handleChange}
                  disabled={loading || success}
                  className={`${inputBase} ${errors.confirmarContrasena ? "border-red-400" : "border-gray-200"}`}
                />
                {errors.confirmarContrasena && <p className="text-red-500 text-xs mt-1">{errors.confirmarContrasena}</p>}
              </div>
            </div>

            {/* AVISO DE PRIVACIDAD */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                  disabled={loading || success}
                  className="rounded mt-0.5"
                />
                <span className="text-sm text-gray-600 leading-snug">
                  He leído y acepto el{" "}
                  <button type="button" className="text-yellow-600 hover:text-yellow-700 font-semibold underline transition">
                    Aviso de Privacidad
                  </button>{" "}
                  y los{" "}
                  <button type="button" className="text-yellow-600 hover:text-yellow-700 font-semibold underline transition">
                    Términos y Condiciones
                  </button>
                  {" "}de la plataforma.
                </span>
              </label>
              {errors.aceptaTerminos && <p className="text-red-500 text-xs mt-1">{errors.aceptaTerminos}</p>}
            </div>

            <div className="py-1"></div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-blue-950 text-white font-bold py-3.5 rounded-xl hover:bg-blue-900 shadow-[0_5px_15px_rgba(23,37,84,0.25)] hover:shadow-[0_5px_20px_rgba(23,37,84,0.35)] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Registrando...
                </>
              ) : success ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ¡Registrado!
                </>
              ) : (
                <>
                  Completar Solicitud de Registro
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-gray-500 mt-6 md:mt-8">
              ¿Ya eres parte de nuestros ponentes?{" "}
              <Link href="/ponente/auth/login" className="font-semibold text-yellow-600 hover:text-yellow-700 transition">
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
