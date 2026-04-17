import Lead from '../models/Lead.js';
import { getEnv } from '../config/env.js';
import { buildLeadMetadataMap } from './leadMetadata.js';

let cachedMetadata = null;
let cachedAt = 0;
let pendingPromise = null;

export function invalidateLeadMetadataCache() {
  cachedMetadata = null;
  cachedAt = 0;
  pendingPromise = null;
}

export async function getLeadMetadataMapCached() {
  const now = Date.now();
  const { METADATA_CACHE_TTL_MS } = getEnv();

  if (cachedMetadata && now - cachedAt < METADATA_CACHE_TTL_MS) {
    return cachedMetadata;
  }

  if (!pendingPromise) {
    pendingPromise = Lead.find({}, '_id createdAt').sort({ createdAt: 1, _id: 1 }).lean()
      .then((leads) => {
        cachedMetadata = buildLeadMetadataMap(leads);
        cachedAt = Date.now();
        return cachedMetadata;
      })
      .finally(() => {
        pendingPromise = null;
      });
  }

  return pendingPromise;
}
