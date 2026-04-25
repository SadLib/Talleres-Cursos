import { apiFetch } from "./client";
import type {
  EstadoInscripcion,
  Inscripcion,
  InscripcionDetalle,
  MensajeRespuesta,
} from "./types";

export function misInscripciones(): Promise<InscripcionDetalle[]> {
  return apiFetch<InscripcionDetalle[]>("/inscripciones/me");
}

export function inscribirse(cursoId: number): Promise<Inscripcion> {
  return apiFetch<Inscripcion>("/inscripciones/", {
    method: "POST",
    body: { taller_id: cursoId },
  });
}

export function inscritosPorCurso(cursoId: number): Promise<Inscripcion[]> {
  return apiFetch<Inscripcion[]>(`/inscripciones/curso/${cursoId}`);
}

export function cambiarEstadoInscripcion(
  inscripcionId: number,
  estado: EstadoInscripcion,
): Promise<Inscripcion> {
  return apiFetch<Inscripcion>(`/inscripciones/${inscripcionId}`, {
    method: "PATCH",
    body: { estado },
  });
}

export function cancelarInscripcion(
  inscripcionId: number,
): Promise<MensajeRespuesta> {
  return apiFetch<MensajeRespuesta>(`/inscripciones/${inscripcionId}`, {
    method: "DELETE",
  });
}
