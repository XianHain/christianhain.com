window.xian = window.xian || {};
xian.hashnode = xian.hashnode || (function hashnode() {
  const blogContainer = document.querySelector(
    '[rel~="js-blog-container"]'
  );

  const blogBriefElements = blogContainer.querySelector('[rel~="js-blog-entry__brief"]');;
  const blogTitleElements = blogContainer.querySelector('[rel~="js-blog-entry__title"]');;

  function getMaxHeight(elements) {
    return elements.map((element) => element.clientHeight)
      .sort((a, b) => {
        let returnValue = 0;

        if (a < b) {
          returnValue = -1;
        } else if (a > b) {
          returnValue = 1;
        }

        return returnValue;
      })
      .pop();
  }

  function matchHeight(elements, maxHeight) {
    elements.forEach((element) => {
      element.style.height = `${maxHeight}px`;
    })
  }

  function init() {
    if (blogContainer) {
      matchHeight(blogBriefElements, getMaxHeight(blogBriefElements));
      matchHeight(blogTitleElements, getMaxHeight(blogTitleElements));
    }
  }

  return {
    init: init,
  };
});
xian.hashnode = xian.hashnode();
xian.hashnode.init();