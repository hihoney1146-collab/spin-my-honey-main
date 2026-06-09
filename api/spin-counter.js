const COUNTER_KEY = "global_spin_count";

// Historical seed added to the live KV count so the display reflects
// organic-looking accumulated spins before the counter was instrumented.
const SPIN_COUNT_SEED = Math.max(
  0,
  parseInt(process.env.SPIN_COUNT_SEED ?? "0", 10) || 0,
);

function setCounterHeaders(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
}

function isKvConfigured() {
  const hasVercelKv =
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
  const hasUpstashRedis =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

  return Boolean(hasVercelKv || hasUpstashRedis);
}

async function getKv() {
  const { kv } = await import("@vercel/kv");
  return kv;
}

export default async function handler(req, res) {
  setCounterHeaders(res);

  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ count: 0, error: "Method not allowed" });
  }

  if (!isKvConfigured()) {
    return res.status(200).json({ count: SPIN_COUNT_SEED, configured: false });
  }

  try {
    const kv = await getKv();

    if (req.method === "POST") {
      const raw = await kv.incr(COUNTER_KEY);
      return res.status(200).json({ count: raw + SPIN_COUNT_SEED });
    }

    const raw = await kv.get(COUNTER_KEY);
    const count = typeof raw === "number" ? raw : Number(raw) || 0;
    return res.status(200).json({ count: count + SPIN_COUNT_SEED });
  } catch (error) {
    console.error("Spin counter API error:", error);
    return res.status(200).json({ count: 0, error: "Counter unavailable" });
  }
}
