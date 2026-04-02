"use client";

import { useState } from "react";
import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import WorkshopCard from "@/componentes/home/WorkshopCard";

import { workshopsData } from "@/lib/data";

export default function CoursesPage() {
  const [search, setSearch] = useState("");

  // 🔍 FILTRO
  const filteredCourses = workshopsData.filter((course) =>
    course.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* 🔵 HEADER */}
      <section className="bg-blue-900 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Catálogo de Talleres
        </h1>

        <p className="text-lg">
          Explora nuestra oferta y encuentra el perfecto para ti
        </p>
      </section>

      {/* 🔍 BUSCADOR */}
      <section className="bg-gray-100 py-6 flex justify-center">
        <div className="bg-white shadow rounded-lg p-4 w-full max-w-3xl flex gap-4 items-center">
          
          <span className="text-gray-600 text-sm">
            {filteredCourses.length} talleres encontrados
          </span>

          <input
            type="text"
            placeholder="Buscar curso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded px-3 py-2 outline-none"
          />

          <span className="text-gray-500 text-sm">
            Ordenado por fecha
          </span>
        </div>
      </section>

      {/* 📚 LISTA DE CURSOS */}
      <section className="py-10 px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredCourses.map((course) => (
            <WorkshopCard
              key={course.id}
              workshop={course}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No se encontraron cursos
          </p>
        )}
      </section>

      <Footer />
    </>
  );
}
