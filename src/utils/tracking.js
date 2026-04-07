import { trackMetaEvent, trackMetaStandardEvent } from './marketing.js';

export function trackEvent(eventName, params = {}) {
  try {
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params });
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    trackMetaEvent(eventName, params);
    if (eventName === 'generate_lead') {
      trackMetaStandardEvent('Lead', params);
    }
  } catch {
    // no-op
  }
}
