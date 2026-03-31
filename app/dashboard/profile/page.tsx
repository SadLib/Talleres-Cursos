"use client";

import { useState } from "react";
import Tabs from "@/componentes/profile/Tabs";
import Datos from "@/componentes/profile/Datos";
import Talleres from "@/componentes/profile/Talleres";
import Certificados from "@/componentes/profile/Certificados";

export default function ProfilePage() {
  const [tab, setTab] = useState("datos");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>

      <Tabs setTab={setTab} />

      {tab === "datos" && <Datos />}
      {tab === "talleres" && <Talleres />}
      {tab === "certificados" && <Certificados />}
    </div>
  );
}