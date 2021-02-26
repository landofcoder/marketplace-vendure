import gql from 'graphql-tag';

import { DELHIVERY_WAREHOUSE_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_DELHIVERY_WAREHOUSE = gql`
    mutation UpdateDelhiveryWarehouse($input: UpdateDelhiveryWarehouseInput!) {
        updateDelhiveryWarehouse(input: $input) {
            ...DelhiveryWarehouse
        }
    }
    ${DELHIVERY_WAREHOUSE_FRAGMENT}
`;

export const CREATE_DELHIVERY_WAREHOUSE = gql`
    mutation CreateDelhiveryWarehouse($input: CreateDelhiveryWarehouseInput!, $countryName: String!) {
        createDelhiveryWarehouse(input: $input, countryName: $countryName) {
            ...DelhiveryWarehouse
        }
    }
    ${DELHIVERY_WAREHOUSE_FRAGMENT}
`;