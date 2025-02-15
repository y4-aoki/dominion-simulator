// src/types.ts
export type Turn = {
    turnNumber: number;
    gold: number;
    purchases: string[];
    initialHand: string[];
    actions: string[];
    deck: string[];
    discard: string[];
};

export type SimulationResult = {
    turns: Turn[];
    finalGold: number;
    gameEndReason: string;
};
