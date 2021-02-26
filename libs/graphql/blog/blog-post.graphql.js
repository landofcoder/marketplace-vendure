import gql from 'graphql-tag';

export const COUNT_BLOG_POST_LIST = gql`
    query  CountBlogPostList @strapi{
        blogPostsConnection {
            aggregate {
              count
            }
        }
    }
`
export const BLOG_LIST_POST = gql`
    query GetBlogPosts($sort: String, $start: Int, $where: JSON) @strapi{
        blogPosts(limit: 3, sort: $sort, start: $start , where: $where){
            id
            slug
            title
            image{
                id
                width
                height
                url
            }
            text
            date
            blog_categories{
                category_name
                id
                slug
            }
            blog_tags{
                tag_name
                id
                slug
            }
            blog_author{
                author_name
                author_avatar{
                    width
                    height
                    url
                }
            }
            blog_comments{
                id
                customer_name
                customer_email
                comment_message
                date
            }
        }
    }
`;

export const BLOG_LIST_POST_SEARCH = gql`
    query GetBlogPostsSearch($sort: String, $start: Int, $where: JSON) @strapi{
        blogPosts( sort: $sort, start: $start , where: $where){
            id
            slug
            title
            image{
                id
                width
                height
                url
            }
            text
            date
            blog_categories{
                category_name
                id
                slug
            }
            blog_tags{
                tag_name
                id
                slug
            }
            blog_author{
                author_name
                author_avatar{
                    width
                    height
                    url
                }
            }
            blog_comments{
                id
                customer_name
                customer_email
                comment_message
                date
            }
        }
    }
`;

export const BLOG_POST = gql`
    query GetBlogPost($id: ID!) @strapi{
        blogPost( id: $id) {
            id
            slug
            title
            image{
                id
                width
                height
                name
                url
            }
            text
            long_text
            date
            blog_categories{
                category_name
                id
                slug
            }
            blog_tags{
                tag_name
                id
                slug
            }
            blog_author{
                author_name
                author_avatar{
                    width
                    height
                    url
                }
            }
            blog_comments{
                id
                customer_name
                customer_email
                comment_message
                date
            }
        }
    }
`;

export const BLOG_LIST_POST_CATEGORY = gql`
    query GetBlogPostsCategory($limit: Int, $start: Int, $where: JSON) @strapi{
        blogPosts(limit: $limit ,start: $start , where: $where){
            id
            slug
            title
            image{
                id
                width
                height
                url
            }
            text
            date
            blog_categories{
                id
                slug
                category_name
            }
        }
    }
`;

export const BLOG_LIST_POST_TAGS = gql`
    query GetBlogPostsTag($limit: Int, $start: Int, $where: JSON) @strapi{
        blogPosts(limit: $limit ,start: $start , where: $where){
            id
            slug
            title
            image{
                id
                width
                height
                url
            }
            text
            date
            blog_tags{
                id
                tag_name
                slug
            } 
        }
    }
`;

export const ADD_COMMENT = gql`
  mutation CreateBlogComment( $blog_post: ID!, $date: Date, $customer_name: String! , $customer_email: String! ,$comment_message: String!) @strapi{
    createBlogComment(input: {data: { blog_post: $blog_post, date: $date, customer_name: $customer_name , customer_email: $customer_email ,comment_message: $comment_message }}) {
        blogComment{
            id
            customer_name
            customer_email
            comment_message
            date
        }
    }
  }
`;

export const SEARCH_POST_WITH_TITLE = gql`
query SearchBlogPostWithTitle( $limit: Int, $start: Int, $title: String!) @strapi{
    blogPosts(limit: $limit ,start: $start, where: {title_contains: $title }){
        id
        slug
        title
        image{
            id
            width
            height
            url
        }
        text
        date
        blog_categories{
            category_name
            id
            slug
        }
        blog_tags{
            tag_name
            id
            slug
        }
        blog_author{
            author_name
            author_avatar{
                width
                height
                url
            }
        }
        blog_comments{
            id
            customer_name
            customer_email
            comment_message
            date
        }
    }
}
`;