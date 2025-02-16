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

export type SimulationConfig = {
    simulationType: "single" | "repeat";
    maxTurns: number;
    goalProvinces: number;
    playActionPhase: (state: GameState) => GameState;
    playBuyPhase: (state: GameState) => { newState: GameState; purchases: string[] };
};

// 戦略の型
export type ActionStrategy = {
    name: string;
    descriptions: string[]; // アクション戦略の説明（箇条書き）
    execute: (state: GameState) => GameState;
};

export type BuyStrategy = {
    name: string;
    descriptions: string[]; // 購入戦略の説明（箇条書き）
    execute: (state: GameState) => { newState: GameState; purchases: string[] };
};

// 戦略オプション
export type StrategyOption = {
    name: string; // 戦略の名前
    description: string; // 戦略の概要（1つの文字列）
    actionStrategies: ActionStrategy[]; // 選べるアクション戦略
    buyStrategies: BuyStrategy[]; // 選べる購入戦略
};
