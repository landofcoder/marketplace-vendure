import gql from 'graphql-tag';

export const GET_SEO_CONFIG = gql`
    query GetSEOConfig {
        getSEOConfig{
            title
            titleTemplate
            description
            url
            site_name
          }
    }
`;