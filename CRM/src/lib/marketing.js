const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

let pixelInitialized = false;

export function initMarketing() {
  if (typeof window === 'undefined') {
    return;
  }

  if (!META_PIXEL_ID || pixelInitialized) {
    return;
  }

  ((f, b, e, v, n, t, s) => {
    if (f.fbq) return;
    n = f.fbq = function fbqProxy() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', META_PIXEL_ID);
  pixelInitialized = true;
}

export function trackPageView(path = null) {
  if (typeof window === 'undefined') {
    return;
  }

  const pagePath = path || `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (typeof window.fbq === 'function' && META_PIXEL_ID) {
    window.fbq('track', 'PageView');
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', { page_path: pagePath });
  }
}

export function trackMetaEvent(eventName, params = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.fbq === 'function' && META_PIXEL_ID) {
    window.fbq('trackCustom', eventName, params);
  }
}

export function trackMetaStandardEvent(eventName, params = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.fbq === 'function' && META_PIXEL_ID) {
    window.fbq('track', eventName, params);
  }
}
