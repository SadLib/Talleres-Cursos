import WorkshopCard from "./WorkshopCard";
import Link from "next/link";
import { cursoToWorkshop } from "@/lib/api/adapters";
import type { Workshop } from "@/lib/data";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function getWorkshops(): Promise<Workshop[]> {
  try {
    const res = await fetch(`${API}/talleres`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map(cursoToWorkshop);
  } catch {
    return [];
  }
}

export default async function WorkshopsSection() {
  const workshops = await getWorkshops();

  return (
    <section className="py-16 bg-gray-100 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Eventos Próximos</h2>
        <p className="text-gray-600 mb-10">Descubre los próximos talleres y domina nuevas habilidades</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {workshops.slice(0, 3).map((w) => (
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
