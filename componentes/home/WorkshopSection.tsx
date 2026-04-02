import WorkshopCard from "./WorkshopCard";
import { workshopsData } from "@/lib/data";
import Link from "next/link";

export default function WorkshopsSection() {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          Eventos Próximos
        </h2>

        <p className="text-gray-600 mb-10">
          Descubre los próximos talleres y domina nuevas habilidades
        </p>

        {/* Usando grid con 3 columnas en LG y menos espacio de separación (gap-6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {workshopsData.slice(0, 3).map((w) => (
            <WorkshopCard key={w.id} workshop={w} />
          ))}
        </div>

        <Link 
          href="/courses"
          className="mt-12 inline-block bg-yellow-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-yellow-700 transition shadow-sm hover:shadow-md"
        >
          Ver todos los talleres →
        </Link>
      </div>
    </section>
  );
}
