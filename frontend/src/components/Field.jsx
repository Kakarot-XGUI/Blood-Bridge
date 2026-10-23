export const inputClass = "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10";
export const labelClass = "block text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500";
export default function Field({ label, children }) {
  return <label className={labelClass}>{label}{children}</label>;
}
