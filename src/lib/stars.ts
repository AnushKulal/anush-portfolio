// Deterministic pseudo-random generator so stars render identically on the
// server and the client (prevents React hydration mismatches).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Star {
  size: number;
  top: number;
  left: number;
  duration: number;
  delay: number;
}

export function generateStars(count: number, seed = 1): Star[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    size: rand() * 3 + 1,
    top: rand() * 100,
    left: rand() * 100,
    duration: 2 + rand() * 4,
    delay: rand() * 3,
  }));
}
