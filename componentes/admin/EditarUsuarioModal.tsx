"use client";

import { useState } from "react";
import type { Usuario } from "@/lib/api/types";
import { actualizarUsuario } from "@/lib/api/usuarios";
import { ApiError } from "@/lib/api/client";

interface EditarUsuarioModalProps {
  usuario: Usuario;
  onClose: () => void;
  onSaved: (updated: Usuario) => void;
}

export function EditarUsuarioModal({ usuario, onClose, onSaved }: EditarUsuarioModalProps) {
  const [form, setForm] = useState({
    nombre: usuario.nombre ?? "",
    primer_apellido: usuario.primer_apellido ?? "",
    segundo_apellido: usuario.segundo_apellido ?? "",
    correo: usuario.correo ?? "",
    telefono: usuario.telefono ?? "",
    numero_cuenta: usuario.numero_cuenta ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const updated = await actualizarUsuario(usuario.id, {
        nombre: form.nombre.trim(),
        primer_apellido: form.primer_apellido.trim(),
        segundo_apellido: form.segundo_apellido.trim() || undefined,
        telefono: form.telefono.trim() || undefined,
        numero_cuenta: form.numero_cuenta.trim() || undefined,
      });
      onSaved(updated);
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("No se pudieron guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-1">Editar Perfil de Usuario</h2>
        <p className="text-sm text-gray-500 mb-6">Modifica los datos del usuario seleccionado.</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre(s)</label>
              <input
                type="text" required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primer Apellido</label>
              <input
                type="text" required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.primer_apellido}
                onChange={(e) => setForm({ ...form, primer_apellido: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Segundo Apellido</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.segundo_apellido}
                onChange={(e) => setForm({ ...form, segundo_apellido: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 opacity-70 cursor-default"
                value={form.correo}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
              value={form.numero_cuenta}
              onChange={(e) => setForm({ ...form, numero_cuenta: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 text-sm font-medium transition-colors cursor-pointer disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
