/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
exports.createPages = async ({ graphql, actions }) => {
  console.log('in create pages');
  const { createPage } = actions;
  const blogPost = path.resolve('./src/templates/BlogPost.tsx');
  let posts;
  try {
    posts = await graphql(`
      {
        allButterPost {
          edges {
            node {
              id
              seo_title
              slug
              categories {
                name
                slug
              }
              author {
                first_name
                last_name
                email
                slug
                profile_image
              }
              body
            }
          }
        }
      }
    `);
  } catch (error) {
    console.log(`Error querying posts`, error);
  }
  posts = posts.data.allButterPost.edges;
  console.log(`got ${posts.length} posts`);
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    console.log(post.node.slug);
    // Create blog posts pages.
    createPage({
      path: `/blog/${post.node.slug}`,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next
      }
    });
  });
};
