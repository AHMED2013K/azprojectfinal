import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    // Dynamically load VANTA and Three.js
    const loadVanta = async () => {
      if (!window.THREE && !vantaRef.current.vanta) {
        // Load Three.js
        if (!document.querySelector('script[src*="three.min.js"]')) {
          const threeScript = document.createElement('script');
          threeScript.src = 'https://cdn.skypack.dev/three@0.134.0/build/three.min.js';
          threeScript.async = true;
          document.head.appendChild(threeScript);
          
          await new Promise((resolve) => {
            threeScript.onload = resolve;
          });
        }

        // Load VANTA.NET
        if (!document.querySelector('script[src*="vanta.net.min.js"]')) {
          const vantaScript = document.createElement('script');
          vantaScript.src = 'https://cdn.skypack.dev/vanta@0.5.24/dist/vanta.net.min.js';
          vantaScript.async = true;
          document.head.appendChild(vantaScript);
          
          await new Promise((resolve) => {
            vantaScript.onload = resolve;
          });
        }

        // Wait a bit for scripts to be ready
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Initialize VANTA if element ready and not already initialized
      if (vantaRef.current && !vantaRef.current.vanta?.NET && window.VANTA?.NET) {
        vantaRef.current.vanta = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x175c7d,      // Brand blue
          backgroundColor: 0x0a0f1e, // Dark premium slate
          maxDistance: 20.00,
          spacing: 15.00,        // Subtle density
          showDots: false
        });
      }
    };

    loadVanta();

    return () => {
      // Cleanup
      if (vantaRef.current?.vanta) {
        vantaRef.current.vanta.destroy();
      }
    };
  }, []);

  return (
    <div 
      ref={vantaRef}
      className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/80 to-slate-900"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;

