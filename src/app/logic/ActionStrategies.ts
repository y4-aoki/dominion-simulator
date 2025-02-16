import { ActionStrategy } from "@/types";
import { GameState } from "@/types";
export const NoActionStrategy: ActionStrategy = {
  name: "アクションなし",
  descriptions: [
    "アクションカードを一切使用しない。",
    "手札の財宝のみを使用する。",
  ],
  execute: (state: GameState) => state,
};
