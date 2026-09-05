import { apiFetch } from "./client";
import type {
  ActualizarCursoPayload,
  CrearCursoPayload,
  Curso,
  CursoDetalle,
  EstadoCurso,
  Temario,
} from "./types";

export function listarCursos(params?: {
  estado?: EstadoCurso;
  instructor_id?: number;
  skip?: number;
  limit?: number;
}): Promise<Curso[]> {
  return apiFetch<Curso[]>("/talleres", { auth: false, query: params });
}

export function obtenerCurso(id: number): Promise<CursoDetalle> {
  return apiFetch<CursoDetalle>(`/talleres/${id}`, { auth: false });
}

export function crearCurso(payload: CrearCursoPayload): Promise<CursoDetalle> {
  return apiFetch<CursoDetalle>("/talleres", {
    method: "POST",
    body: {
      nombre: payload.nombre,
      descripcion: payload.descripcion,
      detalles: payload.detalles,
      modalidad: payload.modalidad,
      ubicacion: payload.ubicacion,
      fecha_inicio: payload.fecha_inicio,
      fecha_fin: payload.fecha_fin,
      hora_inicio: payload.hora_inicio,
      hora_fin: payload.hora_fin,
      numero_sesiones: payload.numero_sesiones,
      cupo_total: payload.cupo_total,
      estado: payload.estado ?? "pendiente",
    },
  });
}

export function actualizarCurso(
  id: number,
  payload: ActualizarCursoPayload,
): Promise<CursoDetalle> {
  return apiFetch<CursoDetalle>(`/talleres/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export function eliminarCurso(id: number): Promise<void> {
  return apiFetch<void>(`/talleres/${id}`, { method: "DELETE" });
}

export function agregarTema(
  cursoId: number,
  payload: { orden: number; tema: string },
): Promise<Temario> {
  return apiFetch<Temario>(`/talleres/${cursoId}/temario`, {
    method: "POST",
    body: payload,
  });
}

export type InscritoUsuario = {
  id: number;
  usuario_id: number;
  estado: string;
  fecha_inscripcion: string;
  nombre: string;
  primer_apellido: string;
  correo: string;
};

export function listarInscripcionesTaller(tallerID: number): Promise<InscritoUsuario[]> {
  return apiFetch<InscritoUsuario[]>(`/talleres/${tallerID}/inscripciones`);
}

export function asignarInstructor(tallerId: number, instructorId: number): Promise<void> {
  return apiFetch<void>(`/talleres/${tallerId}/instructores/${instructorId}`, { method: "POST" });
}

export function quitarInstructor(tallerId: number, instructorId: number): Promise<void> {
  return apiFetch<void>(`/talleres/${tallerId}/instructores/${instructorId}`, { method: "DELETE" });
}
