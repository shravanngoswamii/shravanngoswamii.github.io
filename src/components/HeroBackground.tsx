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
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 300 : 1200; // Dense mist
    const MOUSE_RADIUS = 200; 
    const DRAG = 0.95; // Fluid viscosity (0.9=thick, 0.99=thin)
    const GRAVITY_X = 0.2; // Constant wind flow
    const GRAVITY_Y = 0.05; // Slight drop

    let particles: AerosolParticle[] = [];
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, prevX: -1000, prevY: -1000 };

    class AerosolParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2; // Varying mist sizes
        this.maxLife = Math.random() * 100 + 50;
        this.life = Math.random() * this.maxLife;
      }

      update() {
        // 1. MOUSE INTERACTION (Injection/Spray)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            const angle = Math.atan2(dy, dx);
            const burst = 4; // Spray power

            // Push away + Add Mouse Velocity (Drag effect)
            this.vx -= Math.cos(angle) * burst * force * 0.5;
            this.vy -= Math.sin(angle) * burst * force * 0.5;
            
            this.vx += mouse.vx * 0.1 * force;
            this.vy += mouse.vy * 0.1 * force;
        }

        // 2. PHYSICS
        this.vx *= DRAG;
        this.vy *= DRAG;
        
        // Constant "Wind Tunnel" flow
        this.vx += GRAVITY_X;
        this.vy += GRAVITY_Y;

        this.x += this.vx;
        this.y += this.vy;

        // 3. WRAPPING (Infinite Stream)
        if (this.x > width) {
            this.x = -10;
            this.y = Math.random() * height;
            this.vx = Math.random() * 2;
        }
        if (this.x < -10) this.x = width + 10;
        if (this.y > height) this.y = -10;
        if (this.y < -10) this.y = height + 10;
      }

      draw(context: CanvasRenderingContext2D) {
        const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        const alpha = Math.min(speed / 5, 0.6); // Faster = more visible (Compression)
        
        context.beginPath();
        
        // "Mechanical" rendering:
        // Draw lines for fast particles, dots for slow ones
        if (speed > 3) {
            context.moveTo(this.x, this.y);
            context.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
            context.lineWidth = this.size * 0.5;
            context.strokeStyle = `rgba(160, 170, 180, ${alpha})`;
            context.stroke();
        } else {
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fillStyle = `rgba(140, 150, 160, ${alpha * 0.8})`;
            context.fill();
        }
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new AerosolParticle());
      }
    };

    const animate = () => {
      // Create trails using semi-transparent clear
      ctx.fillStyle = 'rgba(var(--color-fill), 0.2)'; // Assumes dark/light background
      // Use composite operation to ensure trails fade correctly on any background color
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0, 0, 0, 0.15)`; // Trail Fade Rate
      ctx.fillRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = 'source-over'; // Reset

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
      // Calculate velocity
      mouse.vx = (e.clientX - rect.left) - mouse.prevX;
      mouse.vy = (e.clientY - rect.top) - mouse.prevY;
      mouse.prevX = mouse.x = e.clientX - rect.left;
      mouse.prevY = mouse.y = e.clientY - rect.top;
    };

    // Passive listeners for performance
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      style={{ opacity: 0.9 }} 
    />
  );
};

export default HeroBackground;
