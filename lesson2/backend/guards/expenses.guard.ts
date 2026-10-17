export function isValidNewExpense(data: any): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const candidate = data as Record<string, unknown>;

  const hasValidPayer =
    (typeof candidate.payer === "string" && candidate.payer.trim().length > 0) ||
    typeof candidate.payerId === "number" ||
    (typeof candidate.payerId === "string" && !isNaN(Number(candidate.payerId)));

  const hasValidDescription =
    typeof candidate.description === "string" && candidate.description.trim().length > 0;

  const hasValidAmount =
    typeof candidate.amount === "number" && !isNaN(candidate.amount);

  return hasValidDescription && hasValidAmount && hasValidPayer;
}