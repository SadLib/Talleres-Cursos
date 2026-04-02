import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[550px] overflow-hidden">
      <Image
        src="/images/Unam.jpg"
        alt="hero de la unam"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Efecto viñeta en tonos AZULES transparentes para combinar con el diseño y resaltar la imagen */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00287f]/80 via-[#00287f]/30 to-[#00287f]/70 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-[#00287f]/90 pointer-events-none" />
      
      {/* Contenedor del texto centrado */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center max-w-4xl px-6 relative z-10 w-full animate-[fadeInUp_0.8s_ease-out_both]">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-xl leading-tight">
            Plataforma de inscripción a talleres y cursos de MAC
          </h1>
          <p className="text-blue-50 mt-6 text-lg md:text-xl font-medium drop-shadow-md">
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
              Ver ponentes
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
