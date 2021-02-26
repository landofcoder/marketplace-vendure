import gql from 'graphql-tag';

export const GET_SHIPPING_COUNTRY = gql`
  query ShippingCountry($id: ID!) {
    shippingCountry(id: $id){
      id
      price
      country_code
      country_name
    }
  }
`;

export const CREATE_SHIPPING_COUNTRY = gql`
    mutation CreateShippingCountry($input: CreateShippingCountryInput!) {
      createShippingCountry(input: $input) {
        id
        price
        country_code
        country_name
      }
    }
`;

export const UPDATE_SHIPPING_COUNTRY = gql`
    mutation UpdateShippingCountry($input: UpdateShippingCountryInput!){
      updateShippingCountry(input: $input) {
        id
        price
        country_code
        country_name
      }
    }
`;