import React, { useEffect, useRef } from 'react';

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // --- CONFIGURATION ---
    const PARTICLE_COUNT = 3000;    // High density for "Silk" look
    const NOISE_SCALE = 0.003;      // Smoothness of the flow (Lower = larger curves)
    const SPEED = 1.5;              // Flow speed
    const FADE_RATE = 0.04;         // How fast trails vanish (Lower = longer trails)
    const MOUSE_FORCE = 50;         // Power of interaction

    // --- STATE ---
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    // --- PERLIN NOISE IMPLEMENTATION (Simplified) ---
    // A fast pseudo-random gradient noise generator for the vector field
    const noiseVector = (x: number, y: number) => {
      // Simple pseudo-random hash
      const sinX = Math.sin(x);
      const cosY = Math.cos(y);
      return Math.sin(sinX * 12.9898 + cosY * 78.233) * 43758.5453;
    };

    // Smoother noise function
    const getFlowAngle = (x: number, y: number) => {
        const angle = (Math.cos(x * NOISE_SCALE) + Math.sin(y * NOISE_SCALE)) * Math.PI * 2;
        return angle;
    };

    // --- PARTICLE CLASS ---
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      history: {x: number, y: number}[];
      age: number;
      lifeSpan: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.history = [];
        this.age = 0;
        this.lifeSpan = Math.random() * 200 + 50;
      }

      update() {
        // 1. GET FIELD VECTOR
        // Calculate the natural flow angle at this position
        const angle = getFlowAngle(this.x, this.y);
        
        // Convert angle to velocity
        const targetVx = Math.cos(angle) * SPEED;
        const targetVy = Math.sin(angle) * SPEED;

        // 2. MOUSE INTERACTION
        // If mouse is near, disrupt the flow vector
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
            const force = (200 - dist) / 200;
            this.vx += (dx / dist) * force * -MOUSE_FORCE * 0.1; // Push away
            this.vy += (dy / dist) * force * -MOUSE_FORCE * 0.1;
        }

        // 3. APPLY PHYSICS
        // Blend current velocity with field velocity (Inertia)
        this.vx += (targetVx - this.vx) * 0.1;
        this.vy += (targetVy - this.vy) * 0.1;

        this.x += this.vx;
        this.y += this.vy;

        // 4. LIFECYCLE
        this.age++;
        
        // Reset if off screen or too old
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height || this.age > this.lifeSpan) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.age = 0;
            this.vx = 0; 
            this.vy = 0;
            this.history = []; // Clear trail
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Draw the current segment
        // We draw short lines instead of points to create the "Silk" effect
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
        
        // Opacity based on speed and age
        const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        const alpha = Math.min(speed * 0.2, 0.5) * (1 - this.age/this.lifeSpan);
        
        // Color: Mix of Chemistry (Cyan) and Biology (Organic White/Green)
        // Using a "Silver-Cyan" tint for premium feel
        ctx.strokeStyle = `rgba(100, 150, 160, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // FADE EFFECT (Crucial for the "Silk" look)
      // Instead of clearing, we draw a semi-transparent rect.
      // This leaves trails of previous frames.
      
      // Use "destination-in" to fade out existing pixels to alpha 0 over time
      // This is cleaner than drawing a colored rect which can look muddy
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - FADE_RATE})`; // e.g. 0.96 keeps 96% of the old pixel
      ctx.fillRect(0, 0, width, height);

      // Reset to drawing mode
      ctx.globalCompositeOperation = 'lighter'; // Additive blending makes overlaps glow

      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      style={{ opacity: 0.8 }} 
    />
  );
};

export default HeroBackground;
