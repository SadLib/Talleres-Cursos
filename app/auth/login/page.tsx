"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      
      {/* CARD */}
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-lg">
        <Image
            src="/images/images.png"
            alt="Logo"
            width={40}
            height={40}
            className="mx-auto mb-2"

          />

        {/* TÍTULO */}
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-2">
          Iniciar sesión
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Accede a tu cuenta
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* EMAIL */}
          <div>
            <label className="text-xs text-gray-600">Correo</label>
            <input
              type="email"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-xs text-gray-600">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 focus:border-blue-500 outline-none py-2 text-sm"
            />
          </div>

          {/* OPCIONES */}
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Recordarme
            </label>

            <button type="button" className="hover:text-blue-600">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            className="bg-yellow-700 text-white py-2 rounded-lg hover:bg-yellow-800 transition"
          >
            Ingresar
          </button>

        </form>

        {/* REGISTRO */}
        <p className="text-center text-xs mt-6">
          No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </p>
        

      </div>
    </div>
  );
}
