import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/tasks/TaskCard';
import TaskForm from '../components/tasks/TaskForm';
import FilterBar from '../components/tasks/FilterBar';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
export default function Dashboard() {
  const { user, logout } = useAuth();
  const {
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
  } = useTasks();

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const stats = {
    total: pagination.total,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    Incomplete: tasks.filter((t) => t.status === 'Incomplete').length,
  };

  const handleAdd = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleFormSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        await editTask(editingTask.id, data);
      } else {
        await addTask(data);
      }
      setShowModal(false);
      setEditingTask(null);
    } catch (err) {
      alert(err.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeTask(id);
      setDeleteConfirm(null);
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">FocusFlow</h1>
              <p className="text-xs text-gray-400 hidden sm:block">Stay focused, stay productive</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
            </div>
            <Button variant="secondary" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero stats */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-1">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-gray-500">Here's what's on your plate today.</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Tasks', value: stats.total, color: 'from-brand-500 to-purple-600', icon: '📋' },
            { label: 'Completed', value: stats.completed, color: 'from-emerald-500 to-teal-600', icon: '✅' },
            { label: 'In Progress', value: stats.inProgress, color: 'from-blue-500 to-indigo-600', icon: '⚡' },
            { label: 'Incomplete', value: stats.Incomplete, color: 'from-amber-500 to-orange-600', icon: '⏳' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tasks section */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl shadow-brand-500/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your Tasks</h3>
              <p className="text-sm text-gray-500 mt-0.5">Manage and track your to-do items</p>
            </div>
            <Button onClick={handleAdd}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </Button>
          </div>

          <div className="mb-6">
            <FilterBar filters={filters} onFilterChange={updateFilters} />
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
              <p className="text-sm text-gray-400">Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-700">No tasks found</p>
                <p className="text-sm text-gray-400 mt-1">
                  {filters.search || filters.status !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Create your first task to get started'}
                </p>
              </div>
              {!filters.search && filters.status === 'all' && (
                <Button onClick={handleAdd} variant="secondary">Add your first task</Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task, i) => (
                <div key={task.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <TaskCard
                    task={task}
                    onToggle={toggleStatus}
                    onEdit={handleEdit}
                    onDelete={(id) => setDeleteConfirm(id)}
                  />
                </div>
              ))}
            </div>
          )}

          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={setPage}
            onLimitChange={setLimit}
          />
        </div>
      </main>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditingTask(null); }}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <TaskForm
          onSubmit={handleFormSubmit}
          initialData={editingTask}
          loading={formLoading}
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Task"
        size="sm"
      >
        <p className="text-gray-600 text-sm mb-6">
          Are you sure you want to delete this task? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
