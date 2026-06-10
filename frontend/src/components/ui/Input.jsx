export default function Input({
  label,
  error,
  icon,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : 'border-gray-200'}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
