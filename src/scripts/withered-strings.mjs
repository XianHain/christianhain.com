window.xian = window.xian || {};
xian.witheredStrings = xian.witheredStrings || (function witheredStrings() {
  const main = document.querySelector('[rel="js-withered-strings"]');
  const svgs = document.querySelectorAll('[rel="js-withered-svg"]');
  const transformValue = '-50%';

  svgs.forEach((svg) => {
    const svgHeight = main.offsetHeight * 2;

    svg.setAttribute('rel', 'js-withered-string');
    svg.setAttribute('width', '100vw');
    svg.setAttribute('height', '100vh');
    svg.setAttribute('viewBox', `0 0 100 ${svgHeight}`);
    svg.style.position = 'absolute';
    svg.style.transform = `translate(${transformValue}, ${transformValue}) rotate(${Math.random() * 360}deg)`;
    svg.style.left = `${Math.random() * 300}px`;
    svg.style.top = `${Math.random() * 300}px`;
    svg.style.opacity = Math.random() * .25 + .25;
    svg.style.transition = 'transform 5s linear';

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0);
    line.setAttribute('y1', 0);
    line.setAttribute('x2', 100);
    line.setAttribute('y2', svgHeight);
    line.setAttribute('stroke', 'red');
    line.setAttribute('stroke-width', '4');

    svg.appendChild(line);
  });

  function init() {
    console.log('called')
    for (const svg of svgs) {
      // Get current rotation
      let currentRotation = parseFloat(svg.style.transform.split('rotate(')[1].split('deg')[0]) || 0;

      // Function to update rotation
      function updateRotation() {
        console.log('called');

        // Rotate 36 degrees per loop
        currentRotation += 1;
        svg.style.transform = `translate(${transformValue}, ${transformValue}) rotate(${currentRotation}deg)`;
      }

      // Start rotating
      setInterval(updateRotation, .5 * 1000);
    }
  }

  return {
    init: init
  }
})();
window.xian.witheredStrings.init();
