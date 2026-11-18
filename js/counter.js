document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const animationDuration = 1000;

  const animateCounter = (counter) => {
    const rawTarget = counter.getAttribute("data-target").trim();
    const target = parseFloat(rawTarget);
    const suffix = counter.getAttribute("data-suffix") || "";

    const decimalPart = rawTarget.split(".")[1];
    const decimals = decimalPart ? decimalPart.length : 0;

    const formatter = new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    const formatValue = (num) => formatter.format(num).replace(",", ".");
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = easeOutProgress * target;

      counter.innerText = formatValue(currentNumber) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        counter.innerText = formatValue(target) + suffix;
      }
    };

    requestAnimationFrame(updateNumber);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
});
