import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f9ff] px-6 text-center">
      
      {/* Decorative gradient blob */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none animate-pulse"></div>

      <div className="relative z-10">
        <h1 className="text-[120px] md:text-[160px] font-extrabold text-blue-900/10 leading-none select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 -mt-6 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o fue movida. Intenta volver al inicio.
        </p>
        <Link
          href="/"
          className="bg-blue-900 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-blue-800 transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
