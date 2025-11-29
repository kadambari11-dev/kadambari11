import { useState } from "react";
import htmlLogo from "@/assets/logos/html.png";
import cssLogo from "@/assets/logos/css.png";
import jsLogo from "@/assets/logos/js.png";
import cLogo from "@/assets/logos/c.svg";
import cppLogo from "@/assets/logos/cpp.png";
import pythonLogo from "@/assets/logos/python.png";
import canvaLogo from "@/assets/logos/canva.png";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const skills = [
  { name: "HTML", color: "#E34F26", info: "Semantic HTML5 markup for structured content", logo: htmlLogo },
  { name: "CSS", color: "#1572B6", info: "Modern CSS3 with animations and responsive design", logo: cssLogo },
  { name: "JavaScript", color: "#F7DF1E", info: "ES6+ JavaScript for interactive applications", logo: jsLogo },
  { name: "C", color: "#A8B9CC", info: "System programming and efficient algorithms", logo: cLogo },
  { name: "C++", color: "#00599C", info: "Object-oriented programming and performance", logo: cppLogo },
 
  { name: "Python", color: "#3776AB", info: "Data science, automation, and web development", logo: pythonLogo },
  { name: "Canva", color: "#00C4CC", info: "Professional graphic design and branding", logo: canvaLogo },
];

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState<typeof skills[0] | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">Skills</h2>
          <p className="text-muted-foreground text-lg">Technologies I work with</p>
        </div>

        <div className="max-w-4xl mx-auto flex justify-center items-center">
          <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center">
            <div className="absolute inset-0 animate-spin-slow">
              {skills.map((skill, idx) => {
                const angle = (idx / skills.length) * 2 * Math.PI;
                const radius = 200;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <div
                    key={skill.name}
                    className="absolute top-1/2 left-1/2 transition-all duration-300"
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) ${
                        hoveredSkill === skill.name ? "scale(1.3)" : "scale(1)"
                      }`,
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-glow transition-all duration-300 border-2 border-background bg-transparent"
                    >
                      <img
                        src={(skill as any).logo}
                        alt={skill.name}
                        className="w-12 h-12 object-contain select-none"
                        draggable={false}
                      />
                    </div>
                    {hoveredSkill === skill.name && (
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap shadow-lg border border-primary/20">
                        {skill.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center z-10 bg-background/80 backdrop-blur-sm rounded-full p-8 border-2 border-primary/20">
              <h3 className="text-2xl font-bold text-gradient">Skill Stack</h3>
              <p className="text-sm text-muted-foreground mt-2">Hover & Click</p>
            </div>
          </div>
        </div>

        <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gradient">{selectedSkill?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto bg-transparent">
                <img
                  src={(selectedSkill as any)?.logo}
                  alt={selectedSkill?.name}
                  className="w-14 h-14 object-contain select-none"
                />
              </div>
              <p className="text-muted-foreground text-center">{selectedSkill?.info}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Skills;
