import { BuyStrategy } from "../types";

export const TreasureOnlyBuyStrategy: BuyStrategy = {
  name: "銀貨・金貨購入",
  descriptions: [
    "8金以上なら属州を購入",
    "6金以上なら金貨を購入",
    "3金以上なら銀貨を購入",
    "それ以外は何もしない",
  ],
  execute: (state) => {
    const newState = { ...state };
    const purchases: string[] = [];

    if (newState.gold >= 8) {
      purchases.push("属州");
      newState.gold -= 8;
    } else if (newState.gold >= 6) {
      purchases.push("金貨");
      newState.gold -= 6;
    } else if (newState.gold >= 3) {
      purchases.push("銀貨");
      newState.gold -= 3;
    }

    newState.discard.push(...purchases);

    return { newState, purchases };
  },
};

export const SilverOnlyBuyStrategy: BuyStrategy = {
  name: "銀貨のみ購入",
  descriptions: [
    "8金以上なら属州を購入",
    "3金以上なら銀貨を購入",
    "それ以外は何もしない",
  ],
  execute: (state) => {
    const newState = { ...state };
    const purchases: string[] = [];

    if (newState.gold >= 8) {
      purchases.push("属州");
      newState.gold -= 8;
    } else if (newState.gold >= 3) {
      purchases.push("銀貨");
      newState.gold -= 3;
    }

    newState.discard.push(...purchases);

    return { newState, purchases };
  },
};
