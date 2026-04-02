type Workshop = {
  id: number;
  nombre: string;
  ponente: string;
  fecha: string;
  duracion: string;
  ubicacion: string;
  isEnrolled?: boolean;
};

export default function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      {/* Imagen */}
      <div className="h-32 bg-gray-200 rounded mb-4" />

      {/* Info */}
      <h3 className="font-bold text-lg">{workshop.nombre}</h3>
      <p className="text-sm text-gray-500">{workshop.ponente}</p>
      <p className="text-sm">{workshop.fecha}</p>
      <p className="text-sm">{workshop.duracion}</p>
      <p className="text-sm mb-4">{workshop.ubicacion}</p>

      {/* Botones */}
      <div className="mt-auto space-y-2">
        <button className="w-full bg-[#00287f] text-white py-2 rounded">
          Ver detalles
        </button>

        {workshop.isEnrolled && (
          <button className="w-full border border-red-500 text-red-500 py-2 rounded hover:bg-red-50">
            Cancelar inscripción
          </button>
        )}
      </div>
    </div>
  );
}
