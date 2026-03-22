const BLOCKED_PATTERNS = [
  // Hate speech / caste / religion targeting
  /\b(hindu|muslim|sikh|christian|jain|buddhist)\b.*\b(bad|evil|terrorist|dirty|worst)\b/i,
  /\b(caste|dalit|brahmin|chamar|bhangi)\b/i,
  // Explicit slurs (keeping minimal but effective)
  /\b(f+u+c+k|sh+i+t|a+s+s+h+o+l+e|b+i+t+c+h|d+i+c+k|c+u+n+t)\b/i,
  /\b(chutiya|madarchod|bhenchod|gaandu|randi)\b/i,
  // Violence
  /\b(kill|murder|rape|bomb|attack)\b/i,
];

export function checkContent(text: string): { allowed: boolean; reason?: string } {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(text)) {
      return { allowed: false, reason: "Content contains blocked language. Keep it fun, not harmful!" };
    }
  }
  return { allowed: true };
}
