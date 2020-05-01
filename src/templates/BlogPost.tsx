import React from 'react';
import { graphql } from 'gatsby';

interface BlogPostProps {
  data: any;
}

const BlogPost: React.FC<BlogPostProps> = props => {
  console.log(props);
  const post = props.data.allButterPost.edges[0].node;
  return (
    <div>
      <h1>{post.seo_title}</h1>
    </div>
  );
};

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allButterPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          body
          seo_title
          date
          categories {
            name
          }
        }
      }
    }
  }
`;

export default BlogPost;
