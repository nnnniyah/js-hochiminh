export function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}