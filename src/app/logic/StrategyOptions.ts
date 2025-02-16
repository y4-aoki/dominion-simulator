import { StrategyOption } from "@/types";
import { ChapelEstateAndHandCopperTrashStrategy, ChapelEstateAndTotalCopperTrashStrategy, ChapelEstateTrashStrategy, NoActionStrategy } from "./ActionStrategies";
import { TreasureOnlyBuyStrategy, SilverOnlyBuyStrategy, ChapelBuyStrategy } from "./BuyStrategies";

export const StrategyOptions: StrategyOption[] = [
  {
    name: "財宝のみ戦略",
    description: "アクションを使わず、財宝のみを購入するシンプルな戦略。",
    actionStrategies: [NoActionStrategy], // アクションはなし
    buyStrategies: [TreasureOnlyBuyStrategy, SilverOnlyBuyStrategy], // 購入戦略を選べる
  },
  {
    name: "礼拝堂ステロ",
    description: "礼拝堂を活用して廃棄しつつ、財宝を購入する戦略。",
    actionStrategies: [ChapelEstateTrashStrategy, ChapelEstateAndHandCopperTrashStrategy, ChapelEstateAndTotalCopperTrashStrategy],
    buyStrategies: [ChapelBuyStrategy],
  },
];
