import { useEffect, useRef } from "react";

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Fetch CSS variables
    const style = getComputedStyle(document.documentElement);
    const starColor1 = style.getPropertyValue('--star-color-1').trim() || '#ffffff';
    const starColor2 = style.getPropertyValue('--star-color-2').trim() || '#c3d7ff';
    const starColor3 = style.getPropertyValue('--star-color-3').trim() || '#6ea8ff';
    const starMinSize = parseFloat(style.getPropertyValue('--star-min-size')) || 1;
    const starMaxSize = parseFloat(style.getPropertyValue('--star-max-size')) || 2;
    const opacityMin = parseFloat(style.getPropertyValue('--star-opacity-min')) || 0.05;
    const opacityMax = parseFloat(style.getPropertyValue('--star-opacity-max')) || 0.25;
    const twinkleMin = parseFloat(style.getPropertyValue('--star-twinkle-speed-min')) || 2;
    const twinkleMax = parseFloat(style.getPropertyValue('--star-twinkle-speed-max')) || 6;
    const starCount = parseInt(style.getPropertyValue('--star-count')) || 500;
    const parallaxIntensity = parseFloat(style.getPropertyValue('--parallax-intensity')) || 0.3;

    const colors = [starColor1, starColor2, starColor3];
    
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
    };

    interface Star {
      x: number;
      y: number;
      z: number;
      size: number;
      colorRgb: string;
      baseOpacity: number;
      twinklePhase: number;
      twinkleSpeed: number;
      isBright: boolean;
    }

    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      const padding = 100;
      
      for (let i = 0; i < starCount; i++) {
        let bx, by;
        // 20% slightly center-biased, 80% uniform
        if (Math.random() < 0.2) {
            bx = (Math.random() + Math.random() + Math.random()) / 3;
            by = (Math.random() + Math.random() + Math.random()) / 3;
        } else {
            bx = Math.random();
            by = Math.random();
        }
        
        const x = -padding + bx * (width + padding * 2);
        const y = -padding + by * (height + padding * 2);

        const isBright = Math.random() < 0.02; 
        
        const starSize = isBright 
           ? starMaxSize * (1.1 + Math.random() * 0.4) 
           : starMinSize + Math.random() * (starMaxSize - starMinSize);
        
        const starOpacity = isBright 
           ? opacityMax + 0.1 
           : opacityMin + Math.random() * (opacityMax - opacityMin);

        const z = 1 + Math.random() * 5; 

        // 60fps assumption
        const secondsToCycle = twinkleMin + Math.random() * (twinkleMax - twinkleMin);
        const twinkleSpeed = (Math.PI * 2) / (secondsToCycle * 60);

        stars.push({
          x,
          y,
          z,
          size: starSize,
          colorRgb: hexToRgb(colors[Math.floor(Math.random() * colors.length)]),
          baseOpacity: starOpacity,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed,
          isBright,
        });
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      initStars();
    };

    window.addEventListener('resize', resize);
    resize();

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentScrollY = window.scrollY;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    
    const onScroll = () => {
      currentScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    const draw = () => {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = (mouseX - width / 2) * parallaxIntensity;
      const parallaxY = (mouseY - height / 2) * parallaxIntensity;

      ctx.clearRect(0, 0, width, height);

      stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const currentOpacity = star.baseOpacity + Math.sin(star.twinklePhase) * star.baseOpacity * 0.5;

        star.x -= 0.05 / star.z;
        if (star.x < -100) {
          star.x = width + 100;
          star.y = -100 + Math.random() * (height + 200);
        }

        const px = star.x - (parallaxX / star.z);
        const py = star.y - (parallaxY / star.z);
        
        // Draw subtle halo for bright stars
        if (star.isBright) {
          ctx.beginPath();
          ctx.arc(px, py, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.colorRgb}, ${currentOpacity * 0.5})`;
          ctx.fill();
        }
        
        // Draw crisp core
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        // Boost core alpha slightly to ensure visibility against dark background
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, currentOpacity * 1.5)})`;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
