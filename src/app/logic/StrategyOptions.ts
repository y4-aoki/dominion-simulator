import { StrategyOption } from "@/types";
import { NoActionStrategy } from "./ActionStrategies";
import { TreasureOnlyBuyStrategy, SilverOnlyBuyStrategy } from "./BuyStrategies";

export const StrategyOptions: StrategyOption[] = [
  {
    name: "財宝のみ戦略",
    description: "アクションを使わず、財宝のみを購入するシンプルな戦略。",
    actionStrategies: [NoActionStrategy], // アクションはなし
    buyStrategies: [TreasureOnlyBuyStrategy, SilverOnlyBuyStrategy], // 購入戦略を選べる
  },
];
