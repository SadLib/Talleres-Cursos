import { apiFetch } from "./client";

export type Carrera = { id: number; nombre: string };

export function listarCarreras(): Promise<Carrera[]> {
  return apiFetch<Carrera[]>("/carreras", { auth: false });
}
