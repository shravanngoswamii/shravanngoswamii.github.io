import React, { useEffect, useRef } from "react";

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let rafId = 0;
    let isDarkTheme =
      document.documentElement.getAttribute("data-theme") === "dark";

    // --- CONFIGURATION ---
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 300 : 1000;
    const MOUSE_RADIUS = isMobile ? 120 : 170;
    const BURST_FORCE = isMobile ? 5.0 : 6.2;
    const VELOCITY_INFLUENCE = isMobile ? 0.12 : 0.18;
    const DRAG = 0.955; // Fluid viscosity (0.9=thick, 0.99=thin)
    const GRAVITY_X = 0.24; // Constant wind flow
    const GRAVITY_Y = 0.06; // Slight drop

    const getPalette = () =>
      isDarkTheme
        ? {
            stroke: [160, 170, 180],
            fill: [140, 150, 160],
            trailFade: 0.15,
            blend: "screen",
          }
        : {
            stroke: [105, 115, 125],
            fill: [90, 100, 112],
            trailFade: 0.12,
            blend: "multiply",
          };

    let palette = getPalette();

    const applyThemeVisuals = () => {
      isDarkTheme = document.documentElement.getAttribute("data-theme") === "dark";
      palette = getPalette();
      canvas.style.mixBlendMode = palette.blend;
    };

    applyThemeVisuals();

    let particles: AerosolParticle[] = [];
    const mouse = {
      x: -1000,
      y: -1000,
      vx: 0,
      vy: 0,
      prevX: -1000,
      prevY: -1000,
    };

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
        this.vx = (Math.random() - 0.5) * 2.4;
        this.vy = (Math.random() - 0.5) * 2.4;
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
          const normalized = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const coreBoost = dist < MOUSE_RADIUS * 0.35 ? 1.5 : 1;
          const force = Math.pow(normalized, 2) * coreBoost;
          const angle = Math.atan2(dy, dx);

          // Push away + Add Mouse Velocity (Drag effect)
          this.vx -= Math.cos(angle) * BURST_FORCE * force * 0.55;
          this.vy -= Math.sin(angle) * BURST_FORCE * force * 0.55;

          this.vx += mouse.vx * VELOCITY_INFLUENCE * force;
          this.vy += mouse.vy * VELOCITY_INFLUENCE * force;

          // Keep a small "no-touch" bubble around cursor center.
          if (dist < 18) {
            this.vx -= Math.cos(angle) * 1.8;
            this.vy -= Math.sin(angle) * 1.8;
          }
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

      draw(context: CanvasRenderingContext2D, pal: ReturnType<typeof getPalette>) {
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const alpha = Math.min(speed / 5, 0.6); // Faster = more visible (Compression)

        context.beginPath();

        if (speed > 3) {
          context.moveTo(this.x, this.y);
          context.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
          context.lineWidth = this.size * 0.5;
          context.strokeStyle = `rgba(${pal.stroke[0]}, ${pal.stroke[1]}, ${pal.stroke[2]}, ${alpha})`;
          context.stroke();
        } else {
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          context.fillStyle = `rgba(${pal.fill[0]}, ${pal.fill[1]}, ${pal.fill[2]}, ${alpha * 0.8})`;
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
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0, 0, 0, ${palette.trailFade})`;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx, palette);
      }

      rafId = requestAnimationFrame(animate);
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
      mouse.vx = Math.max(-30, Math.min(30, e.clientX - rect.left - mouse.prevX));
      mouse.vy = Math.max(-30, Math.min(30, e.clientY - rect.top - mouse.prevY));
      mouse.prevX = mouse.x = e.clientX - rect.left;
      mouse.prevY = mouse.y = e.clientY - rect.top;
    };

    const themeObserver = new MutationObserver(applyThemeVisuals);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-90"
    />
  );
};

export default HeroBackground;
