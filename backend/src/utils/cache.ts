import redisClient from '../config/redis';

export function buildCacheKey(base: string, args: any) {
    const filteredArgs = Object.fromEntries(
        Object.entries(args).filter(([_, v]) => v !== undefined && v !== null && v !== "")
    );
    return `${base}:${JSON.stringify(filteredArgs)}`;
}

export async function getOrSetCache<T>(
    key: string,
    fetchData: () => Promise<T>,
    ttlSeconds: number = 60
): Promise<T> {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
        console.log(`REDIS CACHE -  Cache HIT for key: ${key}`);
        return JSON.parse(cachedData);
    }

    console.log(`REDIS CACHE - ❌ Cache MISS for key: ${key}`);
    const result = await fetchData();
    await redisClient.setEx(key, ttlSeconds, JSON.stringify(result));
    console.log(`REDIS CACHE - 💾 Data stored in cache for key: ${key} (TTL: ${ttlSeconds}s)`);
    return result;
}
