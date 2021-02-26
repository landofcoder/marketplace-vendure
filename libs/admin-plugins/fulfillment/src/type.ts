import {
    Scalars,
    FulfillOrderInput
} from '@vendure/common/lib/generated-types';
import { ID, JsonCompatible } from '@vendure/common/lib/shared-types';

export type CustomizeFulfillOrderInput = FulfillOrderInput & {
    numberItem: Scalars['Int'];
    orderWeight: Scalars['Int'];
    packageAmount: Scalars['Float'];
    orderId: Scalars['ID'];
    courier:  Scalars['String'];
}

export type CustomizeMutationFulfillOrderArgs = {
    input: CustomizeFulfillOrderInput;
};