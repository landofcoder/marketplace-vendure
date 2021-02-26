import { gql } from 'apollo-server-core';

export const commonApiExtensions = gql`
    extend type Channel {
        shippingMethod: [ShippingMethod!]!
    }

    type FacetResult{
        id: ID!
        name: String!
        code: String!
        isPrivate: Boolean!
        facetValues: [FacetValueResult!]!
    }

    input OrderVendorPaymentInput {
        method: String!
        metadata: JSON!
    }

    enum VendorAccountType {
        CURRENT
        SAVING
    }
    
    input VendorInput{
        firstName: String!
        lastName: String!
        email: String!
        password: String
        phone: String!
        GSTINID: String!
        state: String!
        ownerName: String!
        ownerEmail: String!
    }

    input VendorInfoInput{
        vendorId: String!
        brandName: String!
        regAddress: String!
        postalCode: String!
        city: String!
        countryCode: String!
        panno: String!
        GSTINID: String!
        state: String!
        ADHAR: String!
        aboutUs: String!
        staffEmail: String!
        phone: String!
        currencyCode: String
        defaultTaxZoneId: Int
        defaultShippingZoneId: Int
    }

    input VendorBankInput{
        vendorId: String!
        account: String!
        code: String!
        address: String!
        type: VendorAccountType!
        isCheck: String
    }

    input VendorContactInput{
        vendorId: String!
        contactName: String!
        email: String!
        phone: String!
    }

    input VendorMarketingContactInput{
        vendorId: String!
        name: String!
        emailAddress: String!
        phone: String!
    }

    input UpdateVendorInput{
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        GSTINID: String!
        state: String!
        ownerName: String!
        ownerEmail: String!
    }

    input UpdateVendorInfoInput{
        id: ID!
        brandName: String!
        regAddress: String!
        postalCode: String!
        city: String!
        countryCode: String!
        panno: String!
        GSTINID: String!
        state: String!
        ADHAR: String!
        aboutUs: String!
        staffEmail: String!
        phone: String!
        currencyCode: String
        defaultTaxZoneId: Int
        defaultShippingZoneId: Int
    }

    input UpdateVendorBankInput{
        id: ID!
        account: String!
        code: String!
        address: String!
        type: VendorAccountType!
        isCheck: String
    }

    input UpdateVendorContactInput{
        id: ID!
        contactName: String!
        email: String!
        phone: String!
    }

    input UpdateVendorMarketingInput{
        id: ID!
        name: String!
        emailAddress: String!
        phone: String!
    }
    
    type Vendor implements Node{
        id: ID!
        channel: Channel!
        user: User!
        firstName: String
        lastName: String
        email: String
        phone: String
        GSTINID: String
        state: String
        ownerName: String
        ownerEmail: String
        verified: Boolean
        banks: [VendorBank!]!
        contacts: [VendorContact!]!
        info: [VendorInfo!]!
        marketing: [VendorMarketingContact!]!
    }

    type VendorBank implements Node{
        id: ID!
        account: String
        code: String
        address: String
        type: VendorAccountType
        isCheck: String
    }

    type VendorContact implements Node{
        id: ID!
        contactName: String
        email: String
        phone: String
    }

    type VendorInfo implements Node{
        id: ID!
        brandName: String!
        regAddress: String!
        postalCode: String!
        city: String!
        countryCode: String!
        panno: String!
        GSTINID: String!
        state: String!
        ADHAR: String!
        aboutUs: String!
        staffEmail: String!
        phone: String!
        currencyCode: String
        defaultTaxZoneId: Int
        defaultShippingZoneId: Int
    }

    type VendorMarketingContact implements Node{
        id: ID!
        name: String
        emailAddress: String
        phone: String
    }

    type VendorList implements PaginatedList {
        items: [Vendor!]!
        totalItems: Int!
    }

    enum VerifyResult {
        SUCCESS
        FAIL
    }
    type VerifyResponse {
        result: VerifyResult!
        message: String
    }

`;

export const adminApiExtensions = gql`
    ${commonApiExtensions}

    extend input UpdateChannelInput {
        shippingMethodIds: [ID]
    }

    extend input CreateChannelInput {
        shippingMethodIds: [ID]
    }

    extend type Query {
        getOrderListByChannel(options: OrderListOptions): OrderList!
        getVendorByBrand(brand: String!): Vendor # renamed from vendorInfo(channelCode: String!) to getVendorByBrand
        getVendorByEmail(email: String!): Vendor
        vendors(options: VendorListOptions): VendorList!
        activeVendor: Vendor
        getVendorByID(id: ID!): Vendor
    }
    # Auto-generated at runtime
    input VendorListOptions
    
    extend type Mutation {
        createVendor(input: VendorInput!): Vendor
        createVendorInfo(input: VendorInfoInput!): VendorInfo
        createVendorBank(input: VendorBankInput!): VendorBank
        createVendorContact(input: VendorContactInput!): VendorContact
        createVendorMarketingContact(input: VendorMarketingContactInput!): VendorMarketingContact
        deleteVendor(id: ID!): DeletionResponse!
        updateVendor(input: UpdateVendorInput!): Vendor
        updateVendorInfo(input: UpdateVendorInfoInput!): VendorInfo
        updateVendorBank(input: UpdateVendorBankInput!): VendorBank
        updateVendorContact(input: UpdateVendorContactInput!): VendorContact
        updateVendorMaketingContact(input: UpdateVendorMarketingInput!): VendorMarketingContact
        verifyVendorAccount(
            token: String!
            password: String): VerifyResponse!
    }
`;

export const shopApiExtensions = gql`

    ${commonApiExtensions}

    extend type Order {
        channel: Channel
    }

    extend input SearchInput {
        channelCode: String
    }

    extend type Product {
        channel: Channel
    }

    extend type SearchResponse {
        facets: [FacetResult]
    }

    input PaymentMethodListOptions {
        skip: Int!
        take: Int!
    }

    type PaymentMethodList implements PaginatedList {
        items: [PaymentMethod!]!
        totalItems: Int!
    }

    extend type Query {
        activeOrderVendors: [Order]
        getVendorByBrand(brand: String!): Vendor # renamed from vendorInfo(channelCode: String!) to getVendorByBrand
        getVendorByEmail(email: String!): Vendor
        eligibleVendorShippingMethods(id: ID!): [ShippingMethodQuote!]!
        paymentMethods(options: PaymentMethodListOptions): PaymentMethodList!
        paymentMethod(id: ID!): PaymentMethod
    }

    extend type Mutation {
        createVendor(input: VendorInput!): Vendor
        createVendorInfo(input: VendorInfoInput!): VendorInfo
        createVendorBank(input: VendorBankInput!): VendorBank
        createVendorContact(input: VendorContactInput!): VendorContact
        createVendorMarketingContact(input: VendorMarketingContactInput!): VendorMarketingContact
        verifyVendorAccount(
            token: String!
            password: String): VerifyResponse!

        addItemToOrderVendor(
            productVariantId: ID!
            quantity: Int!,
            channelId: ID!,
        ): [Order]
        removeOrderVendorLine(
            orderLineId: ID!
        ): [Order]
        adjustOrderVendorLine(
            orderLineId: ID!
            quantity: Int
        ): [Order]
        transitionOrderVendorToState(
            state: String!
        ): [Order]
        setCustomerForOrderVendors(
            input: CreateCustomerInput!
        ): [Order]
        setOrderVendorShippingAddress(
            input: CreateAddressInput!
        ): [Order]
        setOrderVendorBillingAddress(
            input: CreateAddressInput!
        ): [Order]
        applyCouponCodeForOrderVendor(
            orderId: ID!
            couponCode: String!
        ): [Order]
        removeCouponCodeForOrderVendor(
            orderId: ID!
            couponCode: String!
        ): [Order]
        setShippingMethodByOrderVendor(
            shippingMethodId: ID!
            oderId: ID!
        ): [Order]
        addPaymentToOrderVendors(
            input: OrderVendorPaymentInput!
        ): [Order]
    }
`;
