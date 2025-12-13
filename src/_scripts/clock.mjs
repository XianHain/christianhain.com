window.xian = window.xian || {};
xian.clock = xian.clock || (function clock() {

  // function updateClock() {
  //   const now = new Date();
  //   const seconds = now.getSeconds();
  //   const minutes = now.getMinutes();
  //   const hours = now.getHours();
  //
  //   const secondHand = document.querySelector('.second');
  //   const minuteHand = document.querySelector('.minute');
  //   const hourHand = document.querySelector('.hour');
  //
  //   const secondAngle = seconds * 6; // 360 degrees / 60 seconds
  //   const minuteAngle = minutes * 6 + seconds * 0.1; // 360 degrees / 60 minutes + second adjustment
  //   const hourAngle = (hours % 12) * 30 + minutes * 0.5; // 360 degrees / 12 hours + minute adjustment
  //
  //   secondHand.style.transform = `rotate(${secondAngle}deg)`;
  //   minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  //   hourHand.style.transform = `rotate(${hourAngle}deg)`;
  // }
  //
  // setInterval(updateClock, 1000); // Update every second
  // updateClock(); // Initialize immediately


  const secondHand = document.querySelector('[rel="js-second-hand"]');
  const minuteHand = document.querySelector('[rel="js-minute-hand"]');
  const hourHand = document.querySelector('[rel="js-hour-hand"]');

  function calculateDropShadowOffset(degrees, distance) {
    const radians = degrees * (Math.PI / 180);
    let xOffset = distance * Math.cos(radians);
    let yOffset = distance * Math.sin(radians);

    if (degrees === 90) {
      xOffset = Math.abs(xOffset);
      yOffset = -Math.abs(yOffset);
    } else if (degrees >= 0 && degrees < 90) {
      xOffset = Math.abs(xOffset);
      yOffset = -Math.abs(yOffset);
    } else if (degrees >= 90 && degrees <= 180) {
      xOffset = -Math.abs(xOffset);
      yOffset = -Math.abs(yOffset);
    } else if (degrees > 180 && degrees <= 270) {
      xOffset = -Math.abs(xOffset);
      yOffset = Math.abs(yOffset);
    } else if (degrees > 270 && degrees <= 359) {
      xOffset = Math.abs(xOffset);
      yOffset = Math.abs(yOffset);
    }

    return { xOffset, yOffset };
  }

  function updateStyles(element, degrees) {
    // const { xOffset, yOffset } = calculateDropShadowOffset(degrees, 4);
    element.style.transform = `rotate(${degrees}deg)`;
    // element.style.filter = `drop-shadow(${xOffset}px ${yOffset}px .125rem hsla(0, 0%, 0%, .5))`;
  }

  function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const hourAngle = (hours % 12) * 30 + minutes * 0.5;

    if (seconds === 0) {
      secondHand.style.transition = 'none';
    } else {
      secondHand.style.transition = 'transform 0.05s cubic-bezier(0.4, 2.3, 0.3, 1)';
    }

    updateStyles(secondHand, secondAngle);
    updateStyles(minuteHand, minuteAngle);
    updateStyles(hourHand, hourAngle);
  }

  function init() {
    if (secondHand && minuteHand && hourHand) {
      setInterval(updateClock, 1000);
      updateClock();
    }
  }

  return {
    init: init,
  }
})();
xian.clock.init();
