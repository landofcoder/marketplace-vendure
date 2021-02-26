import gql from "graphql-tag";

export const SEARCH_SHOP_PRODUCTS = gql`
  query SearchShopProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        productId
        slug
        sku
        productName
        description
        priceWithTax {
          ... on PriceRange {
            min
            max
          }
        }
        currencyCode
        productAsset {
          id
          preview
          focalPoint {
            x
            y
          }
        }
      }
      totalItems
      facets {
        id
        name
        code
        isPrivate
        facetValues {
          facetValue {
            id
            code
          }
          count
        }
      }
    }
  }
`;
