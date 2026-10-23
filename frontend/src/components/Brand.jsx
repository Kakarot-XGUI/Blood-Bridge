export default function Brand({ light = false, compact = false }) {
  return <a href="/" className={`inline-flex items-center gap-3 ${light ? "text-white" : "text-slate-950"}`}>
    <span className={`${compact ? "size-9 text-lg" : "size-11 text-2xl"} grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 font-black text-white shadow-lg shadow-rose-600/25`}>✚</span>
    <span>
      <span className={`${compact ? "text-base" : "text-lg"} block font-extrabold tracking-tight`}>Blood Bridge</span>
      {!compact && <span className={`block text-[9px] font-bold tracking-[0.22em] ${light ? "text-white/55" : "text-slate-400"}`}>CARE CONNECTED</span>}
    </span>
  </a>;
}
