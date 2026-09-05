"use client";

import { useState, useEffect } from "react";
import {
  listarCursos, crearCurso, eliminarCurso, agregarTema,
  listarInscripcionesTaller, type InscritoUsuario,
} from "@/lib/api/cursos";
import { EditarCursoModal } from "./EditarCursoModal";
import type { Curso, EstadoCurso } from "@/lib/api/types";

const ESTADO_BADGE: Record<EstadoCurso, string> = {
  borrador: "bg-gray-100 text-gray-600 border-gray-200",
  pendiente: "bg-amber-50 text-amber-700 border-amber-200",
  aprobado: "bg-emerald-50 text-emerald-700 border-emerald-200",
  concluido: "bg-blue-50 text-blue-700 border-blue-200",
  cancelado: "bg-red-50 text-red-600 border-red-200",
};

const ESTADO_LABEL: Record<EstadoCurso, string> = {
  borrador: "Borrador",
  pendiente: "Pendiente",
  aprobado: "Aprobado",
  concluido: "Concluido",
  cancelado: "Cancelado",
};

function ModalInscritos({ curso, onClose }: { curso: Curso; onClose: () => void }) {
  const [inscritos, setInscritos] = useState<InscritoUsuario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listarInscripcionesTaller(curso.id)
      .then(setInscritos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [curso.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-xl relative max-h-[85vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 cursor-pointer">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-0.5">Usuarios Inscritos</h2>
        <p className="text-sm text-gray-500 mb-5">{curso.nombre}</p>

        {loading ? (
          <div className="flex justify-center py-10">
            <svg className="w-8 h-8 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : inscritos.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No hay usuarios inscritos aún.</p>
        ) : (
          <div className="overflow-y-auto flex-1">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Nombre</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-600 hidden sm:table-cell">Correo</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-gray-600">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inscritos.map((i) => (
                  <tr key={i.id} className="hover:bg-gray-50/60">
                    <td className="px-4 py-2.5 font-medium text-gray-800">{i.nombre} {i.primer_apellido}</td>
                    <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell text-xs">{i.correo}</td>
                    <td className="px-4 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                        i.estado === "activa" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        i.estado === "cancelada" ? "bg-red-50 text-red-600 border-red-200" :
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }`}>{i.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 mt-4 text-right">
          <button onClick={onClose} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium cursor-pointer">Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export function TabGestionCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [filtro, setFiltro] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<EstadoCurso | "">("");
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState<Curso | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Curso | null>(null);
  const [verInscritos, setVerInscritos] = useState<Curso | null>(null);
  const [showCrear, setShowCrear] = useState(false);

  const [nuevoForm, setNuevoForm] = useState({
    nombre: "", descripcion: "", detalles: "",
    modalidad: "", ubicacion: "", cupo_total: "",
    fechaInicio: "", fechaFin: "", horaInicio: "", horaFin: "",
    numeroSesiones: "", temario: "",
  });
  const [creando, setCreando] = useState(false);
  const [crearError, setCrearError] = useState<string | null>(null);

  const cargar = () => {
    setLoading(true);
    listarCursos({ limit: 500 })
      .then(setCursos)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, []);

  const handleDelete = async (curso: Curso) => {
    try {
      await eliminarCurso(curso.id);
      setCursos((prev) => prev.filter((c) => c.id !== curso.id));
    } catch {
      alert("Error al eliminar el curso.");
    } finally {
      setConfirmDelete(null);
    }
  };

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreando(true);
    setCrearError(null);
    try {
      const nuevo = await crearCurso({
        nombre: nuevoForm.nombre,
        descripcion: nuevoForm.descripcion || undefined,
        detalles: nuevoForm.detalles || undefined,
        modalidad: nuevoForm.modalidad as "presencial" | "en_linea" | "hibrido" | undefined,
        ubicacion: nuevoForm.ubicacion || undefined,
        fecha_inicio: nuevoForm.fechaInicio || undefined,
        fecha_fin: nuevoForm.fechaFin || undefined,
        hora_inicio: nuevoForm.horaInicio || undefined,
        hora_fin: nuevoForm.horaFin || undefined,
        numero_sesiones: nuevoForm.numeroSesiones ? parseInt(nuevoForm.numeroSesiones) : undefined,
        cupo_total: parseInt(nuevoForm.cupo_total) || 30,
        estado: "borrador",
      });

      if (nuevoForm.temario.trim()) {
        const temas = nuevoForm.temario.split("\n").map((t) => t.trim()).filter(Boolean);
        for (let i = 0; i < temas.length; i++) {
          await agregarTema(nuevo.id, { orden: i + 1, tema: temas[i] });
        }
      }

      setCursos((prev) => [nuevo as unknown as Curso, ...prev]);
      setNuevoForm({ nombre: "", descripcion: "", detalles: "", modalidad: "", ubicacion: "", cupo_total: "", fechaInicio: "", fechaFin: "", horaInicio: "", horaFin: "", numeroSesiones: "", temario: "" });
      setShowCrear(false);
    } catch {
      setCrearError("Error al crear el curso.");
    } finally {
      setCreando(false);
    }
  };

  const filtrados = cursos.filter((c) => {
    const term = filtro.toLowerCase();
    const matchText = c.nombre?.toLowerCase().includes(term) || c.ubicacion?.toLowerCase().includes(term);
    const matchEstado = filtroEstado === "" || c.estado === filtroEstado;
    return matchText && matchEstado;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header + crear */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Gestión de Cursos</h2>
            <p className="text-sm text-gray-500 mt-0.5">Administra todo el catálogo de talleres y cursos de la plataforma.</p>
          </div>
          <button
            onClick={() => setShowCrear(!showCrear)}
            className="bg-blue-900 text-white font-medium px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showCrear ? "Cancelar" : "Crear nuevo curso"}
          </button>
        </div>

        {/* Formulario crear completo */}
        {showCrear && (
          <form onSubmit={handleCrear} className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-5 space-y-4">
            <h3 className="font-semibold text-blue-900 text-base">Nuevo Curso / Taller</h3>
            {crearError && <p className="text-red-600 text-sm">{crearError}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre <span className="text-red-500">*</span></label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                  value={nuevoForm.nombre} onChange={(e) => setNuevoForm({ ...nuevoForm, nombre: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación / Enlace</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                  value={nuevoForm.ubicacion} onChange={(e) => setNuevoForm({ ...nuevoForm, ubicacion: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                value={nuevoForm.descripcion} onChange={(e) => setNuevoForm({ ...nuevoForm, descripcion: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                  value={nuevoForm.fechaInicio} onChange={(e) => setNuevoForm({ ...nuevoForm, fechaInicio: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                  value={nuevoForm.fechaFin} onChange={(e) => setNuevoForm({ ...nuevoForm, fechaFin: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora Inicio</label>
                <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                  value={nuevoForm.horaInicio} onChange={(e) => setNuevoForm({ ...nuevoForm, horaInicio: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fin</label>
                <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                  value={nuevoForm.horaFin} onChange={(e) => setNuevoForm({ ...nuevoForm, horaFin: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Sesiones</label>
                <input type="number" min="1" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                  value={nuevoForm.numeroSesiones} onChange={(e) => setNuevoForm({ ...nuevoForm, numeroSesiones: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cupos máximos <span className="text-red-500">*</span></label>
                <input type="number" min="1" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                  value={nuevoForm.cupo_total} onChange={(e) => setNuevoForm({ ...nuevoForm, cupo_total: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-900"
                value={nuevoForm.modalidad} onChange={(e) => setNuevoForm({ ...nuevoForm, modalidad: e.target.value })}>
                <option value="">Seleccionar...</option>
                <option value="presencial">Presencial</option>
                <option value="en_linea">En Línea</option>
                <option value="hibrido">Híbrido</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temario</label>
              <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                placeholder="Un tema por línea..."
                value={nuevoForm.temario} onChange={(e) => setNuevoForm({ ...nuevoForm, temario: e.target.value })} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Requisitos / Detalles</label>
              <textarea rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                value={nuevoForm.detalles} onChange={(e) => setNuevoForm({ ...nuevoForm, detalles: e.target.value })} />
            </div>

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => setShowCrear(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">Cancelar</button>
              <button type="submit" disabled={creando} className="px-5 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 cursor-pointer disabled:opacity-60">
                {creando ? "Creando..." : "Crear Curso"}
              </button>
            </div>
          </form>
        )}

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Buscar por nombre..." className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
              value={filtro} onChange={(e) => setFiltro(e.target.value)} />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-900"
            value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value as EstadoCurso | "")}>
            <option value="">Todos los estados</option>
            <option value="borrador">Borrador</option>
            <option value="pendiente">Pendiente</option>
            <option value="aprobado">Aprobado</option>
            <option value="concluido">Concluido</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Nombre</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Modalidad</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 hidden lg:table-cell">Inscritos / Cupos</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Estado</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">No se encontraron cursos.</td>
                </tr>
              ) : (
                filtrados.map((curso) => {
                  const inscritos = (curso.cupo_total ?? 0) - (curso.cupos_disponibles ?? curso.cupo_total ?? 0);
                  return (
                    <tr key={curso.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-semibold text-gray-800">{curso.nombre}</p>
                        {curso.ubicacion && <p className="text-xs text-gray-500">{curso.ubicacion}</p>}
                      </td>
                      <td className="px-5 py-3 text-gray-600 capitalize hidden md:table-cell">
                        {curso.modalidad?.replace("_", " ") ?? "—"}
                      </td>
                      <td className="px-5 py-3 hidden lg:table-cell">
                        <span className="text-gray-700 font-medium">{inscritos}</span>
                        <span className="text-gray-400">/{curso.cupo_total}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${ESTADO_BADGE[curso.estado]}`}>
                          {ESTADO_LABEL[curso.estado]}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setVerInscritos(curso)} title="Ver inscritos" className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          <button onClick={() => setEditando(curso)} title="Editar" className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button onClick={() => setConfirmDelete(curso)} title="Eliminar" className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal editar */}
      {editando && (
        <EditarCursoModal
          curso={editando}
          onClose={() => setEditando(null)}
          onSaved={(updated) => {
            setCursos((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            setEditando(null);
          }}
        />
      )}

      {/* Modal inscritos */}
      {verInscritos && (
        <ModalInscritos curso={verInscritos} onClose={() => setVerInscritos(null)} />
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Eliminar curso</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">¿Eliminar <strong>{confirmDelete.nombre}</strong>? Esta acción no se puede deshacer.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer">Cancelar</button>
              <button onClick={() => handleDelete(confirmDelete)} className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors cursor-pointer">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
