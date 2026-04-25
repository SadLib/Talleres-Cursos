import { apiFetch } from "./client";
import type {
  ActualizarCursoPayload,
  CrearCursoPayload,
  Curso,
  CursoDetalle,
  EstadoCurso,
  Sesion,
  Temario,
} from "./types";

export function listarCursos(params?: {
  estado?: EstadoCurso;
  skip?: number;
  limit?: number;
}): Promise<Curso[]> {
  return apiFetch<Curso[]>("/cursos/", { auth: false, query: params });
}

export function obtenerCurso(id: number): Promise<CursoDetalle> {
  return apiFetch<CursoDetalle>(`/cursos/${id}`, { auth: false });
}

export function crearCurso(payload: CrearCursoPayload): Promise<CursoDetalle> {
  return apiFetch<CursoDetalle>("/cursos/", {
    method: "POST",
    body: payload,
  });
}

export function actualizarCurso(
  id: number,
  payload: ActualizarCursoPayload,
): Promise<CursoDetalle> {
  return apiFetch<CursoDetalle>(`/cursos/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function eliminarCurso(id: number): Promise<void> {
  return apiFetch<void>(`/cursos/${id}`, { method: "DELETE" });
}

export function listarSesiones(cursoId: number): Promise<Sesion[]> {
  return apiFetch<Sesion[]>(`/cursos/${cursoId}/sesiones`, { auth: false });
}

export function agregarSesion(
  cursoId: number,
  payload: {
    numero_sesion: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
  },
): Promise<Sesion> {
  return apiFetch<Sesion>(`/cursos/${cursoId}/sesiones`, {
    method: "POST",
    body: payload,
  });
}

export function agregarTema(
  cursoId: number,
  payload: { orden: number; tema: string },
): Promise<Temario> {
  return apiFetch<Temario>(`/cursos/${cursoId}/temario`, {
    method: "POST",
    body: payload,
  });
}
