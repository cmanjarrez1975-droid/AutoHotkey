export type TradeDirection = "Largo" | "Corto";

export type RiskPlan = {
  valid: boolean;
  rr: number;
  stopPercent: number;
  targetPercent: number;
  riskPerUnit: number;
  rewardPerUnit: number;
  riskAmount: number;
  positionSize: number;
  reason: string;
};

export function calculateRiskPlan({
  entry,
  stop,
  target,
  account,
  riskPercent,
  direction,
}: {
  entry: number;
  stop: number;
  target: number;
  account: number;
  riskPercent: number;
  direction: TradeDirection;
}): RiskPlan {
  const numbers = [entry, stop, target, account, riskPercent];
  if (numbers.some((value) => !Number.isFinite(value) || value <= 0)) {
    return {
      valid: false,
      rr: 0,
      stopPercent: 0,
      targetPercent: 0,
      riskPerUnit: 0,
      rewardPerUnit: 0,
      riskAmount: 0,
      positionSize: 0,
      reason: "Completa entrada, stop, objetivo, capital y riesgo con valores positivos.",
    };
  }

  const longGeometry = stop < entry && target > entry;
  const shortGeometry = stop > entry && target < entry;
  const valid = direction === "Largo" ? longGeometry : shortGeometry;
  const riskPerUnit = Math.abs(entry - stop);
  const rewardPerUnit = Math.abs(target - entry);
  const riskAmount = account * (riskPercent / 100);

  return {
    valid,
    rr: valid && riskPerUnit > 0 ? rewardPerUnit / riskPerUnit : 0,
    stopPercent: (riskPerUnit / entry) * 100,
    targetPercent: (rewardPerUnit / entry) * 100,
    riskPerUnit,
    rewardPerUnit,
    riskAmount,
    positionSize: riskPerUnit > 0 ? riskAmount / riskPerUnit : 0,
    reason: valid
      ? "La geometría de entrada, invalidación y objetivo es coherente."
      : direction === "Largo"
        ? "En largo, el stop debe quedar bajo la entrada y el objetivo por encima."
        : "En corto, el stop debe quedar sobre la entrada y el objetivo por debajo.",
  };
}

function secureRandom() {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.getRandomValues === "function"
  ) {
    const value = new Uint32Array(1);
    globalThis.crypto.getRandomValues(value);
    return value[0] / 4294967296;
  }
  return Math.random();
}

export function shuffleQuestions<T>(
  items: readonly T[],
  random: () => number = secureRandom,
) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [
      shuffled[swapIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}

export function selectQuestionSession<T extends { id: string; module: number }>({
  bank,
  answeredIds,
  size,
  module,
  random,
}: {
  bank: readonly T[];
  answeredIds: readonly string[];
  size: number;
  module?: number | "all";
  random?: () => number;
}) {
  const filtered =
    module && module !== "all"
      ? bank.filter((question) => question.module === module)
      : [...bank];
  const unseen = filtered.filter(
    (question) => !answeredIds.includes(question.id),
  );
  const pool = unseen.length >= Math.min(size, filtered.length) ? unseen : filtered;
  return shuffleQuestions(pool, random).slice(0, Math.min(size, pool.length));
}

export function completionPercent(completed: number, total: number) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((completed / total) * 100)));
}
