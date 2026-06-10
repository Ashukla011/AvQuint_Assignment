import api from './axios';
import { getApiError, normalizeTask, parseTasksResponse } from './helpers';

export async function fetchTasks(params = {}) {
  const query = new URLSearchParams();
  query.set('page', params.page || 1);
  query.set('limit', params.limit || 5);
  if (params.status && params.status !== 'all') query.set('status', params.status);
  if (params.search) query.set('search', params.search);

  const { data } = await api.get(`/tasks?${query.toString()}`);
  if (data.success === false) throw new Error(data.message || 'Failed to fetch tasks');
  return parseTasksResponse(data, { page: params.page, limit: params.limit });
}

export async function createTask(task) {
  const { data } = await api.post('/tasks', task);
  if (data.success === false) throw new Error(data.message || 'Failed to create task');
  const created = data.data?.task || data.task || data.data || data;
  return normalizeTask(created);
}

export async function updateTask(id, updates) {
  const { data } = await api.put(`/tasks/${id}`, updates);
  if (data.success === false) throw new Error(data.message || 'Failed to update task');
  const updated = data.data?.task || data.task || data.data || data;
  return normalizeTask(updated);
}

export async function deleteTask(id) {
  const { data } = await api.delete(`/tasks/${id}`);
  if (data?.success === false) throw new Error(data.message || 'Failed to delete task');
}

export async function toggleTaskStatus(id) {
  const { data } = await api.patch(`/tasks/${id}/status`);
  if (data.success === false) throw new Error(data.message || 'Failed to update status');
  const updated = data.data?.task || data.task || data.data || data;
  return normalizeTask(updated);
}
