import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Certificates from "@/components/Certificates";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import BubbleBackground from "@/components/BubbleBackground";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="relative">
      <BubbleBackground />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Gallery />
        <Certificates />
        <Skills />
        <Contact />
      </main>
      <footer className="py-8 text-center text-muted-foreground border-t border-border/50">
        <p>© 2025 Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
