export default function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = variant === "secondary"
    ? "border border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
    : variant === "dark"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "bg-gradient-to-r from-rose-600 to-rose-700 text-white shadow-lg shadow-rose-600/15 hover:-translate-y-0.5 hover:from-rose-700 hover:to-rose-800";
  return <button {...props} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-rose-100 disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}>{children}</button>;
}
