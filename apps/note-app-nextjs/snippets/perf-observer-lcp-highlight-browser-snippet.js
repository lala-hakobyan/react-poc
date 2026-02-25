// LCP Element Highlighting Browser Snippet

(() => {
  const valueToRating = (ms) =>
    ms <= 2500 ? "good" : ms <= 4000 ? "needs-improvement" : "poor";

  const RATING = {
    good: { icon: "🟢", color: "#0CCE6A" },
    "needs-improvement": { icon: "🟠", color: "#FFA400" },
    poor: { icon: "🔴", color: "#FF4E42" },
  };

  const getActivationStart = () => {
    const navEntry = performance.getEntriesByType("navigation")[0];
    return navEntry?.activationStart || 0;
  };

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];

    if (!lastEntry) return;

    const activationStart = getActivationStart();
    const lcpTime = Math.max(0, lastEntry.startTime - activationStart);
    const rating = valueToRating(lcpTime);
    const { icon, color } = RATING[rating];
    const lcpDisplayTime = (lcpTime / 1000).toFixed(2);

    console.group(
      `%cLCP: ${icon} ${lcpDisplayTime}s (${rating})`,
      `color: ${color}; font-weight: bold; font-size: 14px;`
    );

    // Element info
    const element = lastEntry.element;
    if (element) {
      // Highlight element
      element.style.border = `5px dashed ${color}`;
      console.log(lastEntry.element);
      console.dir(lastEntry);
    }

    console.groupEnd();
  });

  observer.observe({ type: "largest-contentful-paint", buffered: true });

  console.log(
    "%c⏱️ LCP Tracking Active: LCP may update as larger elements load.",
    "font-weight: bold; font-size: 14px;"
  );
})();
