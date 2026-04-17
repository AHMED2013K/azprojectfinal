export function isAdmin(user) {
  return user?.role === 'admin';
}

export function isManager(user) {
  return user?.role === 'manager';
}

export function isViewer(user) {
  return user?.role === 'viewer';
}

export function canManageWorkspace(user) {
  return isAdmin(user) || isManager(user);
}

export function canEditLeads(user) {
  return !isViewer(user);
}

export function buildLeadAccessQuery(user) {
  if (canManageWorkspace(user)) {
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
  if (canManageWorkspace(user)) {
    return true;
  }

  const createdBy = lead.createdBy?.toString?.() || String(lead.createdBy || '');
  const assignedTo = lead.assignedTo?.toString?.() || String(lead.assignedTo || '');
  const userId = user._id.toString();

  return createdBy === userId || assignedTo === userId;
}
