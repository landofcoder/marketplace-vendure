import gql from 'graphql-tag';

export const GET_SHIPPING_COUNTRY_LIST = gql`
  query GetShippingCountryPrice($options: ShippingCountryPriceListOptions) {
    shippingCountries(options:$options){
      items{
        id
        price
        country_code
        country_name
      }
      totalItems
    }
  }
`;

export const DELETE_SHIPPING_COUNTRY = gql`
    mutation DeleteShippingCountry($id: ID!) {
        deleteShippingCountry(id: $id) {
            result
            message
        }
    }
`;