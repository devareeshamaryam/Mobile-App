// lib/loginAttempts.ts
// In-memory store — server restart pe reset ho jata hai
// Production mein Redis use kar sakte hain

interface AttemptData {
  count: number;
  blockedUntil?: number; // timestamp
}

const attempts = new Map<string, AttemptData>();

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function getAttempts(ip: string): AttemptData {
  return attempts.get(ip) ?? { count: 0 };
}

export function isBlocked(ip: string): boolean {
  const data = attempts.get(ip);
  if (!data?.blockedUntil) return false;
  if (Date.now() > data.blockedUntil) {
    attempts.delete(ip); // block khatam — reset
    return false;
  }
  return true;
}

export function recordFailedAttempt(ip: string): number {
  const data = attempts.get(ip) ?? { count: 0 };
  data.count += 1;
  if (data.count >= MAX_ATTEMPTS) {
    data.blockedUntil = Date.now() + BLOCK_DURATION_MS;
  }
  attempts.set(ip, data);
  return data.count;
}

export function resetAttempts(ip: string): void {
  attempts.delete(ip);
}

export function getRemainingMinutes(ip: string): number {
  const data = attempts.get(ip);
  if (!data?.blockedUntil) return 0;
  return Math.ceil((data.blockedUntil - Date.now()) / 60000);
}