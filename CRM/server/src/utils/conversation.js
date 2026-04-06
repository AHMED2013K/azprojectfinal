export function createConversationId(userIdA, userIdB) {
  return [String(userIdA), String(userIdB)].sort().join(':');
}
