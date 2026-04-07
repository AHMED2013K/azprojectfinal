export function trackEvent(eventName, params = {}) {
  try {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, params);
    }
  } catch {
    // no-op
  }
}
