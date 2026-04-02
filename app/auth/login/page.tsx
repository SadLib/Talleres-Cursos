"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
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
            Bienvenido de <span className="text-yellow-500">Vuelta</span>
          </h1>
          <p className="text-blue-100 text-lg mb-10">
            Inicia sesión para acceder a tus talleres, certificados y más.
          </p>
          
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-blue-800/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Acceso rápido y seguro</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-800/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Gestiona tus inscripciones</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-800/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Descarga certificados</span>
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
        <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mt-12 sm:mt-0">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Iniciar sesión
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Accede a tu cuenta para continuar.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            {/* OPCIONES */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded"
                />
                Recordarme
              </label>

              <button type="button" className="text-yellow-600 hover:text-yellow-700 font-medium transition">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* SEPARADOR */}
            <div className="py-1"></div>

            {/* BOTÓN */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 shadow-[0_5px_15px_rgba(30,58,138,0.25)] hover:shadow-[0_5px_20px_rgba(30,58,138,0.35)] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
            >
              Ingresar
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* REGISTRO */}
          <p className="text-center text-sm text-gray-500 mt-6 md:mt-8">
            ¿No tienes cuenta?{" "}
            <Link href="/auth/register" className="font-semibold text-yellow-600 hover:text-yellow-700 transition">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
