import { STATUS_COLORS, STATUS_LABELS,STATUS_OPTIONS } from '../../utils/constants';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`group relative glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-0.5 ${
        isCompleted ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            isCompleted
              ? 'bg-emerald-500 border-emerald-500'
              : task.status === 'in_progress'
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-brand-500'
          }`}
          title="Toggle status"
        >
          {isCompleted && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {task.status === 'in_progress' && !isCompleted && (
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-soft" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className={`font-semibold text-gray-900 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{task.description}</p>
              )}
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-2 rounded-lg hover:bg-brand-50 text-gray-400 hover:text-brand-600 transition-colors"
                title="Edit task"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete task"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[task.status]}`}>
              {STATUS_LABELS[task.status]}
            </span>
           
            {task.dueDate && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
