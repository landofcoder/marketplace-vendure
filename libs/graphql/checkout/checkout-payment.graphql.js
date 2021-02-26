import gql from 'graphql-tag';

import { CART_FRAGMENT } from '../fragments.graphql';

export const ADD_PAYMENT = gql`
    mutation AddPayment($input: PaymentInput!) {
        addPaymentToOrder(input: $input) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;
export const ADD_PAYMENT_TO_ORDER_VENDOR = gql`
    mutation addPaymentToOrderVendor($input: OrderVendorPaymentInput!) {
        addPaymentToOrderVendors(input: $input) {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;
export const GET_BRAINTREE_TOKEN = gql`
  query GenerateBraintreeClientToken {
    generateBraintreeClientToken
  }
`;
export const PAY_UMONEY_TOKEN = gql`
  query GeneratePayumoneyMethod {
      generatePayumoneyMethod{
          key
          hash
          txnid
          amount
          firstname
          email
          phone
          productinfo,
          isProduction
      }
  }
`;
export const GET_LIST_PAYMENT_METHOD = gql`
    query GetListPaymentMethod($options: PaymentMethodListOptions){
        paymentMethods(options: $options){
            items {
                id
                createdAt
                updatedAt
                code
                enabled
                configArgs {
                    name
                    value
                }
                definition {
                    code
                    args {
                        name
                        type
                        list
                        label
                        description
                        ui
                    }
                    description
                }
            }
            totalItems
        }
    }
`;

export const CREATE_PAYMENT_PAYPAL_METHOD = gql`
    mutation CreatePaymentForPaypalMethod($returnURL: String, $cancelURL: String)  {
        createPaymentForPaypalMethod(returnURL: $returnURL, cancelURL: $cancelURL)  {
            id
        }
    }
`;

export const EXECUTE_PAYMENT_PAYPAL_METHOD = gql`
    mutation ExecutePaymentForPaypalMethod($paymentID: String, $payerID: String) {
        executePaymentForPaypalMethod(paymentID: $paymentID, payerID: $payerID)  {
            status
            data
        }
    }
`;

export const PAYPAL_ENV = gql`
    query GetPaypalEnv {
        getPaypalEnv
    }
`;