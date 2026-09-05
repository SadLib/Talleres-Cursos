"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { inscritosPorCurso } from "@/lib/api/inscripciones";
import { actualizarEstadoFinal } from "@/lib/api/inscripciones";
import { emitirCertificado, descargarConstanciaPDF, certificadoPorInscripcion } from "@/lib/api/certificados";

type EstadoFinal = "pendiente" | "completado" | "no_asistio" | null;

type Alumno = {
  id: number;
  usuario_id: number;
  nombre: string;
  primer_apellido: string;
  correo: string;
  fecha_inscripcion: string;
  estado: string;
  estado_final: EstadoFinal;
  certificado_id?: number;
  cargandoCert?: boolean;
};

const BADGE_FINAL: Record<string, string> = {
  completado: "bg-emerald-100 text-emerald-800",
  no_asistio: "bg-red-100 text-red-700",
  pendiente: "bg-yellow-100 text-yellow-700",
};

export default function AlumnosTallerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const tallerId = parseInt(id);

  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [tallerNombre, setTallerNombre] = useState("");
  const [loading, setLoading] = useState(true);

  const cargar = useCallback(async () => {
    const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
    try {
      const [inscripciones, taller] = await Promise.all([
        inscritosPorCurso(tallerId) as unknown as Promise<Alumno[]>,
        fetch(`${API}/talleres/${tallerId}`, { cache: "no-store" }).then((r) => r.ok ? r.json() : null),
      ]);
      if (taller) setTallerNombre(taller.nombre);
      const conCerts = await Promise.all(
        inscripciones.map(async (a) => {
          const cert = await certificadoPorInscripcion(a.id);
          return { ...a, certificado_id: cert?.id };
        })
      );
      setAlumnos(conCerts);
    } catch {
      // silencioso
    } finally {
      setLoading(false);
    }
  }, [tallerId]);

  useEffect(() => { cargar(); }, [cargar]);

  const formatFecha = (fecha: string) => {
    try {
      return new Date(fecha).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });
    } catch {
      return fecha;
    }
  };

  const cambiarEstadoFinal = async (alumno: Alumno, nuevoEstado: EstadoFinal) => {
    if (!nuevoEstado) return;
    try {
      await actualizarEstadoFinal(alumno.id, nuevoEstado);
      setAlumnos((prev) =>
        prev.map((a) => a.id === alumno.id ? { ...a, estado_final: nuevoEstado } : a)
      );
    } catch {
      alert("Error al actualizar el estado.");
    }
  };

  const emitirYDescargar = async (alumno: Alumno) => {
    setAlumnos((prev) => prev.map((a) => a.id === alumno.id ? { ...a, cargandoCert: true } : a));
    try {
      const cert = await emitirCertificado(alumno.id);
      setAlumnos((prev) =>
        prev.map((a) => a.id === alumno.id ? { ...a, certificado_id: cert.id, cargandoCert: false } : a)
      );
      await descargarConstanciaPDF(cert.id, `${alumno.nombre} ${alumno.primer_apellido}`);
    } catch {
      setAlumnos((prev) => prev.map((a) => a.id === alumno.id ? { ...a, cargandoCert: false } : a));
      alert("Error al generar la constancia.");
    }
  };

  const descargar = async (alumno: Alumno) => {
    if (!alumno.certificado_id) return;
    setAlumnos((prev) => prev.map((a) => a.id === alumno.id ? { ...a, cargandoCert: true } : a));
    try {
      await descargarConstanciaPDF(alumno.certificado_id, `${alumno.nombre} ${alumno.primer_apellido}`);
    } catch {
      alert("Error al descargar la constancia.");
    } finally {
      setAlumnos((prev) => prev.map((a) => a.id === alumno.id ? { ...a, cargandoCert: false } : a));
    }
  };

  return (
    <div className="bg-[#f2f9ff] min-h-screen p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <Link
              href="/ponente/dashboard"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 mb-4 transition-colors"
            >
              ← Volver a mis talleres
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900">{tallerNombre || `Taller #${id}`}</h1>
            <p className="text-gray-600 mt-1">Participantes, asistencia y constancias.</p>
          </div>
        </div>

        <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-20">
              <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : alumnos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase text-gray-500 whitespace-nowrap">
                    <th className="p-5 font-semibold">Participante</th>
                    <th className="p-5 font-semibold">Correo</th>
                    <th className="p-5 font-semibold">Inscripción</th>
                    <th className="p-5 font-semibold text-center">Estado</th>
                    <th className="p-5 font-semibold text-center">Conclusión</th>
                    <th className="p-5 font-semibold text-center">Constancia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {alumnos.map((alumno) => (
                    <tr key={alumno.id} className="hover:bg-gray-50/50 transition whitespace-nowrap">
                      <td className="p-5 font-bold text-gray-800">
                        {alumno.nombre} {alumno.primer_apellido}
                      </td>
                      <td className="p-5 text-gray-500 text-sm">{alumno.correo}</td>
                      <td className="p-5 text-gray-500 text-sm">{formatFecha(alumno.fecha_inscripcion)}</td>
                      <td className="p-5 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          alumno.estado === "activa"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {alumno.estado}
                        </span>
                      </td>
                      <td className="p-5 text-center">
                        <select
                          value={alumno.estado_final ?? ""}
                          onChange={(e) => cambiarEstadoFinal(alumno, e.target.value as EstadoFinal)}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 outline-none cursor-pointer ${
                            alumno.estado_final ? BADGE_FINAL[alumno.estado_final] : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          <option value="">Sin definir</option>
                          <option value="pendiente">Pendiente</option>
                          <option value="completado">Completado</option>
                          <option value="no_asistio">No asistió</option>
                        </select>
                      </td>
                      <td className="p-5 text-center">
                        {alumno.estado_final === "completado" ? (
                          alumno.cargandoCert ? (
                            <svg className="w-5 h-5 text-blue-500 animate-spin mx-auto" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : alumno.certificado_id ? (
                            <button
                              onClick={() => descargar(alumno)}
                              title="Descargar constancia"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Descargar
                            </button>
                          ) : (
                            <button
                              onClick={() => emitirYDescargar(alumno)}
                              title="Emitir constancia"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-medium hover:bg-blue-800 transition-colors cursor-pointer"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Emitir
                            </button>
                          )
                        ) : (
                          <span className="text-xs text-gray-400">
                            {alumno.estado_final === "no_asistio" ? "—" : "Marcar conclusión"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-gray-500">
              <p>Aún no hay participantes en este taller.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
