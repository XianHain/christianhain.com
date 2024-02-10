window.xian = window.xian || {};
xian.hashnode = xian.hashnode || (function hashnode() {
  const blogContainer = document.querySelector(
    '[rel~="js-blog-container"]'
  );

  const blogBriefElements = [];
  const blogTitleElements = [];

  const getUserArticlesGQL = `
    query Publication {
    publication(host: "blog.christianhain.com") {
      title
      posts(first: 10) {
        edges {
          node {
            title
            brief
            url
          }
        }
      }
    }
  }
  `;

  async function gql(query, variables={}) {
    const data = await fetch('https://gql.hashnode.com/', {
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
    gql(getUserArticlesGQL, { page: 0 })
      .then((result) => {
        const articles = result.data.publication.posts.edges;
        const template = document.querySelector('[rel~="js-blog-entry-template"]');

        // Test to see if the browser supports the HTML template element by
        // checking for the presence of the template element's content
        // attribute.
        if ('content' in document.createElement('template')) {
          articles.forEach((article) => {
            const clone = template.content.cloneNode(true);

            const title = clone.querySelector('[rel~="js-blog-entry__title"]');
            title.textContent = article.node.title;
            blogTitleElements.push(title);

            const brief = clone.querySelector('[rel~="js-blog-entry__brief"]');
            brief.textContent = article.node.brief;
            blogBriefElements.push(brief);

            const link = clone.querySelector('[rel~="js-blog-entry__link"]');
            link.href = article.node.url;

            blogContainer.appendChild(clone);
          });
        } else {
          // @TODO Find another way to add the rows to the table because
          //       the HTML template element is not supported.
        }
      })
      .catch((error) => {
        const template = document.querySelector('[rel~="js-blog-entry-failed-template"]');
        const clone = template.content.cloneNode(true);
        blogContainer.appendChild(clone);
      })
      .finally(() => {
        document.querySelector('[rel~="js-blog-spinner"]').remove();
        matchHeight(blogBriefElements, getMaxHeight(blogBriefElements));
        matchHeight(blogTitleElements, getMaxHeight(blogTitleElements));
      })
    ;
  }

  return {
    init: init,
  };
});
xian.hashnode = xian.hashnode();
xian.hashnode.init();