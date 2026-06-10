import Button from './Button';

export default function Pagination({ page, totalPages, total, limit, onPageChange, onLimitChange }) {
  if (totalPages <= 1 && total <= limit) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Show</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="rounded-lg border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <span>of {total} tasks</span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          ← Prev
        </Button>

        {start > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-9 h-9 rounded-lg text-sm font-medium text-gray-600 hover:bg-brand-50 transition-colors"
            >
              1
            </button>
            {start > 2 && <span className="px-1 text-gray-400">…</span>}
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
              p === page
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30'
                : 'text-gray-600 hover:bg-brand-50'
            }`}
          >
            {p}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="px-1 text-gray-400">…</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-9 h-9 rounded-lg text-sm font-medium text-gray-600 hover:bg-brand-50 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
