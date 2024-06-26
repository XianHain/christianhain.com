window.xian = window.xian || {};
xian.adobeCreativeType = xian.adobeCreativeType || (function adobeCreativeType() {
  const headshotToggle = document.querySelector('[rel~="js-headshot-toggle"]');
  const headshotOriginal = document.querySelector('[rel~="js-headshot--original"]');
  const headshotModified = document.querySelector('[rel~="js-headshot--modified"]');
  const headshotContainer = document.querySelector('[rel~="js-headshot"]');
  const state = {
    modified: false,
    focusCount: 0,
  };

  function shouldToggle(weight) {
    const cacheCount = state.focusCount;
    state.focusCount = state.focusCount + weight;

    return (
      (cacheCount < 1 && state.focusCount === 1)
        || (cacheCount > 0 && state.focusCount === 0)
    );
  }

  function toggle() {
    state.modified = !state.modified;

    if (state.modified) {
      headshotContainer.dataset.state = 'modified';
      headshotOriginal.setAttribute('aria-hidden', 'true');
      headshotModified.removeAttribute('aria-hidden');
    } else {
      headshotContainer.dataset.state = 'original';
      headshotOriginal.removeAttribute('aria-hidden');
      headshotModified.setAttribute('aria-hidden', 'true');
    }

    headshotContainer.dataset.tweening = 'true';
    setTimeout(function() {
      headshotContainer.dataset.tweening = 'false';
    }, 200);
  }

  const headshotToggleEvents = [
    {name: 'blur', weight: -1},
    {name: 'focus', weight: 1},
    {name: 'mouseout', weight: -1},
    {name: 'mouseover', weight: 1},
  ];

  function attachEventListeners() {
    headshotToggleEvents.forEach(function(event) {
      headshotToggle.addEventListener(
        event.name,
        function headshotToggleHandler() {
          if (shouldToggle(event.weight)) {
            toggle();
          }
        },
        false
      );
    });
  }

  function init() {
    if (headshotToggle) {
      attachEventListeners();
    }
  }

  return {
    init: init,
    toggle: toggle,
  };
});
xian.adobeCreativeType = xian.adobeCreativeType();
xian.adobeCreativeType.init();