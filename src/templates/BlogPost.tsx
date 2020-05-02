import React from 'react';
import { graphql } from 'gatsby';
import { BlogPostBySlugQuery } from '../../graphql-types';

interface BlogPostProps {
  data: any;
}

const BlogPost: React.FC<BlogPostProps> = props => {
  console.log(props);
  const post = props.data.allButterPost.edges[0].node;
  return (
    <div>
      <h2>{post.seo_title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
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
