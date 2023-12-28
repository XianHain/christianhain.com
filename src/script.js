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

    let returnValue = false;
    if (cacheCount < 1 && state.focusCount === 1) {
      returnValue = true;
    } else if (cacheCount > 0 && state.focusCount === 0) {
      returnValue = true;
    }

    return returnValue;
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

  return {
    toggle: toggle,
  };
});
xian.adobeCreativeType = xian.adobeCreativeType();

xian.hashnode = xian.hashnode || (function hashnode() {
  const blogUrl = 'https://blog.christianhain.com';
  const blogUsername = 'xianhain';
  const blogContainer = document.querySelector(
    '[rel~="js-blog-container"]'
  );
  const getUserArticlesGQL = `
    query GetUserArticles($page: Int!) {
      user(username: "${blogUsername}") {
        publication {
          posts(page: $page) {
            title
            brief
            slug
          }
        }
      }
    }
  `;

  async function gql(query, variables={}) {
    const data = await fetch('https://api.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    });

    return data.json();
  }

  function init() {
    gql(getUserArticlesGQL, { page: 0 })
      .then((result) => {
        const articles = result.data.user.publication.posts;
        const template = document.querySelector('[rel~="js-blog-entry-template"]');

        document.querySelector('[rel~="js-blog-spinner"]').remove();

        // Test to see if the browser supports the HTML template element by
        // checking for the presence of the template element's content
        // attribute.
        if ('content' in document.createElement('template')) {
          articles.forEach((article) => {
            const clone = template.content.cloneNode(true);

            const title = clone.querySelector('[rel~="js-blog-entry__title"]');
            title.textContent = article.title;

            const brief = clone.querySelector('[rel~="js-blog-entry__brief"]');
            brief.textContent = article.brief;

            const link = clone.querySelector('[rel~="js-blog-entry__link"]');
            link.href = `${blogUrl}/${article.slug}`;

            blogContainer.appendChild(clone);
          });
        } else {
          // @TODO Find another way to add the rows to the table because
          //       the HTML template element is not supported.
        }
      });
  }

  return {
    init: init,
  };
});
xian.hashnode = xian.hashnode();
xian.hashnode.init();