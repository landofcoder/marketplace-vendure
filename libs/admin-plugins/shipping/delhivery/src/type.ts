import {
    SearchInput,
    SearchResponse,
    SearchResult,
    CreateChannelInput,
    UpdateChannelInput,
    Channel,
    ShippingMethod
} from '@vendure/common/lib/generated-types';
import { ID, JsonCompatible } from '@vendure/common/lib/shared-types';

export type ProductVendorSearchInput = SearchInput & {
    channelCode?: string
};

export type QueryVendorSearchArgs = SearchInput & {
    input: ProductVendorSearchInput
};

export type CustomCreateChannelInput = CreateChannelInput & {
    shippingMethodIds: ID[]
};

export type CustomUpdateChannelInput = UpdateChannelInput & {
    shippingMethodIds: ID[]
};

export type CustomMutationCreateChannelArgs = {
    input: CustomCreateChannelInput
}

export type CustomMutationUpdateChannelArgs = {
    input: CustomUpdateChannelInput
}