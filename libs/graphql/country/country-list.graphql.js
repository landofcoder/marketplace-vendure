import gql from 'graphql-tag';

export const GET_COUNTRY_LIST = gql`
    query GetCountryList {
        availableCountries{
            id
            code
            name 
        }
    }
`;