import { GameState, Strategy } from "@/types";

export const TreasureOnlyStrategy: Strategy = {
    playActionPhase: (state: GameState): GameState => {
      return { ...state }; // 何もせずそのまま返す
    },
  
    playBuyPhase: (state: GameState): { newState: GameState; purchases: string[] } => {
      const GOLD_COSTS = { "属州": 8, "金貨": 6, "銀貨": 3 };
      let newState = { ...state };
      const purchases: string[] = [];
  
      while (newState.buys > 0) {
        if (newState.gold >= GOLD_COSTS["属州"]) {
          purchases.push("属州");
          newState.gold -= GOLD_COSTS["属州"];
        } else if (newState.gold >= GOLD_COSTS["金貨"]) {
          purchases.push("金貨");
          newState.gold -= GOLD_COSTS["金貨"];
        } else if (newState.gold >= GOLD_COSTS["銀貨"]) {
          purchases.push("銀貨");
          newState.gold -= GOLD_COSTS["銀貨"];
        } else {
          break;
        }
        newState.buys--;
      }
  
      newState.discard.push(...purchases);
      return { newState, purchases };
    },
  };
  