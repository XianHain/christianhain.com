const EleventyFetch = require('@11ty/eleventy-fetch');

const getUserArticlesGQL = `
  query Publication {
    publication(host: "blog.christianhain.com") {
      title
      posts(first: 10) {
        edges {
          node {
            slug
            brief
            title
            publishedAt
            tags { id }
            readTimeInMinutes
            author {
              name
            }
            content {
              markdown
            }
          }
        }
      }
    }
  }
`;

async function gql(query, variables = {}) {
  try {
    return await EleventyFetch('https://gql.hashnode.com/', {
      duration: '0',
      type: 'json',
      fetchOptions: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

async function getAllPosts() {
  const hashnodeData = await gql(getUserArticlesGQL, { page: 0 });
  return hashnodeData.data.publication.posts.edges.map(
    (edge) => ({...edge.node})
  );
}

module.exports = getAllPosts;