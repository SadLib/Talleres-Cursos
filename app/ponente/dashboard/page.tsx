"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { me } from "@/lib/api/auth";
import { obtenerMiPerfilPonente } from "@/lib/api/ponentes";
import { TabMisTalleres } from "@/componentes/ponente/TabMisTalleres";
import { TabCrearTaller } from "@/componentes/ponente/TabCrearTaller";
import { TabMiPerfil } from "@/componentes/ponente/TabMiPerfil";
import Image from "next/image";

export default function PonenteDashboard() {
  const [activeTab, setActiveTab] = useState("perfil");
  const [authChecked, setAuthChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [userSpecialty, setUserSpecialty] = useState("");
  const [userInitial, setUserInitial] = useState("P");
  const [userFoto, setUserFoto] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    me()
      .then(async (usuario) => {
        const roles = usuario.roles?.map((r) => r.nombre) ?? [];
        if (!roles.includes("ponente")) {
          router.replace("/ponente/auth/login");
          return;
        }
        setUserName(`${usuario.nombre} ${usuario.primer_apellido}`);
        setUserInitial((usuario.nombre?.[0] ?? "P").toUpperCase());
        setUserFoto(usuario.foto_url ?? null);

        try {
          const instructor = await obtenerMiPerfilPonente();
          setUserSpecialty(instructor.especialidad ?? "");
          // Si el perfil de ponente está incompleto, llevar al tab de perfil
          if (!instructor.especialidad && !instructor.afiliacion) {
            setActiveTab("perfil");
          } else {
            setActiveTab("talleres");
          }
        } catch {
          setActiveTab("perfil");
        }

        setAuthChecked(true);
      })
      .catch(() => router.replace("/ponente/auth/login"));
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f2f9ff] flex items-center justify-center">
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
        <Image src="/images/fondo3.png" alt="Fondo" fill className="object-cover object-center opacity-90 pointer-events-none" priority />
        <div className="relative z-10 max-w-7xl mx-auto px-10 py-10 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full border-2 border-white shadow-sm overflow-hidden flex-shrink-0 relative bg-gray-300">
            {userFoto ? (
              <Image src={userFoto} alt={userName} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold text-2xl">
                {userInitial}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl text-white font-bold mb-1">Panel del Ponente</h1>
            <p className="text-blue-200 text-lg">Bienvenido, {userName}</p>
            {userSpecialty && <p className="text-sm text-blue-300 font-medium">{userSpecialty}</p>}
          </div>
        </div>
      </div>

      {/* SUB NAV */}
      <div className="bg-white shadow border-b border-gray-200 text-sm font-medium">
        <div className="max-w-7xl mx-auto px-10 flex gap-8">
          {[
            { key: "talleres", label: "Mis Talleres" },
            { key: "crear", label: "Crear Taller" },
            { key: "perfil", label: "Mi Perfil" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-yellow-600 text-yellow-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENIDO DINÁMICO */}
      <div className="p-10 max-w-7xl mx-auto">
        {activeTab === "talleres" && <TabMisTalleres />}
        {activeTab === "crear" && <TabCrearTaller />}
        {activeTab === "perfil" && <TabMiPerfil />}
      </div>
    </div>
  );
}
