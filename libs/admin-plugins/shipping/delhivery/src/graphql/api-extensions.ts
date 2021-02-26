import { gql } from 'apollo-server-core';

export const adminApiExtensions = gql`

    enum DelhiveryShippingMode {
        Express
        Surface
    }
    
    type DelhiveryAccount implements Node {
        id: ID!
        client_name: String!
        user_name: String!
        api_key: String!
        shipping_mode: DelhiveryShippingMode!
        hand_fee: Int!
    }
    
    type DelhiveryWarehouse implements Node {
        createdAt: DateTime!
        updatedAt: DateTime!
        id: ID!
        pickup_name: String!
        city: String!
        pincode: String!
        state: String!
        address: String!
        country: String!
        contact_person_email: String!
        contact_person_name: String!
        contact_person_phone: String!
        return_address: String!
        return_pincode: String!
        return_city: String!
        return_state: String!
        return_country: String!
        from_working_hours: String!
        to_working_hours: String!
        day_working_hours: String!
        preferred_pickup_slots: String!
        channelId: String!
    }

    type DelhiveryWarehouseList implements PaginatedList {
        items: [DelhiveryWarehouse!]!
        totalItems: Int!
    }

    input UpdateDelhiveryAccountInput {
        id: ID
        client_name: String!
        user_name: String!
        api_key: String!
        shipping_mode: DelhiveryShippingMode!
        hand_fee: Int!
    }
    
    input CreateDelhiveryWarehouseInput {
        pickup_name: String!
        city: String!
        pincode: String!
        state: String!
        address: String!
        country: String!
        contact_person_email: String!
        contact_person_name: String!
        contact_person_phone: String!
        return_address: String!
        return_pincode: String!
        return_city: String!
        return_state: String!
        return_country: String!
        from_working_hours: String!
        to_working_hours: String!
        day_working_hours: String!
        preferred_pickup_slots: String!
        channelId: String!
    }
    
    input UpdateDelhiveryWarehouseInput {
        id: ID!
        pickup_name: String!
        city: String!
        pincode: String!
        state: String!
        address: String!
        country: String!
        contact_person_email: String!
        contact_person_name: String!
        contact_person_phone: String!
        return_address: String!
        return_pincode: String!
        return_city: String!
        return_state: String!
        return_country: String!
        from_working_hours: String!
        to_working_hours: String!
        day_working_hours: String!
        preferred_pickup_slots: String!
        channelId: String!
    }

    input DelhiveryWarehouseListOptions {
        skip: Int!
        take: Int!
    }
    
    input DelhiveryWarehouseByChannelId{
        channelId: String!
    }

    input DelhiveryWarehouseByPickupName{
        pickup_name: String!
    }
    
    extend type Query {
        delhiveryAccount: DelhiveryAccount
        delhiveryWarehouses(options: DelhiveryWarehouseListOptions): DelhiveryWarehouseList!
        delhiveryWarehouse(id: ID!): DelhiveryWarehouse
        delhiveryWarehouseByChannelId(input: DelhiveryWarehouseByChannelId!): DelhiveryWarehouse
        delhiveryWarehouseByPickupName(input: DelhiveryWarehouseByPickupName!): DelhiveryWarehouse
    }

    extend type Mutation {
        updateDelhiveryAccount(input: UpdateDelhiveryAccountInput!): DelhiveryAccount!
        createDelhiveryWarehouse(input: CreateDelhiveryWarehouseInput!, countryName: String!): DelhiveryWarehouse!
        updateDelhiveryWarehouse(input: UpdateDelhiveryWarehouseInput!): DelhiveryWarehouse!
    }
`;