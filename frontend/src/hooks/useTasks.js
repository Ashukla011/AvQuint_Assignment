import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from '../api/taskService';
import { getApiError } from '../api/helpers';

export function useTasks(initialFilters = {}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 5, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    ...initialFilters,
  });

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchTasks({
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      });
      setTasks(result.data);
      setPagination((prev) => ({
        ...prev,
        total: result.total,
        totalPages: result.totalPages,
      }));
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const setPage = useCallback((page) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }));
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const addTask = useCallback(async (taskData) => {
    const task = await createTask(taskData);
    await loadTasks();
    return task;
  }, [loadTasks]);

  const editTask = useCallback(async (id, updates) => {
    const task = await updateTask(id, updates);
    await loadTasks();
    return task;
  }, [loadTasks]);

  const removeTask = useCallback(async (id) => {
    await deleteTask(id);
    await loadTasks();
  }, [loadTasks]);

  const toggleStatus = useCallback(async (id) => {
    const task = await toggleTaskStatus(id);
    await loadTasks();
    return task;
  }, [loadTasks]);

  return {
    tasks,
    loading,
    error,
    pagination,
    filters,
    setPage,
    setLimit,
    updateFilters,
    addTask,
    editTask,
    removeTask,
    toggleStatus,
    refresh: loadTasks,
  };
}
