"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { type Workshop } from "@/lib/data";
import { misInscripciones, cancelarInscripcion } from "@/lib/api/inscripciones";
import { ApiError } from "@/lib/api/client";

export function ActionBox({ workshop }: { workshop: Workshop }) {
  const [inscripcionId, setInscripcionId] = useState<number | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    if (workshop.concluido) {
      setLoadingStatus(false);
      return;
    }
    misInscripciones()
      .then((inscripciones) => {
        const found = inscripciones.find(
          (i) => i.taller_id === workshop.id && i.estado === "activa"
        );
        if (found) {
          setEnrolled(true);
          setInscripcionId(found.id);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingStatus(false));
  }, [workshop.id, workshop.concluido]);

  const handleCancel = async () => {
    if (!inscripcionId) return;
    setCancelling(true);
    setCancelError(null);
    try {
      await cancelarInscripcion(inscripcionId);
      setEnrolled(false);
      setInscripcionId(null);
    } catch (err) {
      if (err instanceof ApiError) {
        setCancelError(err.message);
      } else {
        setCancelError("No se pudo cancelar la inscripción.");
      }
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-fit sticky top-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Datos Generales</h3>

      <div className="space-y-4 mb-8 flex-grow">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <span className="text-gray-500 text-sm">Fecha</span>
          <span className="font-semibold text-gray-800 text-right">{workshop.fecha}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <span className="text-gray-500 text-sm">Horario</span>
          <span className="font-semibold text-gray-800 text-right">{workshop.horario || "Por definir"}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <span className="text-gray-500 text-sm">Duración</span>
          <span className="font-semibold text-gray-800 text-right">{workshop.duracion}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <span className="text-gray-500 text-sm">Ubicación</span>
          <span className="font-semibold text-gray-800 text-right">{workshop.ubicacion}</span>
        </div>
        {workshop.modalidad && (
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500 text-sm">Modalidad</span>
            <span className="font-semibold text-gray-800 text-right">{workshop.modalidad}</span>
          </div>
        )}
      </div>

      {cancelError && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {cancelError}
        </div>
      )}

      <div className="mt-auto">
        {workshop.concluido && (
          <div className="bg-gray-100 text-gray-500 px-6 py-3.5 rounded-lg text-center font-semibold w-full border border-gray-200">
            Taller Concluido
          </div>
        )}

        {!workshop.concluido && loadingStatus && (
          <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
        )}

        {!workshop.concluido && !loadingStatus && !enrolled && (
          <Link
            href={`/courses/${workshop.id}/enroll`}
            className="bg-blue-900 text-white px-6 py-3.5 rounded-lg hover:bg-blue-800 transition w-full font-bold shadow-md text-center block"
          >
            Inscribirse al Taller
          </Link>
        )}

        {!workshop.concluido && !loadingStatus && enrolled && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center text-sm font-medium shadow-sm">
              ¡Estás inscrito en este taller!
            </div>
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className="bg-white text-red-600 border border-red-200 px-6 py-3.5 rounded-lg hover:bg-red-50 transition w-full font-semibold shadow-sm cursor-pointer disabled:opacity-60"
            >
              {cancelling ? "Cancelando..." : "Cancelar Inscripción"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
