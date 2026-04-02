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
      <section className="bg-blue-900 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">
          Nuestros Ponentes
        </h1>
      </section>

      {/* 🔍 BUSCADOR */}
      <section className="bg-gray-100 py-6 flex justify-center">
        <div className="bg-white shadow rounded-lg p-4 w-full max-w-3xl flex gap-4 items-center">
          
          <span className="text-gray-600 text-sm">
            {filteredSpeakers.length} ponentes
          </span>

          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded px-3 py-2 outline-none"
          />

          <span className="text-gray-500 text-sm">
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
