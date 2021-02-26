import gql from 'graphql-tag'
import { CART_FRAGMENT } from '../fragments.graphql';
export const APPLY_SHIPPING_METHOD_GRAPHQL = gql`
    mutation applyShippingMethod($methodId: ID!, $oderId: ID!){
        setShippingMethodByOrderVendor(shippingMethodId: $methodId, oderId: $oderId){
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;