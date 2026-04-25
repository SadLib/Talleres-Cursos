"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";

import ProfileTabs from "@/componentes/profile/ProfileTabs";
import PersonalData from "@/componentes/profile/PersonalData";
import UserWorkshops from "@/componentes/profile/UserWorkshops";
import Certificates from "@/componentes/profile/Certificates";

function ProfileContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<
    "personal" | "talleres" | "certificados"
  >("personal");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "talleres" || tab === "certificados" || tab === "personal") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <>
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
    </>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#f2f9ff] flex flex-col">
      <Suspense fallback={
        <div className="min-h-screen bg-[#f2f9ff] flex flex-col">
          <div className="h-16 bg-white border-b border-gray-100" />
          <div className="max-w-6xl mx-auto w-full px-6 py-10 animate-pulse">
            <div className="h-8 w-40 bg-gray-200 rounded mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded mb-8" />
            <div className="flex gap-6 mb-6">
              <div className="h-10 w-28 bg-gray-200 rounded-lg" />
              <div className="h-10 w-28 bg-gray-200 rounded-lg" />
              <div className="h-10 w-28 bg-gray-200 rounded-lg" />
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-8 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      }>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
