import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import { STATUS_OPTIONS } from '../../utils/constants';

export default function TaskForm({ onSubmit, initialData, loading }) {
  const isEdit = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      status: 'Incomplete',
      dueDate: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
        <input
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 3, message: 'Title must be at least 3 characters' },
            maxLength: { value: 100, message: 'Title must be under 100 characters' },
          })}
          placeholder="What needs to be done?"
          className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${
            errors.title ? 'border-red-400' : 'border-gray-200'
          }`}
        />
        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
        <textarea
          {...register('description', {
            maxLength: { value: 500, message: 'Description must be under 500 characters' },
          })}
          rows={3}
          placeholder="Add more details..."
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 resize-none"
        />
        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
          <select
            {...register('status')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            {STATUS_OPTIONS.filter((o) => o.value !== 'all').map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Due Date</label>
          <input
            type="date"
            {...register('dueDate')}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" loading={loading}>
          {isEdit ? 'Save Changes' : 'Add Task'}
        </Button>
      </div>
    </form>
  );
}
