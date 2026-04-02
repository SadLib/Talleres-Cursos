"use client";

import { useState } from "react";
import { TabMisTalleres } from "@/componentes/ponente/TabMisTalleres";
import { TabCrearTaller } from "@/componentes/ponente/TabCrearTaller";
import { TabMiPerfil } from "@/componentes/ponente/TabMiPerfil";

export default function PonenteDashboard() {
  const [activeTab, setActiveTab] = useState("talleres");

  // Simulando usuario
  const user = {
    name: "Juan Pérez",
    specialty: "IA y Machine Learning"
  };

  return (
    <div className="bg-[#f2f9ff] min-h-screen">
      
      {/* HERO */}
      <div className="bg-[#00287f] text-white p-8 flex items-center gap-6 shadow-md relative z-10">
        <div className="w-20 h-20 bg-gray-300 rounded-full border-2 border-white shadow-sm overflow-hidden flex justify-center items-center text-gray-500 font-bold text-2xl">
          {/* Avatar Placeholder */}
          J
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-1">
            Panel del Ponente
          </h1>
          <p className="text-blue-100 text-lg">Bienvenido, {user.name}</p>
          <p className="text-sm text-yellow-400 font-medium">{user.specialty}</p>
        </div>
      </div>

      {/* SUB NAV */}
      <div className="bg-white shadow flex gap-8 px-10 py-0 border-b border-gray-200 text-sm font-medium">
        <button
          onClick={() => setActiveTab("talleres")}
          className={`py-4 border-b-2 transition-colors ${
            activeTab === "talleres" 
            ? "border-yellow-600 text-yellow-600" 
            : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Mis Talleres
        </button>

        <button
          onClick={() => setActiveTab("crear")}
          className={`py-4 border-b-2 transition-colors ${
            activeTab === "crear" 
            ? "border-yellow-600 text-yellow-600" 
            : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Crear Taller
        </button>

        <button
          onClick={() => setActiveTab("perfil")}
          className={`py-4 border-b-2 transition-colors ${
            activeTab === "perfil" 
            ? "border-yellow-600 text-yellow-600" 
            : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Mi Perfil
        </button>
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
