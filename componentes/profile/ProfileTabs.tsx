"use client";

type Tab = "personal" | "talleres" | "certificados";

export default function ProfileTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) {
  const tabs = [
    { id: "personal", label: "Datos Personales" },
    { id: "talleres", label: "Mis Talleres" },
    { id: "certificados", label: "Certificados" },
  ] as const;

  return (
    <div className="bg-white shadow rounded-lg flex overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 py-4 text-sm font-medium transition ${
            activeTab === tab.id
              ? "bg-[#fdf3d7] border-b-4 border-[#c58600]"
              : "hover:bg-gray-50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
