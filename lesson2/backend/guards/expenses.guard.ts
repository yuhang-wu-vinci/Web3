export function isValidNewExpense(data: any): boolean {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const candidate = data as Record<string, unknown>;
  const hasValidPayer =
    typeof candidate.payer === "string" ||
    typeof candidate.payerId === "number" ||
    typeof candidate.payerId === "string";

  return (
    typeof candidate.description === "string" &&
    typeof candidate.amount === "number" &&
    hasValidPayer
  );
}