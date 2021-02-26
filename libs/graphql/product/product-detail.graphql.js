import gql from "graphql-tag";

import {
  ASSET_FRAGMENT,
  CART_FRAGMENT,
  PRODUCT_FRAGMENT,
} from "../fragments.graphql";

export const PRODUCT_QUICK_VIEW = gql`
  query productQuickVew($id: ID!, $slug: String!) {
    product(id: $id, slug: $slug) {
      id
      name
      slug
      featuredAsset {
        ...Asset
      }
      variants {
        id
        sku
        name
        featuredAsset {
          ...Asset
        }
        price
        priceWithTax
        currencyCode
        options {
          code
          name
          groupId
          group {
            code
            name
          }
        }
      }
      channel {
        id
        code
      }
    }
  }
  ${ASSET_FRAGMENT}
`;

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($slug: String!) {
    product(slug: $slug) {
      ...Product
      recommendations{
        recommendation{
          ...Product
        }
      }
      reviews {
        items {
          summary
          rating
          authorName
          createdAt
        }
        totalItems
      }
      customFields {
        reviewRating
        reviewCount
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($variantId: ID!, $qty: Int!) {
    addItemToOrder(productVariantId: $variantId, quantity: $qty) {
      ...Cart
    }
  }
  ${CART_FRAGMENT}
`;
export const ADD_TO_VENDOR = gql`
  mutation addToVendor($variantId: ID!, $qty: Int!, $channel: ID!) {
    addItemToOrderVendor(
      productVariantId: $variantId
      quantity: $qty
      channelId: $channel
    ) {
      ...Cart
    }
  }
  ${CART_FRAGMENT}
`;


export const CHECK_PINCODE = gql`
  query CheckPincode($input: CheckPincodeInput!) {
    checkPincode(input: $input) {
      data
      status
    }
  }
  `;