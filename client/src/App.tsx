import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CandidateSection from "./components/CandidateSection";
import ProgramSection from "./components/ProgramSection";
import ManifestSection from "./components/ManifestSection";
import SocialSection from "./components/SocialSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="font-sans bg-[#f2f2f2]">
      <Navbar />
      <Hero />
      <CandidateSection />
      <ProgramSection />
      <ManifestSection />
      <SocialSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
