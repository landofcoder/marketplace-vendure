import gql from 'graphql-tag';

export const SEO_CONFIG_FRAGMENT = gql`
    fragment SEOConfig on SEOConfig {
        id
        title
        titleTemplate
        description
        url
        site_name
    }
`;

export const GET_SEO_CONFIG = gql`
    query GetSEOConfig{
        getSEOConfig {
            ...SEOConfig
        }
    }
    ${SEO_CONFIG_FRAGMENT}
`;

export const UPDATE_SEO_CONFIG = gql`
    mutation updateSEOConfig($input: SEOConfigInput!) {
        updateSEOConfig(
            input: $input
        ) {
            ...SEOConfig
        }
    }
    ${SEO_CONFIG_FRAGMENT}
`;

