import { apiFetch } from "./client";
import type {
  ActualizarPonentePayload,
  Ponente,
  PonenteDetalle,
} from "./types";

export function listarPonentes(): Promise<PonenteDetalle[]> {
  return apiFetch<PonenteDetalle[]>("/ponentes/", { auth: false });
}

export function obtenerPonente(id: number): Promise<PonenteDetalle> {
  return apiFetch<PonenteDetalle>(`/ponentes/${id}`, { auth: false });
}

export function crearPonente(payload: {
  usuario_id: number;
  afiliacion?: "interno" | "externo" | "estudiante" | "profesor";
  institucion?: string;
  especialidad?: string;
  biografia?: string;
}): Promise<Ponente> {
  return apiFetch<Ponente>("/ponentes/", {
    method: "POST",
    body: payload,
  });
}

export function actualizarMiPerfilPonente(
  payload: ActualizarPonentePayload,
): Promise<Ponente> {
  return apiFetch<Ponente>("/ponentes/me", {
    method: "PUT",
    body: payload,
  });
}

export function eliminarPonente(id: number): Promise<void> {
  return apiFetch<void>(`/ponentes/${id}`, { method: "DELETE" });
}
