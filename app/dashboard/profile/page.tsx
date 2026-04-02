"use client";

import { useState } from "react";
import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";

import ProfileTabs from "@/componentes/profile/ProfileTabs";
import PersonalData from "@/componentes/profile/PersonalData";
import UserWorkshops from "@/componentes/profile/UserWorkshops";
import Certificates from "@/componentes/profile/Certificates";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "personal" | "talleres" | "certificados"
  >("personal");

  return (
    <div className="min-h-screen bg-[#f2f9ff] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
        <p className="text-gray-600 mb-6">
          Gestiona tu información y revisa tus talleres
        </p>

        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === "personal" && <PersonalData />}
          {activeTab === "talleres" && <UserWorkshops />}
          {activeTab === "certificados" && <Certificates />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
