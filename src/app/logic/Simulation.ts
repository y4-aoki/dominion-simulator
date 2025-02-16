// src/simulation.ts
import { GameState, SimulationConfig, SimulationResult, Turn } from "@/types";

// 初期状態の設定
const INITIAL_DECK = ["銅貨", "銅貨", "銅貨", "銅貨", "銅貨", "銅貨", "銅貨", "屋敷", "屋敷", "屋敷"];

// シャッフル関数（簡単な実装）
const shuffle = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const simulateGame = ({
  maxTurns, goalProvinces, playActionPhase, playBuyPhase }: SimulationConfig
): SimulationResult => {
  let turns: Turn[] = [];
  let state: GameState = {
    deck: shuffle([...INITIAL_DECK]),
    hand: [],
    discard: [],
    inPlay: [],
    trash: [],
    gold: 0,
    actions: 1,
    buys: 1,
  };

  // 初期の手札をドロー
  for (let i = 0; i < 5; i++) {
    if (state.deck.length === 0) {
      state.deck = shuffle(state.discard);
      state.discard = [];
    }
    state.hand.push(state.deck.shift()!);
  }

  let provinceCount = 0;

  for (let turnNumber = 1; turnNumber <= maxTurns; turnNumber++) {
    const initialHand = [...state.hand];

    // アクションフェーズ
    state = playActionPhase(state);

    // 購入フェーズ
    state.gold = state.hand.reduce(
      (sum, card) =>
        sum +
        (card === "金貨" ? 3 : card === "銀貨" ? 2 : card === "銅貨" ? 1 : 0),
      0
    );
    const purchasableGold = state.gold;
    let buyResult = playBuyPhase(state);
    state = buyResult.newState;
    provinceCount += buyResult.purchases.filter((card) => card === "属州").length;

    turns.push({
      turnNumber,
      purchases: [...buyResult.purchases], // 配列もコピー
      initialHand: [...initialHand], // 手札もコピー
      deck: [...state.deck], // デッキの状態をコピー
      hand: [...state.hand], // 手札の状態をコピー
      discard: [...state.discard], // 捨て札の状態をコピー
      inPlay: [...state.inPlay], // 場に出ているカードもコピー
      trash: [...state.trash],
      gold: purchasableGold,
      actions: state.actions,
      buys: state.buys,
    });

    // クリーンアップフェーズ
    state.discard.push(...state.hand, ...state.inPlay);
    state.hand = [];
    state.inPlay = [];
    state.actions = 1;
    state.buys = 1;

    // ゲーム終了条件
    if (provinceCount >= goalProvinces) break;

    // 次のターンの手札をドロー
    for (let i = 0; i < 5; i++) {
      if (state.deck.length === 0) {
        state.deck = shuffle(state.discard);
        state.discard = [];
      }
      if (state.deck.length > 0) {
        state.hand.push(state.deck.shift()!);
      }
    }
  }

  return { turns, finalGold: state.gold, gameEndReason: provinceCount >= goalProvinces ? "属州を買い切った" : "ターン制限" };
};
