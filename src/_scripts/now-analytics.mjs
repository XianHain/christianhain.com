(function() {
  if (typeof IntersectionObserver !== 'undefined') {
    const imageDurations = new Map();
    const viewedImages = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('data-now-image-id');
        const alt = entry.target.getAttribute('data-now-image-alt');
        
        if (id) {
          if (entry.isIntersecting) {
            // Image entered viewport
            imageDurations.set(id, {
              startTime: performance.now(),
              alt: alt
            });

            // Track "Image Viewed" once per session/page load
            if (!viewedImages.has(id)) {
              viewedImages.add(id);
              trackEvent('Now Image Viewed', {
                image_id: id,
                image_alt: alt
              });
            }
          } else {
            // Image left viewport
            const data = imageDurations.get(id);
            if (data && data.startTime) {
              const duration = (performance.now() - data.startTime) / 1000;

              // Only track if viewed for more than .5s
              if (duration > 0.5) {
                trackEvent('Now Image View Duration', {
                  image_id: id,
                  image_alt: data.alt,
                  duration_seconds: parseFloat(duration.toFixed(2))
                });
              }

              imageDurations.delete(id);
            }
          }
        }
      });
    }, {
      // Image is considered "viewed" when 50% visible
      threshold: .5
    });

    function trackEvent(name, properties) {
      // PostHog tracking
      if (window.posthog) {
        window.posthog.capture(name, properties);
      }
      
      // Google Analytics tracking
      if (window.gtag) {
        window.gtag('event', name, properties);
      }
    }

    function init() {
      const images = document.querySelectorAll('[data-now-image-id]');
      images.forEach(img => observer.observe(img));
    }

    // Handle page visibility changes or unload to track the final duration
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        flushDurations();
      }
    });

    window.addEventListener('pagehide', flushDurations);

    function flushDurations() {
      imageDurations.forEach((data, id) => {
        const duration = (performance.now() - data.startTime) / 1000;
        if (duration > 0.5) {
          trackEvent('Now Image View Duration', {
            image_id: id,
            image_alt: data.alt,
            duration_seconds: parseFloat(duration.toFixed(2))
          });
        }
      });
      imageDurations.clear();
    }

    // Initialize on load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();
