"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // 🔐 SIMULACIÓN
  const user = {
    name: "Juan",
    image: "/images/user.jpg",
    role: "ponente", // 👈 🔥 IMPORTANTE
    // role: "user" también puede ser
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      
      <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight">MAC</h1>

      {/* ENLACES CENTRADOS */}
      <div className="hidden md:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2 font-medium text-gray-700">
        <Link href="/" className="hover:text-yellow-600 transition-colors">Inicio</Link>
        <Link href="/courses" className="hover:text-yellow-600 transition-colors">Talleres</Link>
        <Link href="/speakers" className="hover:text-yellow-600 transition-colors">Ponentes</Link>
      </div>

      <div className="flex gap-4 items-center">

        {/* 🔥 SI NO HAY USUARIO */}
        {!user && (
          <>
            <Link
              href="/auth/login"
              className="font-medium text-gray-700 hover:text-yellow-600 transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-900 text-white font-medium px-5 py-2 rounded-full hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              Registrarse
            </Link>
          </>
        )}

        {/* 🔥 SI HAY USUARIO */}
        {user && (
          <div className="relative">
            
            {/* FOTO */}
            <button onClick={() => setIsOpen(!isOpen)}>
              <Image
                src={user.image}
                alt="perfil"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </button>

            {/* DROPDOWN */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                
                {/* PERFIL */}
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Perfil
                </Link>

                {/* 🔥 SOLO SI ES PONENTE */}
                {user.role === "ponente" && (
                  <Link
                    href="/dashboard/ponente"
                    className="block px-4 py-2 hover:bg-gray-100 rounded"
                  >
                    Panel ponente
                  </Link>
                )}

                {/* LOGOUT */}
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-500"
                  onClick={() => {
                    console.log("Cerrar sesión");
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      </div>
    </nav>
  );
}




