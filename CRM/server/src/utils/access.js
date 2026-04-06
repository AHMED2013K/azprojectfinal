export function isAdmin(user) {
  return user?.role === 'admin';
}

export function buildLeadAccessQuery(user) {
  if (isAdmin(user)) {
    return {};
  }

  return {
    $or: [
      { createdBy: user._id },
      { assignedTo: user._id },
    ],
  };
}

export function assertLeadAccess(user, lead) {
  if (isAdmin(user)) {
    return true;
  }

  const createdBy = lead.createdBy?.toString?.() || String(lead.createdBy || '');
  const assignedTo = lead.assignedTo?.toString?.() || String(lead.assignedTo || '');
  const userId = user._id.toString();

  return createdBy === userId || assignedTo === userId;
}
