import { Card, CardContent } from "@/components/ui/card";
import { Code2, Palette, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about creating stunning digital experiences
          </p>
        </div>

        <Card className="max-w-4xl mx-auto card-glass border-primary/20 shadow-card animate-fade-up">
          <CardContent className="p-8 sm:p-12">
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              I'm a creative developer and designer with a passion for crafting beautiful, intuitive digital experiences. 
              With expertise spanning web development, UI/UX design, and creative problem-solving, I bring ideas to life 
              through clean code and thoughtful design.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Code2 className="text-primary" size={32} />
                </div>
                <h3 className="font-semibold text-lg">Clean Code</h3>
                <p className="text-sm text-muted-foreground">
                  Writing maintainable and efficient code
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Palette className="text-primary" size={32} />
                </div>
                <h3 className="font-semibold text-lg">Beautiful Design</h3>
                <p className="text-sm text-muted-foreground">
                  Creating visually stunning interfaces
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="text-primary" size={32} />
                </div>
                <h3 className="font-semibold text-lg">User Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Focusing on intuitive user interactions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
