export function Badge({ className = "", children, ...props }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}