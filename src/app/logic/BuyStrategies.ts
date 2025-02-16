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

export const ChapelBuyStrategy: BuyStrategy = {
  name: "礼拝堂+財宝購入",
  descriptions: [
    "デッキに礼拝堂がない かつ 4金以下なら礼拝堂を購入",
    "8金以上なら属州を購入",
    "6金以上なら金貨を購入",
    "3金以上なら銀貨を購入",
    "それ以外は何もしない",
  ],
  execute: (state) => {
    const newState = { ...state };
    const purchases: string[] = [];

    // デッキ・捨て札・手札に礼拝堂があるかチェック
    const allCards = [...newState.deck, ...newState.discard, ...newState.hand, ...newState.inPlay];
    const hasChapel = allCards.includes("礼拝堂");

    // 礼拝堂をまだ持っていない場合、4金以下で購入
    if (!hasChapel && newState.gold >= 2 && newState.gold <= 4) {
      purchases.push("礼拝堂");
      newState.gold -= 2;
    }

    // 通常の購入処理
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