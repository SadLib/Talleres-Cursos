import Navbar from "@/componentes/Navbar";
import Hero from "@/componentes/home/Hero";
import WorkshopsSection from "@/componentes/home/WorkshopSection";
import Footer from "@/componentes/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WorkshopsSection />
      <Footer />
    </main>
  );
}

