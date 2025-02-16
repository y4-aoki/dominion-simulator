// 場の基本的な状態（デッキ、手札、捨て札、金貨、アクション、購入回数）
export type BaseState = {
    deck: string[];
    hand: string[];
    discard: string[];
    inPlay: string[];
    gold: number;
    actions: number;
    buys: number;
};

// 現在のゲームの状態
export type GameState = BaseState;

// 1ターンの履歴（BaseState に加えて、そのターンでの購入や初期手札など）
export type Turn = BaseState & {
    turnNumber: number;
    purchases: string[];
    initialHand: string[];
};

export type SimulationResult = {
    turns: Turn[];
    finalGold: number;
    gameEndReason: string;
};

// 戦略の型
export type Strategy = {
    playActionPhase: (state: GameState) => GameState;
    playBuyPhase: (state: GameState) => { newState: GameState; purchases: string[] };
};

export type SimulationConfig = {
    strategy: Strategy; // 戦略の型を定義するなら Strategy 型を作る
    maxTurns: number;
    goalProvinces: number;
};