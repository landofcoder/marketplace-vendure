import gql from 'graphql-tag';

export const DELHIVERY_WAREHOUSE_FRAGMENT = gql`
    fragment DelhiveryWarehouse on DelhiveryWarehouse {
        id
        createdAt
        updatedAt
        pickup_name
        city
        pincode
        state
        address
        country
        contact_person_name
        contact_person_email
        contact_person_phone
        return_address
        return_pincode
        return_city
        return_state
        return_country
        from_working_hours
        to_working_hours
        day_working_hours
        preferred_pickup_slots
        channelId
    }
`;