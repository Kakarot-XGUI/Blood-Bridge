import { useState } from "react";
import Brand from "./Brand";

const nav = [["overview", "Overview", "⌂"], ["organizations", "Network organizations", "◇"], ["requests", "Blood requests", "＋"]];

export default function AdminShell({ user, active, onNavigate, onLogout, children, workspaceLabel = "ADMIN CONSOLE", navigation = nav }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="min-h-screen bg-[#f6f8f7] text-slate-900">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-slate-200/80 bg-white px-5 py-6 lg:flex">
      <Brand compact /><p className="mt-10 px-3 text-[10px] font-extrabold tracking-[0.2em] text-slate-400">ADMIN CONSOLE</p>
      <nav className="mt-4 space-y-1">{navigation.map(([id, label, icon]) => <button key={id} onClick={() => onNavigate(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${active === id ? "bg-emerald-50 text-emerald-800" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}><span className="grid size-7 place-items-center rounded-lg bg-slate-100 text-base">{icon}</span>{label}</button>)}</nav>
      <div className="mt-auto rounded-2xl bg-slate-900 p-4 text-white"><p className="text-xs font-bold">Network control centre</p><p className="mt-1 text-[11px] leading-5 text-slate-400">Manage trusted care partners and access.</p><button onClick={onLogout} className="mt-4 text-xs font-bold text-rose-300 hover:text-rose-200">Sign out →</button></div>
    </aside>
    {mobileOpen && <div className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" onClick={() => setMobileOpen(false)}><aside className="h-full w-72 bg-white p-5" onClick={(e) => e.stopPropagation()}><Brand compact /><nav className="mt-10 space-y-1">{navigation.map(([id, label, icon]) => <button key={id} onClick={() => { onNavigate(id); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${active === id ? "bg-emerald-50 text-emerald-800" : "text-slate-500"}`}><span>{icon}</span>{label}</button>)}</nav></aside></div>}
    <div className="lg:pl-72"><header className="flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/80 px-5 backdrop-blur sm:px-8"><button className="text-2xl lg:hidden" onClick={() => setMobileOpen(true)}>☰</button><div className="hidden lg:block"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">{workspaceLabel}</p><p className="mt-1 text-sm text-slate-500">Welcome back, {user.name?.split(" ")[0] || "admin"}</p></div><div className="flex items-center gap-3"><span className="hidden text-right sm:block"><b className="block text-sm">{user.name}</b><small className="text-xs text-slate-400">{user.email}</small></span><span className="grid size-10 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-800">{user.name?.slice(0, 2).toUpperCase()}</span></div></header><main className="mx-auto max-w-[1500px] p-5 sm:p-8">{children}</main></div>
  </div>;
}
