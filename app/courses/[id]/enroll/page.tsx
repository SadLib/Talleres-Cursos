"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { me } from "@/lib/api/auth";
import { actualizarUsuario } from "@/lib/api/usuarios";
import { inscribirse } from "@/lib/api/inscripciones";
import { ApiError } from "@/lib/api/client";
import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import { cursoToWorkshop } from "@/lib/api/adapters";
import type { Workshop } from "@/lib/data";

export default function EnrollPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "", primer_apellido: "", segundo_apellido: "",
    correo: "", telefono: "", numero_cuenta: "", carrera: "", semestre: "",
  });

  useEffect(() => {
    const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

    const init = async () => {
      try {
        // Cargar taller y datos de usuario en paralelo
        const [cursoRes, user] = await Promise.all([
          fetch(`${API}/talleres/${id}`).then((r) => r.ok ? r.json() : null),
          me().catch(() => null),
        ]);

        if (!cursoRes) {
          router.push("/courses");
          return;
        }
        setWorkshop(cursoToWorkshop(cursoRes));

        if (!user) {
          router.push(`/auth/login?redirect=/courses/${id}/enroll`);
          return;
        }

        setFormData({
          nombre: user.nombre || "",
          primer_apellido: user.primer_apellido || "",
          segundo_apellido: user.segundo_apellido || "",
          correo: user.correo || "",
          telefono: user.telefono || "",
          numero_cuenta: user.numero_cuenta || "",
          carrera: user.carrera || "",
          semestre: user.semestre || "",
        });
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          router.push(`/auth/login?redirect=/courses/${id}/enroll`);
        } else {
          setError("No se pudo cargar la información.");
        }
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.primer_apellido.trim() || !formData.telefono?.trim()) {
      setError("Por favor completa los campos obligatorios.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const user = await me();
      await actualizarUsuario(user.id, {
        nombre: formData.nombre.trim(),
        primer_apellido: formData.primer_apellido.trim(),
        segundo_apellido: formData.segundo_apellido.trim() || undefined,
        telefono: formData.telefono.trim(),
        carrera: formData.carrera.trim(),
        semestre: formData.semestre.trim(),
      });
      await inscribirse(parseInt(id));
      setSuccess(true);
      setTimeout(() => router.push(`/courses/${id}`), 2000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado al procesar tu inscripción.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  const inputBase = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:bg-gray-100";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

          <div className="md:w-1/3 bg-blue-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-yellow-500 font-semibold mb-2 uppercase tracking-wide text-xs">Inscripción</h3>
              <h2 className="text-2xl font-bold mb-4">{workshop.nombre}</h2>
              <div className="space-y-4 text-sm text-blue-100 mt-6">
                <div>
                  <span className="block text-blue-300 text-xs uppercase mb-1">Fecha</span>
                  <p className="font-medium text-white">{workshop.fecha}</p>
                </div>
                {workshop.horario && (
                  <div>
                    <span className="block text-blue-300 text-xs uppercase mb-1">Horario</span>
                    <p className="font-medium text-white">{workshop.horario}</p>
                  </div>
                )}
                <div>
                  <span className="block text-blue-300 text-xs uppercase mb-1">Ubicación</span>
                  <p className="font-medium text-white">{workshop.ubicacion}</p>
                </div>
                {workshop.modalidad && (
                  <div>
                    <span className="block text-blue-300 text-xs uppercase mb-1">Modalidad</span>
                    <p className="font-medium text-white">{workshop.modalidad}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="relative z-10 mt-8 pt-6 border-t border-blue-800/50">
              <Link href={`/courses/${id}`} className="text-sm text-blue-200 hover:text-white flex items-center gap-2 transition">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver a detalles
              </Link>
            </div>
          </div>

          <div className="md:w-2/3 p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Confirma tus datos</h2>
            <p className="text-gray-500 text-sm mb-6">Revisa y completa tu información antes de inscribirte al taller.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {success && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-medium flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ¡Inscripción exitosa! Redirigiendo...
                </div>
              )}
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">No. Cuenta</label>
                  <input type="text" value={formData.numero_cuenta} disabled className={inputBase} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Correo</label>
                  <input type="email" value={formData.correo} disabled className={inputBase} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Nombre(s) *</label>
                <input name="nombre" type="text" value={formData.nombre} onChange={handleChange} disabled={submitting || success} className={inputBase} required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Primer Apellido *</label>
                  <input name="primer_apellido" type="text" value={formData.primer_apellido} onChange={handleChange} disabled={submitting || success} className={inputBase} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Segundo Apellido</label>
                  <input name="segundo_apellido" type="text" value={formData.segundo_apellido} onChange={handleChange} disabled={submitting || success} className={inputBase} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Teléfono *</label>
                <input name="telefono" type="tel" value={formData.telefono} onChange={handleChange} disabled={submitting || success} className={inputBase} placeholder="Ej. 5512345678" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Carrera *</label>
                  <input name="carrera" type="text" value={formData.carrera} onChange={handleChange} disabled={submitting || success} className={inputBase} placeholder="Ej. Ingeniería" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">Semestre *</label>
                  <input name="semestre" type="text" value={formData.semestre} onChange={handleChange} disabled={submitting || success} className={inputBase} placeholder="Ej. 6" required />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || success}
                  className="w-full bg-blue-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 shadow-md active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      Confirmar y Enviar
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
