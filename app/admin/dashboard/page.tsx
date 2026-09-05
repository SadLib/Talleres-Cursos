"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { TabResumen } from "@/componentes/admin/TabResumen";
import { TabGestionUsuarios } from "@/componentes/admin/TabGestionUsuarios";
import { TabGestionCursos } from "@/componentes/admin/TabGestionCursos";
import { TabRevisionContenidos } from "@/componentes/admin/TabRevisionContenidos";
import { TabGestionPonentes } from "@/componentes/admin/TabGestionPonentes";
import { TabConstancias } from "@/componentes/admin/TabConstancias";
import { me } from "@/lib/api/auth";

type TabId = "resumen" | "usuarios" | "cursos" | "revision" | "ponentes" | "constancias";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "resumen",
    label: "Resumen",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "usuarios",
    label: "Usuarios",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "cursos",
    label: "Cursos",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "revision",
    label: "Revisión",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "ponentes",
    label: "Ponentes",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "constancias",
    label: "Constancias",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("resumen");
  const [adminName, setAdminName] = useState("Administrador");
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    me()
      .then((usuario) => {
        const roles = usuario.roles?.map((r) => r.nombre) ?? [];
        if (!roles.includes("admin")) {
          router.replace("/auth/login");
          return;
        }
        setAdminName(`${usuario.nombre} ${usuario.primer_apellido}`);
        setAuthChecked(true);
      })
      .catch(() => {
        router.replace("/auth/login");
      });
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f9ff]">
        <svg className="w-10 h-10 text-blue-600 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-[#f2f9ff] min-h-screen">

      {/* HERO */}
      <div className="bg-blue-950 text-white relative z-10 overflow-hidden shadow-md">
        <Image
          src="/images/fondo3.png"
          alt="Fondo"
          fill
          className="object-cover object-center opacity-90 pointer-events-none"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-10 py-10 flex items-center gap-6">
          {/* Avatar Admin */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-900 rounded-full border-2 border-white/30 shadow-lg overflow-hidden flex justify-center items-center flex-shrink-0">
            <svg className="w-10 h-10 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>

          <div>
            <h1 className="text-3xl text-blue-800 font-bold mb-1">
              Panel de Administración
            </h1>
            <p className="text-blue-000 text-lg">Bienvenido, {adminName}</p>
            <p className="text-sm text-blue-998 font-medium">Panel de Administración del Sistema</p>
          </div>
        </div>
      </div>

      {/* SUB NAV */}
      <div className="bg-white shadow border-b border-gray-200 text-sm font-medium overflow-x-auto">
        <div className="max-w-7xl mx-auto px-10 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "border-yellow-600 text-yellow-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        {activeTab === "resumen"   && <TabResumen />}
        {activeTab === "usuarios"  && <TabGestionUsuarios />}
        {activeTab === "cursos"    && <TabGestionCursos />}
        {activeTab === "revision"  && <TabRevisionContenidos />}
        {activeTab === "ponentes"     && <TabGestionPonentes />}
        {activeTab === "constancias"  && <TabConstancias />}
      </div>
    </div>
  );
}
