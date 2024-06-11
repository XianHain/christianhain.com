const EleventyFetch = require('@11ty/eleventy-fetch');

const getUserArticlesGQL = `
  query Publication {
    publication(host: "christianhain.com/blog") {
      title
      posts(first: 10) {
        edges {
          node {
            url
            slug
            brief
            title
            publishedAt
            readTimeInMinutes
            tags { id }
            author { name }
            ogMetaData { image }
            content {
              text
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
    (edge) => ({
      ...edge.node,
      author: {
        ...edge.node.author,
        givenName: edge.node.author.name.split(' ')[0],
        familyName: edge.node.author.name.split(' ')[1],
      }
    })
  );
}

module.exports = getAllPosts;