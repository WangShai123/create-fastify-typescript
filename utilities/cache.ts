type CacheKeyPart = number | string;

export function createCacheKey(alias: string, ...parts: CacheKeyPart[]) {
  return [alias, ...parts].map((part) => encodeCacheKeyPart(part)).join(':');
}

function encodeCacheKeyPart(part: CacheKeyPart) {
  return String(part).trim().replaceAll(':', '_');
}
