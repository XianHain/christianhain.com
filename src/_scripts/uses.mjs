window.xian = window.xian || {};
xian.uses = xian.uses || (function uses() {
  let _clone = null;
  let _popover = null;
  let _template = null;
  let _popoverContent = null;

  function _setOrRemoveDlItem(rel, value) {
    const _elements = _clone.querySelectorAll(`[rel~="${rel}"]`);

    if (_elements && value) {
      const _deepestElement = _elements[_elements.length - 1];
      _deepestElement.href = value;
      _deepestElement.textContent = value;
    } else {
      _elements.forEach((element) => element.remove());
    }
  }

  function _populateTemplate(item) {
    if (!item) {
      throw new Error('Could not find item');
    }

    _clone = _template.content.cloneNode(true);

    _setOrRemoveDlItem('js-url', item.dataset.href);
    _setOrRemoveDlItem('js-vendor', item.dataset.vendor);
    _setOrRemoveDlItem('js-license', item.dataset.license);
    _setOrRemoveDlItem('js-description', item.dataset.description);
    _setOrRemoveDlItem('js-product-name', item.dataset.productname);

    _popoverContent.innerHTML = '';
    _popoverContent.appendChild(_clone);
  }

  function togglePopover(event) {
    if (event.target.closest('[rel="js-close-button"]')) {
      _popover.hidePopover();
    } else {
      _populateTemplate(event.target.closest('[rel="js-uses-item"]'));
      _popover.showPopover();
    }
  }

  function init() {
    _template = document.querySelector(
      '[rel="js-uses-product-details"]'
    );
    if (!_template) {
      throw new Error('Could not find template');
    }

    _popover = document.querySelector(
      '[rel="js-uses-popover"]'
    )
    if (!_popover) {
      throw new Error('Could not find popover element');
    }

    _popoverContent = document.querySelector(
      '[rel="js-uses-popover-content"]'
    )
    if (!_popoverContent) {
      throw new Error('Could not find element to populate popover template');
    }
  }

  return {
    init: init,
    togglePopover: togglePopover,
  }
})();
xian.uses.init();
