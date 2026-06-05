const COUNTER_KEY = "global_spin_count";

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
    return res.status(200).json({ count: 0, configured: false });
  }

  try {
    const kv = await getKv();

    if (req.method === "POST") {
      const count = await kv.incr(COUNTER_KEY);
      return res.status(200).json({ count });
    }

    const count = await kv.get(COUNTER_KEY);
    return res.status(200).json({
      count: typeof count === "number" ? count : Number(count) || 0,
    });
  } catch (error) {
    console.error("Spin counter API error:", error);
    return res.status(200).json({ count: 0, error: "Counter unavailable" });
  }
}
