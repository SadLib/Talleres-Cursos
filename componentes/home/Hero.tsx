import Image from "next/image";

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
        <div className="text-center max-w-4xl px-6 relative z-10 w-full">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-xl leading-tight">
            Plataforma de inscripción a talleres y cursos de MAC
          </h1>
          <p className="text-blue-50 mt-6 text-lg md:text-xl font-medium drop-shadow-md">
            Desarrolla tus habilidades con los mejores especialistas.
          </p>
        </div>
      </div>

    </section>
  );
}
