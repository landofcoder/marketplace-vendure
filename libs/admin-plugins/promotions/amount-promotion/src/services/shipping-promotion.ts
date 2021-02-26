import { LanguageCode } from "@vendure/common/lib/generated-types";
import { PromotionOrderAction, PromotionCondition } from "@vendure/core";

export const amountPromotion = new PromotionOrderAction({
  code: "amount-promotion",
  args: {
    amount: { type: "int", config: { inputType: "money" } },
  },
  execute(ctx, order, args) {
    return -Math.min(args.amount, order.total);
  },
  description: [
    {
      languageCode: LanguageCode.en,
      value: "Discount order with { amount } cost",
    },
  ],
});