export function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar || user.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
    isOnline: Boolean(user.isOnline),
    lastSeenAt: user.lastSeenAt,
    failedLoginCount: user.failedLoginCount || 0,
    lastFailedLoginAt: user.lastFailedLoginAt || null,
    lockUntil: user.lockUntil || null,
    twoFactorEnabled: Boolean(user.twoFactorEnabled),
    recoveryCodesRemaining: user.twoFactorRecoveryCodeHashes?.length || 0,
    createdAt: user.createdAt,
  };
}

export function serializeLead(lead, metadata = {}) {
  const duplicateMatchedBy = lead.duplicateFlag?.matchedBy || [];
  const duplicateCount = lead.duplicateFlag?.duplicateCount || 0;
  const shouldShowDuplicate = Boolean(lead.duplicateFlag?.isDuplicate) && duplicateCount > 0 && duplicateMatchedBy.length > 0;

  return {
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    country: lead.country,
    campaign: lead.campaign,
    source: lead.source,
    status: lead.status,
    bucket: lead.bucket || 'leads',
    sequenceNumber: metadata.sequenceNumber || null,
    monthlySequence: metadata.monthlySequence || null,
    leadCode: metadata.leadCode || null,
    monthCode: metadata.monthCode || null,
    statusTimeline: {
      contactedAt: lead.statusTimeline?.contactedAt || null,
      nonQualifiedAt: lead.statusTimeline?.nonQualifiedAt || null,
      notInterestedAt: lead.statusTimeline?.notInterestedAt || null,
      interestedAt: lead.statusTimeline?.interestedAt || null,
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
    score: lead.score || { value: 0, label: 'Cold', reasons: [] },
    duplicateFlag: {
      isDuplicate: shouldShowDuplicate,
      matchedBy: duplicateMatchedBy,
      matchedLeadIds: (lead.duplicateFlag?.matchedLeadIds || []).map((item) => item?.toString?.() || String(item)),
      duplicateCount,
      detectedAt: lead.duplicateFlag?.detectedAt || null,
    },
    lastActivityAt: lead.lastActivityAt || lead.updatedAt || lead.createdAt,
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
    activityLog: (lead.activityLog || []).map((item) => ({
      id: item._id?.toString?.() || String(item._id),
      type: item.type,
      label: item.label,
      meta: item.meta || {},
      createdAt: item.createdAt,
      actor: item.actor ? sanitizeUser(item.actor) : null,
    })),
    tasks: (lead.tasks || []).map((task) => ({
      id: task._id?.toString?.() || String(task._id),
      title: task.title,
      dueAt: task.dueAt,
      completedAt: task.completedAt || null,
      createdAt: task.createdAt,
      createdBy: task.createdBy ? sanitizeUser(task.createdBy) : null,
      completedBy: task.completedBy ? sanitizeUser(task.completedBy) : null,
      status: task.completedAt ? 'completed' : (task.dueAt && new Date(task.dueAt) < new Date() ? 'overdue' : 'open'),
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

export function serializeCandidateApplication(application) {
  return {
    id: application._id.toString(),
    name: application.name,
    email: application.email,
    phone: application.phone,
    experienceYears: application.experienceYears || 0,
    experienceMonths: application.experienceMonths || 0,
    studyField: application.studyField,
    languages: {
      frenchLevel: application.languages?.frenchLevel || '',
      englishLevel: application.languages?.englishLevel || '',
      otherLanguage: application.languages?.otherLanguage || '',
      otherLanguageLevel: application.languages?.otherLanguageLevel || '',
    },
    summerInternshipAvailable: Boolean(application.summerInternshipAvailable),
    summerInternshipMonths: application.summerInternshipMonths ?? null,
    hoursPerDayAvailable: application.hoursPerDayAvailable || 0,
    workMode: application.workMode || '',
    source: application.source || '',
    bucket: application.bucket || 'active',
    reviewStatus: application.reviewStatus || 'pending',
    reviewedAt: application.reviewedAt || null,
    reviewedBy: application.reviewedBy
      ? {
          id: application.reviewedBy._id?.toString?.() || String(application.reviewedBy),
          name: application.reviewedBy.name || '',
        }
      : null,
    cv: {
      fileName: application.cvFileName || 'cv.pdf',
      mimeType: application.cvMimeType || 'application/pdf',
      sizeBytes: application.cvSizeBytes || 0,
    },
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
  };
}
