import gql from 'graphql-tag';

export const GET_PRODUCT_LIST = gql`
query GetProductListCustomize($options: ProductListOptions) {
        productGrid(options: $options) {
            totalItems
            items {
              id
              enabled
              languageCode
              slug
              translations{
                id
                name
                slug
                description
                languageCode
              }
              featuredAsset{
                id
                preview
              }
              facetValues{
                id
                name
              }
              channels{
                code
              }
              customFields{
                status
              }
              variants {
                id
                enabled
                languageCode
                translations{
                   id
                   name
                   languageCode
                }
                sku
                price
                taxCategory{
                  id
                  name
                }
                facetValues{
                  id
                  name
                }
                featuredAsset{
                  id
                  preview
                }
                assets{
                  id
                  name
                  source
                }
                trackInventory
                stockOnHand
                customFields{
                  shippingPrice
                  shippingBusinessPrice
                }
              }
            }
          }
    }
`;
