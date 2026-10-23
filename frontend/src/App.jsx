import { useEffect, useState } from "react";
import { api } from "./lib/api";
import PublicHome from "./pages/PublicHome";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";

export default function App() {
  const isAdmin = window.location.pathname === "/admin";
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(isAdmin);

  useEffect(() => {
    if (!isAdmin) return;
    api.get("/auth/me").then(({ data }) => setUser(data.user)).catch(() => setUser(null)).finally(() => setChecking(false));
  }, [isAdmin]);

  if (!isAdmin) return <PublicHome />;
  if (checking) return <main className="grid min-h-screen place-items-center bg-[#f7faf8] text-sm text-slate-500">Checking secure access...</main>;
  if (!user) return <AdminLogin onLogin={setUser} />;
  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    window.location.assign("/admin");
  };
  return user.role === "super_admin"
    ? <AdminDashboard user={user} onLogout={logout} />
    : <OrganizationDashboard user={user} onLogout={logout} />;
}
