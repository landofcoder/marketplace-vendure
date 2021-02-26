import { gql } from 'apollo-server-core';

export const adminApiExtensions = gql`    

    extend type Order {
        channels: [Channel]
    }

    extend input FulfillOrderInput {
        numberItem: Int
        orderWeight: Int
        packageAmount: Float
        orderId: ID
        courier: String
    }

    type PackingSlip {
        origin: String
        invoice_reference: String
        shipment_width: Int
        pin: Int
        cl: String
        intl: String
        origin_state_code: String
        cd: String
        ewbn: [String!]
        rph: String
        shipment_length: Int
        snm: String
        barcode: String
        origin_city: String
        weight: Int
        pt: String
        rs: Int
        destination: String
        si: String
        destination_city: String
        hsn_code: String
        tin: String
        contact: String
        origin_state: String
        oid_barcode: String
        sid: String
        cst: String
        prd: String
        rcty: String
        consignee_gst_tin: String
        cnph: String
        sadd: String
        oid: String
        customer_state: String
        mot: String
        radd: String
        customer_state_code: String
        address: String
        rst: String
        seller_gst_tin: String
        shipment_height: Int
        pdd: String
        product_type: String
        name: String
        st_code: String
        cl_logo: String
        st: String
        client_gst_tin: String
        etc: String
        delhivery_logo: String
        client_type: String
        cod: Int
        wbn: String
        sort_code: String
        rpin: Int
    }

    extend type Query {
        getPackingSlip(trackingCode: String!): PackingSlip
    }
    extend type Mutation {
        fulfillOrder(input: FulfillOrderInput!): AddFulfillmentToOrderResult!
    }
`;