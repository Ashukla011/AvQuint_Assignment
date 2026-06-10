export function getApiError(error) {
  const data = error?.response?.data;
  if (typeof data?.message === 'string') return data.message;
  if (typeof data?.error === 'string') return data.error;
  if (Array.isArray(data?.errors)) {
    return data.errors.map((e) => e.msg || e.message).join(', ');
  }
  if (error?.message) return error.message;
  return 'Request failed. Please try again.';
}

export function normalizeTask(task) {
  if (!task) return task;
  return {
    ...task,
    id: task.id || task._id,
  };
}

export function normalizeUser(user) {
  if (!user) return user;
  return {
    ...user,
    id: user.id || user._id,
  };
}

function decodeJwtPayload(token) {
  try {
    const base64 = token.split('.')[1];
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return {};
  }
}

export function buildUserFromToken(token, fallback = {}) {
  const payload = decodeJwtPayload(token);
  return normalizeUser({
    id: payload.id || payload.userId || payload._id,
    email: payload.email || fallback.email,
    name: payload.name || fallback.name,
  });
}

export function parseAuthResponse(data, fallback = {}) {
  const token = data.token || data.data?.token;
  let user = normalizeUser(data.user || data.data?.user);

  if (token && !user?.id) {
    user = buildUserFromToken(token, fallback);
  }

  if (!token) throw new Error(data.message || 'Authentication failed');
  if (!user?.id) throw new Error(data.message || 'Authentication failed');

  return { token, user };
}

export function parseTasksResponse(data, fallback = {}) {
  const payload = data.data ?? data;
  const raw = payload.tasks || payload.data || payload;
  const tasks = (Array.isArray(raw) ? raw : []).map(normalizeTask);
  const total = payload.total ?? payload.totalTasks ?? payload.count ?? tasks.length;
  const page = payload.page ?? payload.currentPage ?? fallback.page ?? 1;
  const limit = payload.limit ?? payload.pageSize ?? fallback.limit ?? 5;
  const totalPages = payload.totalPages ?? Math.max(1, Math.ceil(total / limit));

  return { data: tasks, total, page, limit, totalPages };
}
