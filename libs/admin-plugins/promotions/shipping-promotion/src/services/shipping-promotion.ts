import { LanguageCode } from "@vendure/common/lib/generated-types";
import { PromotionOrderAction, PromotionCondition } from "@vendure/core";

export const shippingPromotionAction = new PromotionOrderAction({
  code: "shipping-promotion",
  args: {
    maximum: { type: "int", config: { inputType: "money" } },
  },
  execute(ctx, order, args) {
    return -Math.min(args.maximum, order.shipping);
  },
  description: [
    {
      languageCode: LanguageCode.en,
      value: "Discount shipping order with { maximum } cost",
    },
  ],
});

export const shippingPromotionCondition = new PromotionCondition({
  code: "shipping-promotion",

  description: [
    {
      languageCode: LanguageCode.en,
      value: "Shipping promotion conditions to ensure checking",
    },
  ],
  args: {},

  /**
   * This is the business logic of the condition. It is a function that
   * must resolve to a boolean value indicating whether the condition has
   * been satisfied.
   */
  check(ctx, order, args) {
    console.log(order);
    console.log(!!order.shippingMethodId);
    return !!order.shippingMethodId;
  },
});
