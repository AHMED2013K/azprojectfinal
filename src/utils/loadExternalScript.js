const scriptPromises = new Map();

export function loadExternalScript(src, { async = true, defer = true } = {}) {
  if (typeof window === 'undefined') {
    return Promise.resolve(null);
  }

  if (scriptPromises.has(src)) {
    return scriptPromises.get(src);
  }

  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) {
    const ready = Promise.resolve(existing);
    scriptPromises.set(src, ready);
    return ready;
  }

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });

  scriptPromises.set(src, promise);
  return promise;
}

export async function loadVantaDependencies() {
  await loadExternalScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
  await loadExternalScript('https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.net.min.js');
}
