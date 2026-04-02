"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    idUsuario: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    telefono: "",
    contrasena: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800 selection:bg-blue-100">
      
      {/* 🔵 LADO IZQUIERDO - BRANDING */}
      <div className="hidden lg:flex w-5/12 bg-blue-900 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-sm">
          <h1 className="text-4xl font-extrabold mb-6 leading-tight">
            Únete a la <span className="text-yellow-500">Comunidad</span>
          </h1>
          <p className="text-blue-100 text-lg mb-10">
            Crea tu cuenta hoy y descubre un sinfín de herramientas para tu desarrollo.
          </p>
          
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-blue-800/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Inscripción a talleres</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-800/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Certificados oficiales</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-800/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Aprendizaje continuo</span>
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
          <span className="font-medium">Volver al inicio</span>
        </Link>

        {/* Card Contenedor */}
        <div className="w-full max-w-xl bg-white p-8 sm:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mt-12 sm:mt-0">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Crear cuenta
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Completa tus datos para registrarte de forma segura.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* ID USUARIO */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="idUsuario">ID de Usuario</label>
              <input
                id="idUsuario"
                name="idUsuario"
                type="text"
                placeholder="Ej. número de cuenta o identificador"
                value={formData.idUsuario}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* NOMBRE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre(s)"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* APELLIDOS (GRID) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="apellidoPaterno">Apellido Paterno</label>
                <input
                  id="apellidoPaterno"
                  name="apellidoPaterno"
                  type="text"
                  placeholder="Primer apellido"
                  value={formData.apellidoPaterno}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="apellidoMaterno">Apellido Materno</label>
                <input
                  id="apellidoMaterno"
                  name="apellidoMaterno"
                  type="text"
                  placeholder="Segundo apellido"
                  value={formData.apellidoMaterno}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* CORREO Y TELEFONO (GRID) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="correo">Correo Electrónico</label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                />
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="contrasena">Contraseña</label>
              <input
                id="contrasena"
                name="contrasena"
                type="password"
                placeholder="••••••••"
                value={formData.contrasena}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* SEPARADOR INVISIBLE */}
            <div className="py-1"></div>

            {/* BOTÓN */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 shadow-[0_5px_15px_rgba(30,58,138,0.25)] hover:shadow-[0_5px_20px_rgba(30,58,138,0.35)] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
            >
              Completar registro
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* LOGIN LINK */}
            <p className="text-center text-sm text-gray-500 mt-6 md:mt-8">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="font-semibold text-yellow-600 hover:text-yellow-700 transition">
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

