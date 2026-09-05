import { apiFetch } from "./client";
import type {
  ActualizarPonentePayload,
  Ponente,
  PonenteDetalle,
} from "./types";

export function listarPonentes(): Promise<PonenteDetalle[]> {
  return apiFetch<PonenteDetalle[]>("/instructores", { auth: false });
}

export function obtenerPonente(id: number): Promise<PonenteDetalle> {
  return apiFetch<PonenteDetalle>(`/instructores/${id}`, { auth: false });
}

export function obtenerMiPerfilPonente(): Promise<PonenteDetalle> {
  return apiFetch<PonenteDetalle>("/instructores/me");
}

export function crearPonente(payload: {
  usuario_id: number;
  afiliacion?: "interno" | "externo" | "estudiante" | "profesor";
  institucion?: string;
  especialidad?: string;
  biografia?: string;
}): Promise<Ponente> {
  return apiFetch<Ponente>("/instructores", {
    method: "POST",
    body: {
      usuario_id: payload.usuario_id,
      afiliacion: payload.afiliacion,
      profesion: payload.institucion,
      especialidad: payload.especialidad,
      biografia: payload.biografia,
    },
  });
}

export function actualizarMiPerfilPonente(
  payload: ActualizarPonentePayload,
): Promise<Ponente> {
  return apiFetch<Ponente>("/instructores/me", {
    method: "PUT",
    body: {
      afiliacion: payload.afiliacion,
      profesion: payload.institucion,
      especialidad: payload.especialidad,
      biografia: payload.biografia,
    },
  });
}

export function actualizarPonente(
  id: number,
  payload: ActualizarPonentePayload,
): Promise<PonenteDetalle> {
  return apiFetch<PonenteDetalle>(`/instructores/${id}`, {
    method: "PUT",
    body: {
      afiliacion: payload.afiliacion,
      profesion: payload.institucion,
      especialidad: payload.especialidad,
      biografia: payload.biografia,
    },
  });
}

export function eliminarPonente(id: number): Promise<void> {
  return apiFetch<void>(`/instructores/${id}`, { method: "DELETE" });
}
