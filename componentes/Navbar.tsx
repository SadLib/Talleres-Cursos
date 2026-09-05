"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { logout, me } from "@/lib/api/auth";
import { getToken } from "@/lib/api/client";
import type { Usuario } from "@/lib/api/types";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<Usuario | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 🔐 Detectar sesión activa leyendo el token de localStorage
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      setIsLoggedIn(!!token);
      if (token) {
        try {
          const user = await me();
          setUserData(user);
        } catch (error) {
          console.error("Error fetching user data in Navbar:", error);
        }
      } else {
        setUserData(null);
      }
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push("/auth/login");
  };



  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/courses", label: "Talleres" },
    { href: "/speakers", label: "Instructores" },
    { href: "/ayuda", label: "Ayuda" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight">MAC</h1>

        {/* ENLACES CENTRADOS — DESKTOP */}
        <div className="hidden md:flex gap-8 items-center absolute left-1/2 transform -translate-x-1/2 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-yellow-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-4 items-center">

          {/* 🔥 SI NO HAY SESIÓN ACTIVA */}
          {!isLoggedIn && (
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

          {/* 🔥 SI HAY SESIÓN ACTIVA */}
          {isLoggedIn && (
            <div className="relative" ref={dropdownRef}>

              {/* FOTO */}
              <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <Image
                  src={userData?.foto_url || "/images/user.jpg"}
                  alt="perfil"
                  width={40}
                  height={40}
                  className="rounded-full object-cover aspect-square w-11 h-11 border border-gray-200"
                />
              </button>

              {/* DROPDOWN */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 border border-gray-100 animate-[fadeInUp_0.15s_ease-out_both]">

                  {/* PERFIL */}
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Perfil
                  </Link>

                  {/* MIS TALLERES */}
                  <Link
                    href="/dashboard/profile?tab=talleres"
                    className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Mis Talleres
                  </Link>

                  {/* CERTIFICADOS */}
                  <Link
                    href="/dashboard/profile?tab=certificados"
                    className="block px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Certificados
                  </Link>

                  {/* LOGOUT */}
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-500 cursor-pointer transition-colors"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {/* HAMBURGUESA — MOBILE */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 my-1 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-inner animate-[fadeInUp_0.2s_ease-out_both]">
          <div className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
