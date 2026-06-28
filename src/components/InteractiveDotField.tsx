import { useEffect, useRef } from 'react';

interface Dot {
  ox: number; 
  oy: number;
  x: number; 
  y: number;
  vx: number; 
  vy: number;
}

export function InteractiveDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let dots: Dot[] = [];
    let mouse = { x: -2000, y: -2000, targetX: -2000, targetY: -2000 };
    
    const getCenter = () => ({
      cx: canvas.width * 0.22,
      cy: canvas.height * 0.68,
    });
    
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
      initDots();
    };
    
    const initDots = () => {
      dots = [];
      const { cx, cy } = getCenter();
      const ringSpacing = 20;
      const dotSpacingBase = 18;
      
      // Limit visible rings to a circle of radius ~500px from center
      const maxRadius = 520;
      const numRings = Math.floor(maxRadius / ringSpacing);
      
      for (let r = 1; r <= numRings; r++) {
        const radius = r * ringSpacing;
        const circumference = 2 * Math.PI * radius;
        const numDots = Math.max(6, Math.floor(circumference / dotSpacingBase));
        
        for (let i = 0; i < numDots; i++) {
          const angle = (i / numDots) * Math.PI * 2;
          const ox = cx + Math.cos(angle) * radius;
          const oy = cy + Math.sin(angle) * radius;
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 });
        }
      }
    };
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);
    resize();
    
    // Physics constants
    const forceRadius = 180;
    const forceStrength = 0.9;
    const returnStrength = 0.055;
    const damping = 0.82;
    
    const animate = () => {
      // Ease mouse position for smoother interaction
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;
      
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      
      const { cx, cy } = getCenter();
      
      for (const p of dots) {
        // Calculate distance from mouse for repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (mDist < forceRadius && mDist > 0) {
          const force = (1 - mDist / forceRadius) * forceStrength;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }
        
        // Spring return back to original position
        p.vx += (p.ox - p.x) * returnStrength;
        p.vy += (p.oy - p.y) * returnStrength;
        // Apply damping so they don't bounce forever
        p.vx *= damping;
        p.vy *= damping;
        
        p.x += p.vx;
        p.y += p.vy;
        
        // Calculate opacity based on distance from the center origin
        const originDx = p.ox - cx;
        const originDy = p.oy - cy;
        const originDist = Math.sqrt(originDx * originDx + originDy * originDy);
        
        const maxFade = 500;
        let opacity = (1 - originDist / maxFade) * 0.38;
        
        // Give them an extra brightness boost when close to the cursor
        if (mDist < forceRadius * 1.5) {
          const boost = (1 - mDist / (forceRadius * 1.5)) * 0.15;
          opacity += boost;
        }
        
        opacity = Math.max(0, Math.min(0.45, opacity));
        if (opacity < 0.005) continue;
        
        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(195, 215, 255, ${opacity})`;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen', zIndex: 0 }}
    />
  );
}
