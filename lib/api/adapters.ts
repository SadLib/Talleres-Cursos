import type { Workshop, Speaker } from "@/lib/data";
import type { Curso, PonenteDetalle } from "./types";

// Meses en español para formatear fechas
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function formatFecha(fecha: string | null | undefined): string {
  if (!fecha) return "Por definir";
  try {
    const [year, month, day] = fecha.split("-");
    return `${parseInt(day)} de ${MESES[parseInt(month) - 1]}, ${year}`;
  } catch {
    return fecha;
  }
}

function formatHorario(horaInicio: string | null | undefined, horaFin: string | null | undefined): string {
  if (!horaInicio) return "Por definir";
  const ini = horaInicio.substring(0, 5);
  const fin = horaFin ? horaFin.substring(0, 5) : "";
  return fin ? `${ini} - ${fin} hrs` : `${ini} hrs`;
}

function formatModalidad(m: string | null | undefined): string {
  if (!m) return "";
  const map: Record<string, string> = {
    en_linea: "En Línea",
    presencial: "Presencial",
    hibrido: "Híbrida",
  };
  return map[m] ?? m;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cursoToWorkshop(curso: any): Workshop {
  const instructores: Array<{ id?: number; nombre?: string; especialidad?: string }> =
    curso.instructores ?? curso.ponentes ?? [];
  const primerInstructor = instructores[0];

  return {
    id: curso.id,
    nombre: curso.nombre ?? "",
    ponenteId: null,
    ponenteStr: primerInstructor?.nombre ?? "Por asignar",
    fecha: formatFecha(curso.fecha_inicio),
    duracion: curso.numero_sesiones ? `${curso.numero_sesiones} sesión(es)` : "1 sesión",
    ubicacion: curso.ubicacion ?? "Por definir",
    modalidad: formatModalidad(curso.modalidad),
    horario: formatHorario(curso.hora_inicio, curso.hora_fin),
    temario: (curso.temario ?? []).map((t: { tema: string }) => t.tema),
    cuposDisponibles: curso.cupos_disponibles ?? curso.cupo_total,
    cuposTotal: curso.cupo_total,
    concluido: curso.estado === "concluido" || curso.estado === "cancelado",
    image: curso.imagen_url ?? "/images/BD.jpeg",
    descripcion: curso.descripcion ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instructorToSpeaker(instructor: any): Speaker {
  const usuario = instructor.usuario ?? {};
  const nombre = `${usuario.nombre ?? ""} ${usuario.primer_apellido ?? ""}`.trim();

  return {
    id: instructor.id,
    name: nombre || "Sin nombre",
    career: instructor.institucion ?? instructor.profesion ?? "",
    specialty: instructor.especialidad ?? "",
    description: instructor.biografia ?? "",
    contacts: usuario.correo ?? "",
    image: usuario.foto_url ?? "/images/user.jpg",
  };
}
