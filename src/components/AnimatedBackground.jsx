import React, { useEffect, useRef, useState } from 'react';

const AnimatedBackground = ({ delay = 0 }) => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if scripts are already loaded
    const checkScriptsReady = () => {
      return window.THREE && window.VANTA?.NET;
    };

    // If scripts are ready, set ready immediately
    if (checkScriptsReady()) {
      setIsReady(true);
      return;
    }

    // Otherwise, wait for scripts to load
    const checkInterval = setInterval(() => {
      if (checkScriptsReady()) {
        setIsReady(true);
        clearInterval(checkInterval);
      }
    }, 50); // Check every 50ms

    // Fallback timeout in case scripts fail to load
    const fallbackTimer = setTimeout(() => {
      clearInterval(checkInterval);
      setIsReady(true); // Set ready even if scripts failed
    }, 3000); // 3 second fallback

    return () => {
      clearInterval(checkInterval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    // Only initialize VANTA after delay and when scripts are ready
    if (!isReady || !vantaRef.current) return;

    // Wait for scripts to be available
    const initVanta = () => {
      if (!window.THREE || !window.VANTA?.NET) {
        // Retry after a short delay if scripts not ready
        setTimeout(initVanta, 100);
        return;
      }

      // Destroy existing effect
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }

      // VANTA initialization
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3b82f6,
        backgroundColor: 0x0a0f1e,
        points: 12.0,
        maxDistance: 25.0,
        spacing: 16.0,
        showDots: false
      });

      // Resize observer for dynamic viewport changes
      const resizeObserver = new ResizeObserver(() => {
        if (vantaEffect.current) {
          vantaEffect.current.resize();
        }
      });
      if (vantaRef.current) {
        resizeObserver.observe(vantaRef.current);
      }

      return () => {
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }
        resizeObserver.disconnect();
      };
    };

    initVanta();
  }, [isReady]);

  // Don't render until ready to prevent flicker
  if (!isReady) {
    return (
      <div
        className="fixed inset-0 z-0 w-screen h-screen overflow-hidden pointer-events-none bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-900"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0 w-screen h-screen overflow-hidden pointer-events-none bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-900 opacity-100 transition-opacity duration-300"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
