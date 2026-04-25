import { apiFetch } from "./client";
import type { ActualizarUsuarioPayload, Usuario } from "./types";

export function listarUsuarios(params?: {
  skip?: number;
  limit?: number;
}): Promise<Usuario[]> {
  return apiFetch<Usuario[]>("/usuarios/", { query: params });
}

export function obtenerUsuario(id: number): Promise<Usuario> {
  return apiFetch<Usuario>(`/usuarios/${id}`);
}

export function actualizarUsuario(
  id: number,
  payload: ActualizarUsuarioPayload,
): Promise<Usuario> {
  return apiFetch<Usuario>(`/usuarios/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function eliminarUsuario(id: number): Promise<void> {
  return apiFetch<void>(`/usuarios/${id}`, { method: "DELETE" });
}
