"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { misInscripciones } from "@/lib/api/inscripciones";
import { certificadoPorInscripcion, descargarConstanciaPDF } from "@/lib/api/certificados";
import { cursoToWorkshop } from "@/lib/api/adapters";
import type { Workshop } from "@/lib/data";

type EstadoFinal = "pendiente" | "completado" | "no_asistio" | null;

type TarjetaCert = {
  inscripcionId: number;
  workshop: Workshop;
  estadoFinal: EstadoFinal;
  certificadoId?: number;
  descargando?: boolean;
};

export default function Certificates() {
  const [tarjetas, setTarjetas] = useState<TarjetaCert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    misInscripciones()
      .then(async (data) => {
        const activas = data.filter((i) => i.estado === "activa");
        const items = await Promise.all(
          activas.map(async (i) => {
            const estadoFinal = (i as unknown as { estado_final: EstadoFinal }).estado_final ?? null;
            let certificadoId: number | undefined;
            if (estadoFinal === "completado") {
              const cert = await certificadoPorInscripcion(i.id);
              certificadoId = cert?.id;
            }
            return {
              inscripcionId: i.id,
              workshop: cursoToWorkshop(i.taller),
              estadoFinal,
              certificadoId,
            };
          })
        );
        setTarjetas(items);
      })
      .catch(() => setTarjetas([]))
      .finally(() => setLoading(false));
  }, []);

  const descargar = async (tarjeta: TarjetaCert) => {
    if (!tarjeta.certificadoId) return;
    setTarjetas((prev) =>
      prev.map((t) => t.inscripcionId === tarjeta.inscripcionId ? { ...t, descargando: true } : t)
    );
    try {
      await descargarConstanciaPDF(tarjeta.certificadoId, tarjeta.workshop.nombre);
    } catch {
      alert("Error al descargar la constancia. Intenta más tarde.");
    } finally {
      setTarjetas((prev) =>
        prev.map((t) => t.inscripcionId === tarjeta.inscripcionId ? { ...t, descargando: false } : t)
      );
    }
  };

  const completados = tarjetas.filter((t) => t.estadoFinal === "completado");
  const enCurso = tarjetas.filter((t) => t.estadoFinal !== "completado" && t.estadoFinal !== "no_asistio");

  return (
    <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 border border-gray-100 relative max-w-6xl mx-auto">
      <div className="mb-8 border-b border-gray-100 pb-5">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Mis Certificados</h2>
        <p className="text-gray-500 text-sm mt-1">
          Descarga los certificados oficiales de los talleres que has completado.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : tarjetas.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          Aún no estás inscrito en ningún taller.
        </p>
      ) : (
        <>
          {completados.length > 0 && (
            <section className="mb-10">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Disponibles para descarga
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completados.map((tarjeta) => (
                  <CertCard
                    key={tarjeta.inscripcionId}
                    tarjeta={tarjeta}
                    onDescargar={() => descargar(tarjeta)}
                  />
                ))}
              </div>
            </section>
          )}

          {enCurso.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                En curso
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enCurso.map((tarjeta) => (
                  <CertCard
                    key={tarjeta.inscripcionId}
                    tarjeta={tarjeta}
                    onDescargar={() => descargar(tarjeta)}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function CertCard({ tarjeta, onDescargar }: { tarjeta: TarjetaCert; onDescargar: () => void }) {
  const { workshop, estadoFinal, certificadoId, descargando } = tarjeta;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition overflow-hidden flex flex-col w-full h-full mx-auto relative group">
      <div className="h-2 w-full bg-yellow-500 absolute top-0 left-0 z-10" />
      <div className="relative w-full aspect-[4/3] bg-gray-200 shrink-0">
        <Image
          src={workshop.image}
          alt={workshop.nombre}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 transition"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs font-semibold tracking-wider uppercase text-yellow-400 mb-1">
            Certificado Oficial
          </p>
          <h3 className="font-bold text-lg leading-tight shadow-sm">{workshop.nombre}</h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow text-left">
        <div className="mb-auto mt-2">
          <p className="font-semibold text-gray-800">{workshop.ponenteStr}</p>
          <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2z" />
            </svg>
            <span>{workshop.fecha}</span>
          </div>
        </div>

        <div className="mt-6">
          {estadoFinal === "completado" && certificadoId ? (
            <button
              onClick={onDescargar}
              disabled={descargando}
              className="bg-blue-700 hover:bg-blue-800 disabled:opacity-60 text-white font-medium py-2.5 rounded-md w-full flex items-center justify-center gap-2 transition cursor-pointer"
            >
              {descargando ? (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              {descargando ? "Generando PDF..." : "Descargar Constancia"}
            </button>
          ) : estadoFinal === "completado" ? (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-medium py-2.5 rounded-md w-full flex items-center justify-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Constancia en proceso de emisión
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 text-gray-500 text-sm font-medium py-2.5 rounded-md w-full flex items-center justify-center gap-2 cursor-not-allowed">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pendiente de confirmación
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
