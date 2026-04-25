export type Rol = {
  id: number;
  nombre: string;
};

export type Usuario = {
  id: number;
  numero_cuenta: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string | null;
  correo: string;
  telefono: string | null;
  carrera?: string | null;
  semestre?: string | null;
  activo: boolean;
  created_at: string;
  roles: Rol[];
};

export type LoginPayload = {
  correo: string;
  password: string;
};

export type RegisterPayload = {
  numero_cuenta: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido?: string | null;
  correo: string;
  telefono?: string | null;
  password: string;
  roles?: string[];
};

export type Token = {
  access_token: string;
  token_type: string;
};

export type Modalidad = "presencial" | "en_linea" | "hibrido";
export type EstadoCurso =
  | "borrador"
  | "pendiente"
  | "aprobado"
  | "concluido"
  | "cancelado";

export type Curso = {
  id: number;
  nombre: string;
  descripcion: string | null;
  modalidad: Modalidad | null;
  ubicacion: string | null;
  cupo_total: number;
  estado: EstadoCurso;
  created_at: string;
  cupos_disponibles: number;
};

export type Temario = {
  id: number;
  orden: number;
  tema: string;
};

export type Sesion = {
  id: number;
  taller_id: number;
  numero_sesion: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
};

export type Ponente = {
  id: number;
  usuario_id: number;
  afiliacion: "interno" | "externo" | "estudiante" | "profesor" | null;
  institucion: string | null;
  especialidad: string | null;
  biografia: string | null;
};

export type PonenteDetalle = Ponente & { usuario: Usuario };

export type CursoDetalle = Curso & {
  ponentes: Ponente[];
  temario: Temario[];
  sesiones: Sesion[];
};

export type EstadoInscripcion = "activa" | "cancelada" | "baja";

export type Inscripcion = {
  id: number;
  usuario_id: number;
  taller_id: number;
  estado: EstadoInscripcion;
  fecha_inscripcion: string;
};

export type InscripcionDetalle = Inscripcion & { taller: Curso };

export type CrearCursoPayload = {
  nombre: string;
  descripcion?: string;
  modalidad?: Modalidad;
  ubicacion?: string;
  cupo_total: number;
  estado?: EstadoCurso;
  ponentes_ids?: number[];
  temario?: { orden: number; tema: string }[];
  sesiones?: {
    numero_sesion: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
  }[];
};

export type ActualizarCursoPayload = Partial<{
  nombre: string;
  descripcion: string;
  modalidad: Modalidad;
  ubicacion: string;
  cupo_total: number;
  estado: EstadoCurso;
}>;

export type ActualizarUsuarioPayload = Partial<{
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  telefono: string;
  carrera: string;
  semestre: string;
  activo: boolean;
}>;

export type ActualizarPonentePayload = Partial<{
  afiliacion: "interno" | "externo" | "estudiante" | "profesor";
  institucion: string;
  especialidad: string;
  biografia: string;
}>;

export type MensajeRespuesta = { mensaje: string };
