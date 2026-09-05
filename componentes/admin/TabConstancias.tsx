"use client";

import { useState, useEffect, useCallback } from "react";
import { listarCursos, listarInscripcionesTaller } from "@/lib/api/cursos";
import { actualizarEstadoFinal } from "@/lib/api/inscripciones";
import { emitirCertificado, descargarConstanciaPDF, certificadoPorInscripcion } from "@/lib/api/certificados";
import type { Curso } from "@/lib/api/types";

type EstadoFinal = "pendiente" | "completado" | "no_asistio" | null;

type AlumnoConCert = {
  id: number;
  usuario_id: number;
  nombre: string;
  primer_apellido: string;
  correo: string;
  estado: string;
  estado_final: EstadoFinal;
  fecha_inscripcion: string;
  certificado_id?: number;
  cargandoCert?: boolean;
};

const BADGE_FINAL: Record<string, string> = {
  completado: "bg-emerald-100 text-emerald-800",
  no_asistio: "bg-red-100 text-red-700",
  pendiente: "bg-yellow-100 text-yellow-700",
};

const LABEL_FINAL: Record<string, string> = {
  completado: "Completado",
  no_asistio: "No asistió",
  pendiente: "Pendiente",
};

export function TabConstancias() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursoId, setCursoId] = useState<number | null>(null);
  const [alumnos, setAlumnos] = useState<AlumnoConCert[]>([]);
  const [loadingCursos, setLoadingCursos] = useState(true);
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listarCursos()
      .then(setCursos)
      .catch(() => setError("No se pudieron cargar los cursos."))
      .finally(() => setLoadingCursos(false));
  }, []);

  const cargarAlumnos = useCallback(async (id: number) => {
    setLoadingAlumnos(true);
    setError(null);
    try {
      const inscritos = await listarInscripcionesTaller(id) as unknown as AlumnoConCert[];
      const conCerts = await Promise.all(
        inscritos.map(async (a) => {
          const cert = await certificadoPorInscripcion(a.id);
          return { ...a, certificado_id: cert?.id };
        })
      );
      setAlumnos(conCerts);
    } catch {
      setError("No se pudieron cargar los participantes.");
    } finally {
      setLoadingAlumnos(false);
    }
  }, []);

  const handleCursoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setCursoId(id || null);
    if (id) cargarAlumnos(id);
    else setAlumnos([]);
  };

  const cambiarEstadoFinal = async (alumno: AlumnoConCert, nuevoEstado: EstadoFinal) => {
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

  const emitirYDescargar = async (alumno: AlumnoConCert) => {
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

  const descargar = async (alumno: AlumnoConCert) => {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Constancias de Participación</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Marca la conclusión de cada alumno y emite su constancia en PDF.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <div className="mb-6 max-w-sm">
        <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona un curso</label>
        {loadingCursos ? (
          <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
        ) : (
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
            onChange={handleCursoChange}
            defaultValue=""
          >
            <option value="">— Elegir curso —</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        )}
      </div>

      {!cursoId && (
        <div className="py-12 text-center text-gray-400 text-sm">
          Selecciona un curso para ver sus participantes.
        </div>
      )}

      {cursoId && loadingAlumnos && (
        <div className="flex justify-center py-16">
          <svg className="w-8 h-8 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      )}

      {cursoId && !loadingAlumnos && alumnos.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">Sin participantes en este curso.</div>
      )}

      {cursoId && !loadingAlumnos && alumnos.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Participante</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Correo</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Estado final</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Constancia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {alumnos.map((alumno) => (
                <tr key={alumno.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800">{alumno.nombre} {alumno.primer_apellido}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{alumno.correo}</td>
                  <td className="px-4 py-3 text-center">
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
                  <td className="px-4 py-3 text-center">
                    {alumno.estado_final === "completado" ? (
                      alumno.cargandoCert ? (
                        <svg className="w-5 h-5 text-blue-500 animate-spin mx-auto" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : alumno.certificado_id ? (
                        <button
                          onClick={() => descargar(alumno)}
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
                        {alumno.estado_final === "no_asistio" ? "No aplica" : "Marcar como completado"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
