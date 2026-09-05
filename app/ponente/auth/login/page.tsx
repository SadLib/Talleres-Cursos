"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import Image from "next/image";

export default function PonenteLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ correo: email, password });
      router.push("/ponente/dashboard");
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

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800 selection:bg-blue-100">

      {/* 🔵 LADO IZQUIERDO - BRANDING (ADAPTADO PARA PONENTE) */}
      <div className="hidden lg:flex w-5/12 bg-blue-950 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <Image
          src="/images/fondo5.png"
          alt="Bienvenido a la plataforma de inscripción a talleres y cursos de MAC"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-sm">
          <h1 className="text-4xl font-extrabold mb-6 leading-tight">
            Portal exclusivo para <span className="text-blue-900">Ponentes</span>
          </h1>
          <p className="text-blue-200 text-lg mb-10">
            Inicia sesión para gestionar tus talleres, ver tus participantes y crear nuevos cursos.
          </p>

          <div className="space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="bg-blue-900/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Administra tus talleres</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-900/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Control de asistencia</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-900/80 p-3 rounded-xl shadow-inner">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="font-medium text-blue-50 text-lg">Emisión de certificados</span>
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

        {/* Card Contenedor */}
        <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 mt-12 sm:mt-0">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Ingreso de Ponentes
            </h2>
            <p className="mt-2 text-base text-gray-500">
              Usa tus credenciales de instructor para entrar.
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="ponente@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 disabled:opacity-50"
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
                required
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 disabled:opacity-50"
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
              disabled={loading}
              className="w-full bg-blue-950 text-white font-bold py-3.5 rounded-xl hover:bg-blue-900 shadow-[0_5px_15px_rgba(23,37,84,0.25)] hover:shadow-[0_5px_20px_rgba(23,37,84,0.35)] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Ingresando...
                </>
              ) : (
                <>
                  Ingresar al Dashboard
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* REGISTRO PONENTE */}
          <p className="text-center text-sm text-gray-500 mt-6 md:mt-8">
            ¿Eres instructor y no tienes cuenta?{" "}
            <Link href="/ponente/auth/register" className="font-semibold text-yellow-600 hover:text-yellow-700 transition">
              Solicita registro
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
