const BLOCKED_WORDS = ["profanity1", "profanity2"];

/**
 * Basic client-side profanity and etiquette check before submitting a comment.
 */
export function containsProfanity(text: string): boolean {
  const normalized = text.toLowerCase();
  return BLOCKED_WORDS.some((word) => normalized.includes(word));
}
