window.xian = window.xian || {};
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
      })
      .catch(() => {
        const template = document.querySelector('[rel~="js-blog-entry-failed-template"]');
        const clone = template.content.cloneNode(true);
        blogContainer.appendChild(clone);
      })
      .finally(() => {
        document.querySelector('[rel~="js-blog-spinner"]').remove();
      })
    ;
  }

  return {
    init: init,
  };
});
xian.hashnode = xian.hashnode();
xian.hashnode.init();