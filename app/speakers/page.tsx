"use client";

import { useState } from "react";
import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import SpeakerCard from "@/componentes/ponente/SpeakerCard";

import { speakersData } from "@/lib/data";

export default function SpeakersPage() {
  const [search, setSearch] = useState("");

  const filteredSpeakers = speakersData.filter((speaker) =>
    speaker.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* 🔵 HEADER */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-400 to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3">
            Nuestros Ponentes
          </h1>
          <p className="text-xl font-light text-blue-100">
            Conoce a los especialistas que imparten nuestros talleres
          </p>
        </div>
      </section>

      {/* 🔍 BUSCADOR */}
      <section className="bg-gray-100 py-6 flex justify-center px-6">
        <div className="bg-white shadow-sm rounded-xl p-4 w-full max-w-3xl flex gap-4 items-center border border-gray-100">
          
          <span className="text-gray-500 text-sm whitespace-nowrap font-medium">
            {filteredSpeakers.length} ponentes
          </span>

          <div className="flex-1 relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
            />
          </div>

          <span className="text-gray-400 text-sm whitespace-nowrap hidden sm:inline">
            Ordenado por nombre
          </span>
        </div>
      </section>

      {/* 👨‍🏫 GRID */}
      <section className="py-10 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>

        {filteredSpeakers.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No se encontraron ponentes
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}
