import gql from 'graphql-tag';

export const BLOG_CATEGORIES = gql`
    query GetBlogCategories @strapi{
        blogCategories(limit: 10){
            id
            category_name
            slug
        }
    }
`;

export const BLOG_CATEGORY = gql`
    query GetBlogCategory($id: ID!) @strapi{
        blogCategory(id: $id){
            id
            category_name
            slug
        }
    }
`;


export const BLOG_TAGS = gql`
    query GetBlogTags @strapi{
        blogTags(limit: 10){
            id
            tag_name
            slug
        }
    }
`;

export const BLOG_TAG = gql`
    query GetBlogTag($id: ID!) @strapi{
        blogTag(id: $id){
            id
            tag_name
            slug
        }
    }
`;