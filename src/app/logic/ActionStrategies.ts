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
