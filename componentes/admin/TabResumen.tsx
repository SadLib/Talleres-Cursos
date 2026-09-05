"use client";

import { useState, useEffect } from "react";
import { StatCard } from "./StatCard";
import { listarUsuarios } from "@/lib/api/usuarios";
import { listarCursos } from "@/lib/api/cursos";
import { listarPonentes } from "@/lib/api/ponentes";
import type { Usuario, Curso } from "@/lib/api/types";

export function TabResumen() {
  const [stats, setStats] = useState({ usuarios: 0, cursos: 0, pendientes: 0, ponentes: 0, inscritos: 0 });
  const [pendientes, setPendientes] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      listarUsuarios({ limit: 500 }),
      listarCursos({ limit: 500 }),
      listarCursos({ estado: "pendiente", limit: 100 }),
      listarPonentes(),
    ])
      .then(([usuarios, cursos, cursosP, ponentes]) => {
        const activos = cursos.filter((c) => c.estado === "aprobado");
        setStats({
          usuarios: usuarios.length,
          cursos: activos.length,
          pendientes: cursosP.length,
          ponentes: ponentes.length,
          inscritos: activos.reduce((acc: number, c: Curso) => acc + (c.cupo_total - c.cupos_disponibles), 0),
        });
        setPendientes(cursosP.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Usuarios registrados"
          value={stats.usuarios}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <StatCard
          label="Cursos activos"
          value={stats.cursos}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        />
        <StatCard
          label="Inscritos totales"
          value={stats.inscritos}
          color="purple"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        <StatCard
          label="Ponentes registrados"
          value={stats.ponentes}
          color="yellow"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
      </div>

      {/* Revisión pendiente */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Cursos en revisión</h2>
            <p className="text-sm text-gray-500 mt-0.5">Propuestas recibidas de instructores pendientes de aprobación.</p>
          </div>
          {stats.pendientes > 0 && (
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
              {stats.pendientes} pendientes
            </span>
          )}
        </div>

        {pendientes.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">Todo al día — no hay propuestas pendientes</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pendientes.map((curso) => (
              <div key={curso.id} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{curso.nombre}</p>
                  <p className="text-xs text-gray-500 mt-0.5 capitalize">{curso.modalidad ?? "Sin modalidad"} · {curso.cupo_total} cupos</p>
                </div>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-3 py-1 rounded-full font-medium">
                  Pendiente
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Aprobar contenidos", desc: "Revisa las propuestas de instructores", color: "border-amber-300 bg-amber-50 text-amber-900", tab: "revision" },
          { label: "Gestionar usuarios", desc: "Administra cuentas y permisos", color: "border-blue-300 bg-blue-50 text-blue-900", tab: "usuarios" },
          { label: "Ver todos los cursos", desc: "Administra el catálogo completo", color: "border-emerald-300 bg-emerald-50 text-emerald-900", tab: "cursos" },
        ].map((item) => (
          <div key={item.tab} className={`rounded-xl border p-5 cursor-default ${item.color}`}>
            <p className="font-bold text-base">{item.label}</p>
            <p className="text-sm opacity-75 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
