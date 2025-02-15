// src/simulation.ts
import { SimulationResult, Turn } from "@/types";

// 初期状態の設定
const INITIAL_DECK = ["銅貨", "銅貨", "銅貨", "銅貨", "銅貨", "銅貨", "銅貨", "屋敷", "屋敷", "屋敷"];
const GOLD_COSTS = {
  "属州": 8,
  "金貨": 6,
  "銀貨": 3,
};

// シャッフル関数（簡単な実装）
const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const simulateGame = (): SimulationResult => {
  const turns: Turn[] = [];
  let deck = [...INITIAL_DECK]; // デッキをコピー
  let hand: string[] = [];
  let discard: string[] = [];
  let gold = 0;
  let gameEndReason = "";
  let provinceCount = 0; // 属州購入枚数のカウント

  // ゲーム開始時に手札を5枚引く
  hand = shuffle(deck).slice(0, 5);
  deck = deck.slice(5); // 使った分をデッキから除く

  // ゲームループ（ターンごとにシミュレーション）
  for (let turnNumber = 1; turnNumber <= 20; turnNumber++) {
    // 購入フェーズ
    gold = hand.reduce((sum, card) => {
      if (card === "金貨") return sum + 3;
      if (card === "銀貨") return sum + 2;
      if (card === "銅貨") return sum + 1;
      return sum;
    }, 0);
    const purchaseableGold = gold;

    const purchases: string[] = [];

    // 所持金で購入可能なカードを購入
    if (gold >= GOLD_COSTS["属州"] && provinceCount < 5) {
      purchases.push("属州");
      gold -= GOLD_COSTS["属州"];
      provinceCount++; // 属州購入枚数をカウント
    } else if (gold >= GOLD_COSTS["金貨"]) {
      purchases.push("金貨");
      gold -= GOLD_COSTS["金貨"];
    } else if (gold >= GOLD_COSTS["銀貨"]) {
      purchases.push("銀貨");
      gold -= GOLD_COSTS["銀貨"];
    }

    // ターンの記録（購入金額のみ記録）
    turns.push({
      turnNumber,
      gold: purchaseableGold,  // 現在の所持金（購入後の残金）
      purchases, // 購入したカード
      initialHand: [...hand],
      actions: [], // 戦略「財宝購入のみ」なのでアクションは無し
      deck,
      discard: [...discard], // クリーンアップ前の捨て札状態を記録
    });

    // 購入したカードは捨て札に
    discard.push(...purchases);

    // 使用したカード（手札のカード）はすべて捨て札に送る
    discard.push(...hand);

    // 属州を5枚購入した時点で終了
    if (provinceCount >= 5) {
      gameEndReason = "属州を5枚購入したため終了";
      break;
    }

    // 次のターンに向けて、手札の更新（カードのシャッフル、デッキの補充など）
    let cardsToDraw = 5;  // 最大5枚引く
    let drawnCards: string[] = [];

    if (deck.length < cardsToDraw) {
      // デッキが足りない場合、デッキから引ける分を引く
      drawnCards = deck.slice(0, deck.length); // デッキから引けるだけ引く
      cardsToDraw -= drawnCards.length; // 引いた分を残りの必要枚数から減らす

      // デッキが足りない分を捨て札からシャッフルして補充
      deck = shuffle([...deck, ...discard]);
      discard = [];

      // 新しいデッキから残りを引く
      drawnCards.push(...deck.slice(0, cardsToDraw));
      deck = deck.slice(cardsToDraw); // 引いた分をデッキから除く
    } else {
      // デッキから十分な枚数がある場合
      drawnCards = deck.slice(0, cardsToDraw);
      deck = deck.slice(cardsToDraw); // 引いた分をデッキから除く
    }

    // 引いたカードを手札に追加
    hand = drawnCards;
  }

  // 終了条件の設定（ここでは属州5枚購入で終了）
  if (provinceCount < 5) {
    gameEndReason = "ターン制限に達しました";
  }

  return {
    turns,
    finalGold: gold,
    gameEndReason,
  };
};
