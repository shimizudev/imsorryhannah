import React, { useEffect, useState } from "react";

const CherryBlossomConfetti = () => {
  const [particles, setParticles] = useState([]);

  const createParticle = () => {
    console.log("Creating particle");
    const shapes = ["circle", "petal1", "petal2", "heart"];
    return {
      id: Math.random(),
      x: Math.random() * -10,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 4,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * 360,
      speed: Math.random() * 2 + 1,
    };
  };

  useEffect(() => {
    console.log("Component mounted");
    const particleCount = 50;
    const initialParticles = Array.from(
      { length: particleCount },
      createParticle
    );
    console.log("Initial particles:", initialParticles);
    setParticles(initialParticles);

    const animationFrame = setInterval(() => {
      setParticles((prevParticles) => {
        console.log("Animating particles...");
        return prevParticles.map((particle) => {
          const newX = particle.x + particle.speed;
          const newY = particle.y + particle.speed * 0.5;

          if (newX > window.innerWidth || newY > window.innerHeight) {
            console.log("Particle out of bounds, recreating...");
            return createParticle();
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            rotation: particle.rotation + 1,
          };
        });
      });
    }, 16);

    return () => {
      clearInterval(animationFrame);
      console.log("Component unmounted, interval cleared.");
    };
  }, []);

  const renderShape = (shape) => {
    switch (shape) {
      case "circle":
        return <circle cx="5" cy="5" r="5" />;
      case "petal1":
        return <path d="M5,0 C10,0 10,10 5,10 C0,10 0,0 5,0" />;
      case "petal2":
        return <path d="M0,5 C0,0 10,0 10,5 C10,10 0,10 0,5" />;
      case "heart":
        return (
          <path d="M5,10 C2.5,7.5 0,5 0,2.5 C0,1 2.5,0 5,2.5 C7.5,0 10,1 10,2.5 C10,5 7.5,7.5 5,10" />
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {particles.map((particle) => (
        <svg
          key={particle.id}
          style={{
            position: "absolute",
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg)`,
            fill: "#e77896",
            transition: "transform 0.1s linear",
            zIndex: 9999,
          }}
          viewBox="0 0 10 10"
          preserveAspectRatio="xMidYMid meet"
        >
          {renderShape(particle.shape)}
        </svg>
      ))}
    </div>
  );
};

export default CherryBlossomConfetti;
