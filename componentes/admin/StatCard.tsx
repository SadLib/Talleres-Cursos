interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  color: "blue" | "green" | "yellow" | "purple" | "red";
  sublabel?: string;
}

const colorMap = {
  blue: "bg-blue-50 border-blue-200 text-blue-900",
  green: "bg-emerald-50 border-emerald-200 text-emerald-900",
  yellow: "bg-amber-50 border-amber-200 text-amber-900",
  purple: "bg-violet-50 border-violet-200 text-violet-900",
  red: "bg-red-50 border-red-200 text-red-900",
};

const iconColorMap = {
  blue: "bg-blue-900 text-white",
  green: "bg-emerald-700 text-white",
  yellow: "bg-amber-600 text-white",
  purple: "bg-violet-700 text-white",
  red: "bg-red-600 text-white",
};

export function StatCard({ label, value, icon, color, sublabel }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-5 flex items-center gap-4 shadow-sm transition hover:shadow-md ${colorMap[color]}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconColorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold tabular-nums">{value}</p>
        <p className="text-sm font-medium opacity-80">{label}</p>
        {sublabel && <p className="text-xs opacity-60 mt-0.5">{sublabel}</p>}
      </div>
    </div>
  );
}
