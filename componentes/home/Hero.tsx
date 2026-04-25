import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-gray-50 flex justify-center px-0 md:px-6 pb-4 md:pb-8">
      <div className="relative w-full max-w-7xl h-[500px] md:h-[600px] rounded-none md:rounded-b-[0.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        <Image
          src="/images/Bienvenidos.png"
          alt="Bienvenido a la plataforma de inscripción a talleres y cursos de MAC"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Oscurecimiento sutil para legibilidad del texto sin afectar el color original de la imagen */}


        {/* Contenedor del texto centrado */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-4xl px-6 relative z-10 w-full animate-[fadeInUp_0.8s_ease-out_both]">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-xl leading-tight">
              Plataforma de inscripción a talleres y cursos de MAC
            </h1>
            <p className="text-gray-100 mt-6 text-lg md:text-xl font-medium drop-shadow-md">
              Desarrolla tus habilidades con los mejores especialistas.
            </p>
            <div className="mt-8 pointer-events-auto flex justify-center gap-4">
              <Link
                href="/courses"
                className="bg-yellow-600 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-yellow-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                Explorar talleres
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/speakers"
                className="bg-white/15 backdrop-blur-sm text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/25 transition-all border border-white/30 shadow-lg inline-flex items-center gap-2"
              >
                Ver instructores
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
