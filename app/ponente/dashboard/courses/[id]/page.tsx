import Link from "next/link";
import { notFound } from "next/navigation";
import { cursoToWorkshop } from "@/lib/api/adapters";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

type Props = { params: Promise<{ id: string }> };

export default async function CourseDetail({ params }: Props) {
  const { id } = await params;

  let taller;
  try {
    const res = await fetch(`${API}/talleres/${id}`, { cache: "no-store" });
    if (!res.ok) return notFound();
    const data = await res.json();
    taller = cursoToWorkshop(data);
  } catch {
    return notFound();
  }

  return (
    <div className="bg-[#f2f9ff] min-h-screen p-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/ponente/dashboard"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 mb-6 transition-colors"
        >
          ← Volver a mis talleres
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{taller.nombre}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
            <span>Fecha: {taller.fecha}</span>
            <span>Duración: {taller.duracion}</span>
            <span>Ubicación: {taller.ubicacion}</span>
            {taller.modalidad && <span>Modalidad: {taller.modalidad}</span>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/ponente/dashboard/courses/${id}/alumnos`}
              className="bg-blue-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-800 transition text-center shadow-sm"
            >
              Ver participantes
            </Link>
            <Link
              href={`/ponente/dashboard/courses/${id}/edit`}
              className="bg-yellow-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-yellow-700 transition text-center shadow-sm"
            >
              Editar taller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
