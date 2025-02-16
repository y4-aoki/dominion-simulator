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

export const ChapelEstateTrashStrategy: ActionStrategy = {
  name: "屋敷のみ廃棄",
  descriptions: [
    "手札に礼拝堂がある場合、屋敷のみを最大4枚まで廃棄する",
  ],
  execute: (state: GameState) => {
    const newState = { ...state };

    if (newState.hand.includes("礼拝堂")) {
      // 礼拝堂を使用（手札から場に出す）
      newState.hand = newState.hand.filter(card => card !== "礼拝堂");
      newState.inPlay.push("礼拝堂");

      // 廃棄する屋敷を選択（最大4枚）
      const estateTrashLimit = 4;
      const estatesToTrash = newState.hand.filter(card => card === "屋敷").slice(0, estateTrashLimit);

      // 手札から屋敷を取り除き、廃棄置き場へ
      newState.hand = newState.hand.filter(card => card !== "屋敷").concat(newState.hand.filter(card => card === "屋敷").slice(estateTrashLimit));
      newState.trash.push(...estatesToTrash);
    }

    return newState;
  },
};

export const ChapelEstateAndHandCopperTrashStrategy: ActionStrategy = {
  name: "手札内で銅貨を調整",
  descriptions: [
    "手札に礼拝堂がある場合、屋敷を最大4枚まで廃棄する。",
    "4 または 5 金 → 3 金になるまで廃棄",
    "7 金 → 6 金になるまで廃棄",
    "9 金以上 → 8 金になるまで廃棄",
  ],
  execute: (state: GameState) => {
    const newState = { ...state };

    if (newState.hand.includes("礼拝堂")) {
      // 礼拝堂を使用（手札から場に出す）
      newState.hand = newState.hand.filter(card => card !== "礼拝堂");
      newState.inPlay.push("礼拝堂");

      // 屋敷を最大4枚まで廃棄
      const estateTrashLimit = 4;
      const estatesToTrash = newState.hand.filter(card => card === "屋敷").slice(0, estateTrashLimit);
      newState.hand = newState.hand.filter(card => card !== "屋敷").concat(newState.hand.filter(card => card === "屋敷").slice(estateTrashLimit));
      newState.trash.push(...estatesToTrash);

      // 現在の手札の金量を計算
      const goldAmount = newState.hand.reduce((sum, card) => {
        if (card === "銅貨") return sum + 1;
        if (card === "銀貨") return sum + 2;
        if (card === "金貨") return sum + 3;
        return sum;
      }, 0);

      // 目標金量の設定
      let targetGold = goldAmount;
      if ([4, 5].includes(goldAmount)) targetGold = 3;
      else if (goldAmount === 7) targetGold = 6;
      else if (goldAmount >= 9) targetGold = 8;

      // 必要な銅貨の廃棄
      const goldToRemove = goldAmount - targetGold; // 余分な金量
      const coppersToTrash = [];
      let removedGold = 0;

      while (removedGold < goldToRemove && newState.hand.includes("銅貨")) {
        newState.hand.splice(newState.hand.indexOf("銅貨"), 1);
        coppersToTrash.push("銅貨");
        removedGold += 1; // 銅貨は1金
      }


      // 廃棄置き場へ追加
      newState.trash.push(...coppersToTrash);
    }

    return newState;
  },
};

export const ChapelEstateAndTotalCopperTrashStrategy: ActionStrategy = {
  name: "デッキ内で銅貨を調整",
  descriptions: [
    "手札に礼拝堂がある場合、屋敷を最大4枚まで廃棄する。",
    "さらに、すべてのカードの金量合計が4を超える場合、4以下になるまで銅貨を廃棄する。",
  ],
  execute: (state: GameState) => {
    const newState = { ...state };

    if (newState.hand.includes("礼拝堂")) {
      // 礼拝堂を使用（手札から場に出す）
      newState.hand = newState.hand.filter(card => card !== "礼拝堂");
      newState.inPlay.push("礼拝堂");

      // 屋敷を最大4枚まで廃棄
      const estateTrashLimit = 4;
      const estatesToTrash = newState.hand.filter(card => card === "屋敷").slice(0, estateTrashLimit);
      newState.hand = newState.hand.filter(card => card !== "屋敷").concat(newState.hand.filter(card => card === "屋敷").slice(estateTrashLimit));
      newState.trash.push(...estatesToTrash);

      // すべてのカードの金量を計算
      const totalGoldAmount = [...newState.hand, ...newState.deck, ...newState.discard].reduce((sum, card) => {
        if (card === "銅貨") return sum + 1;
        if (card === "銀貨") return sum + 2;
        if (card === "金貨") return sum + 3;
        return sum;
      }, 0);

      // 金量が4を超えていたら、4以下になるまで銅貨を廃棄
      const coppersToTrash = [];
      while (totalGoldAmount > 4 && newState.hand.includes("銅貨")) {
        newState.hand.splice(newState.hand.indexOf("銅貨"), 1);
        coppersToTrash.push("銅貨");
      }

      // 廃棄置き場へ追加
      newState.trash.push(...coppersToTrash);
    }

    return newState;
  },
};
