"use client";

import { useState, useEffect } from "react";
import { listarUsuarios, actualizarUsuario, eliminarUsuario } from "@/lib/api/usuarios";
import { EditarUsuarioModal } from "./EditarUsuarioModal";
import type { Usuario } from "@/lib/api/types";

const ROLES_DISPLAY: Record<string, string> = {
  admin: "Administrador",
  ponente: "Ponente",
  usuario: "Usuario",
};

const ROLE_BADGE: Record<string, string> = {
  admin: "bg-violet-100 text-violet-800 border-violet-200",
  ponente: "bg-blue-100 text-blue-800 border-blue-200",
  usuario: "bg-gray-100 text-gray-700 border-gray-200",
};

export function TabGestionUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Usuario | null>(null);

  const cargarUsuarios = () => {
    setLoading(true);
    listarUsuarios({ limit: 500 })
      .then(setUsuarios)
      .catch(() => setError("No se pudieron cargar los usuarios."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const toggleActivo = async (usuario: Usuario) => {
    try {
      const updated = await actualizarUsuario(usuario.id, { activo: !usuario.activo });
      setUsuarios((prev) => prev.map((u) => (u.id === usuario.id ? { ...u, activo: updated.activo } : u)));
    } catch {
      alert("Error al actualizar el estado del usuario.");
    }
  };

  const handleDelete = async (usuario: Usuario) => {
    try {
      await eliminarUsuario(usuario.id);
      setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
    } catch {
      alert("Error al eliminar el usuario.");
    } finally {
      setConfirmDelete(null);
    }
  };

  const filtrados = usuarios.filter((u) => {
    const term = filtro.toLowerCase();
    return (
      u.nombre?.toLowerCase().includes(term) ||
      u.primer_apellido?.toLowerCase().includes(term) ||
      u.correo?.toLowerCase().includes(term) ||
      u.numero_cuenta?.toLowerCase().includes(term)
    );
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Gestión de Usuarios</h2>
          <p className="text-sm text-gray-500 mt-0.5">Administra cuentas, roles y acceso de todos los usuarios registrados.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre, correo..."
            className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Usuario</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">N° Cuenta</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Rol(es)</th>
              <th className="text-center px-4 py-3 font-semibold text-gray-600">Estado</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-400">No se encontraron usuarios.</td>
              </tr>
            ) : (
              filtrados.map((usuario) => (
                <tr key={usuario.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-800">{usuario.nombre} {usuario.primer_apellido}</p>
                    <p className="text-xs text-gray-500">{usuario.correo}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell font-mono text-xs">{usuario.numero_cuenta}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {usuario.roles?.length > 0 ? (
                        usuario.roles.map((r) => (
                          <span key={r.id} className={`text-xs px-2 py-0.5 rounded-full border font-medium ${ROLE_BADGE[r.nombre] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                            {ROLES_DISPLAY[r.nombre] ?? r.nombre}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">Sin rol</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleActivo(usuario)}
                      title={usuario.activo ? "Suspender cuenta" : "Activar cuenta"}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                        usuario.activo
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${usuario.activo ? "bg-emerald-500" : "bg-red-500"}`} />
                      {usuario.activo ? "Activo" : "Suspendido"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Editar */}
                      <button
                        onClick={() => setEditando(usuario)}
                        title="Editar perfil"
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      {/* Eliminar */}
                      <button
                        onClick={() => setConfirmDelete(usuario)}
                        title="Eliminar cuenta"
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal editar */}
      {editando && (
        <EditarUsuarioModal
          usuario={editando}
          onClose={() => setEditando(null)}
          onSaved={(updated) => {
            setUsuarios((prev) => prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
            setEditando(null);
          }}
        />
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Eliminar cuenta</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              ¿Estás seguro de eliminar la cuenta de <strong>{confirmDelete.nombre} {confirmDelete.primer_apellido}</strong>? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition-colors cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
