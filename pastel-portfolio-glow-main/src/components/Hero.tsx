import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadCV = () => {
    // Create a placeholder CV download
    const link = document.createElement("a");
    link.href = "#";
    link.download = "CV.pdf";
    link.click();
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto text-center z-10">
        <div className="flex flex-col items-center space-y-8 animate-fade-up">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl bg-primary/30 animate-glow-pulse" />
            <img
              src={profileImg}
              alt="Profile"
              className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-primary/50 relative z-10 animate-float"
            />
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gradient">
              Hello, I'm Kadambari!
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">
              Creative Developer & Designer | Building Beautiful Digital Experiences
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleDownloadCV}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-soft"
            >
              <Download size={20} />
              Download CV
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-primary text-primary hover:bg-primary/10 gap-2"
            >
              <Mail size={20} />
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
