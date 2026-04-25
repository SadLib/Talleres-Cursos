import Link from "next/link";
import { workshopsData } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CourseDetail({ params }: Props) {
  const { id } = await params;
  const taller = workshopsData.find((w) => w.id === parseInt(id));

  if (!taller) {
    return (
      <div className="bg-[#f2f9ff] min-h-screen p-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Taller no encontrado</h2>
        <Link href="/ponente/dashboard" className="text-blue-600 hover:text-blue-800 underline mt-4 inline-block">
          Volver al panel
        </Link>
      </div>
    );
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
            <span>🗓️ {taller.fecha}</span>
            <span>⏱️ {taller.duracion}</span>
            <span>📍 {taller.ubicacion}</span>
            {taller.modalidad && <span>📡 {taller.modalidad}</span>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/ponente/dashboard/courses/${id}/alumnos`}
              className="bg-blue-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-800 transition text-center shadow-sm"
            >
              📋 Ver participantes
            </Link>
            <Link
              href={`/ponente/dashboard/courses/${id}/edit`}
              className="bg-yellow-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-yellow-700 transition text-center shadow-sm"
            >
              ✏️ Editar taller
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
