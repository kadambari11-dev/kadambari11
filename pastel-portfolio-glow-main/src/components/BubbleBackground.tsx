import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
}

const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 100 + 50,
          left: Math.random() * 100,
          delay: Math.random() * 10,
          duration: Math.random() * 10 + 15,
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            background: `radial-gradient(circle at 30% 30%, hsl(var(--pastel-lavender)), hsl(var(--pastel-mint)))`,
            animation: `bubble-float ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
            bottom: `-${bubble.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default BubbleBackground;
