"use client";

import { useState } from "react";
import Tabs from "@/componentes/ponente/Tabs";
import DatosPonente from "@/componentes/ponente/DatosPonente";
import CursosList from "@/componentes/ponente/CursosList";

export default function InstructorPage() {
  const [tab, setTab] = useState("datos");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel del Ponente</h1>

      <Tabs setTab={setTab} />

      {tab === "datos" && <DatosPonente />}
      {tab === "cursos" && <CursosList />}
    </div>
  );
}