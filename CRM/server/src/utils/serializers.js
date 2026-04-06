export function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar || user.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
    isOnline: Boolean(user.isOnline),
    lastSeenAt: user.lastSeenAt,
    createdAt: user.createdAt,
  };
}

export function serializeLead(lead) {
  return {
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    country: lead.country,
    campaign: lead.campaign,
    source: lead.source,
    status: lead.status,
    statusTimeline: {
      contactedAt: lead.statusTimeline?.contactedAt || null,
      notInterestedAt: lead.statusTimeline?.notInterestedAt || null,
      convertedAt: lead.statusTimeline?.convertedAt || null,
    },
    details: {
      dateOfBirth: lead.details?.dateOfBirth || '',
      age: lead.details?.age ?? null,
      studyField: lead.details?.studyField || '',
      studyLevel: lead.details?.studyLevel || '',
      alternanceAwareness: lead.details?.alternanceAwareness || '',
      financialSituation: lead.details?.financialSituation || '',
      message: lead.details?.message || '',
    },
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
    createdBy: lead.createdBy ? sanitizeUser(lead.createdBy) : null,
    assignedTo: lead.assignedTo ? sanitizeUser(lead.assignedTo) : null,
    notes: (lead.notes || []).map((note) => ({
      id: note._id?.toString?.() || String(note._id),
      body: note.body,
      createdAt: note.createdAt,
      author: note.author ? sanitizeUser(note.author) : null,
    })),
  };
}

export function serializeMessage(message) {
  return {
    id: message._id.toString(),
    conversationId: message.conversationId,
    body: message.body,
    createdAt: message.createdAt,
    sender: sanitizeUser(message.sender),
    recipient: sanitizeUser(message.recipient),
  };
}
