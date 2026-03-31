type TabsProps = {
  setTab: (tab: string) => void;
};


export default function Tabs({ setTab }: TabsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <button onClick={() => setTab("datos")}>Datos</button>
      <button onClick={() => setTab("talleres")}>Talleres</button>
      <button onClick={() => setTab("certificados")}>Certificados</button>
    </div>
  );
}