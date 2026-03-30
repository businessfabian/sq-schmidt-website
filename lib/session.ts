import { createHmac, randomBytes } from "crypto"

const SECRET = process.env.ADMIN_PASSWORD ?? ""

/**
 * Create a signed session token.
 * Format: <random-hex>.<hmac-hex>
 */
export function createSessionToken(): string {
  const payload = randomBytes(32).toString("hex")
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex")
  return `${payload}.${sig}`
}

/**
 * Verify a session token's signature.
 */
export function verifySessionToken(token: string): boolean {
  const parts = token.split(".")
  if (parts.length !== 2) return false
  const [payload, sig] = parts
  if (!payload || !sig) return false
  const expected = createHmac("sha256", SECRET).update(payload).digest("hex")
  // Constant-time comparison
  if (sig.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < sig.length; i++) {
    mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}
