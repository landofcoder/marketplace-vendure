import gql from 'graphql-tag';

import { DELHIVERY_WAREHOUSE_FRAGMENT } from '../../common/fragments.graphql';

export const GET_DELHIVERY_WAREHOUSE = gql`
    query GetDelhiveryWarehouse($id: ID!) {
        delhiveryWarehouse(id: $id) {
            ...DelhiveryWarehouse
        }
    }
    ${DELHIVERY_WAREHOUSE_FRAGMENT}
`;

export const GET_DELHIVERY_WAREHOUSE_BY_CHANNEL_ID = gql`
    query GetDelhiveryWarehouseByChannelId($input: DelhiveryWarehouseByChannelId!) {
        delhiveryWarehouseByChannelId(input: $input) {
            ...DelhiveryWarehouse
        }
    }
    ${DELHIVERY_WAREHOUSE_FRAGMENT}
`;

export const GET_DELHIVERY_WAREHOUSE_BY_PICKUP_NAME = gql`
    query GetDelhiveryWarehouseByPickupName($input: DelhiveryWarehouseByPickupName!) {
        delhiveryWarehouseByPickupName(input: $input) {
            ...DelhiveryWarehouse
        }
    }
    ${DELHIVERY_WAREHOUSE_FRAGMENT}
`;
