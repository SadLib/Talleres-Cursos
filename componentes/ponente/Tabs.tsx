type TabsProps = {
  setTab: (tab: string) => void;
};

export default function Tabs({ setTab }: TabsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <button onClick={() => setTab("datos")}>Mis datos</button>
      <button onClick={() => setTab("cursos")}>Mis cursos</button>
    </div>
  );
}