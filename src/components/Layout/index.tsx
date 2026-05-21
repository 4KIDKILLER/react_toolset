import { useState } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { Card, Button, Divider } from "animal-island-ui";
import Icon from "@/components/Icon";
import { useAuth } from "@/contexts";
import Home from "@/views/home";
import About from "@/views/about";

type NavItem = {
  to: string;
  icon: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "小岛主页", icon: "dog" },
  { to: "/about", label: "岛屿图鉴", icon: "bee" },
];

type SidebarContentProps = {
  username?: string;
  email?: string;
  pathname: string;
  onNavigate?: () => void;
  onLogout: () => void;
};

const SidebarContent = ({
  username,
  email,
  pathname,
  onNavigate,
  onLogout,
}: SidebarContentProps) => (
  <>
    <div className="toolset-wrapper border-b-2 border-dashed border-[#d9c89a]">
      <div className="flex items-center gap-3 rounded-2xl bg-[#fdf6dc] p-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7cd67] text-lg font-bold text-[#725d42] shadow-[0_3px_0_rgba(154,131,90,0.45)]">
          {username?.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-[#725d42]">
            {username}
          </p>
          <p className="truncate text-xs text-[#9a835a]">{email}</p>
        </div>
      </div>
    </div>

    <nav className="flex flex-1 flex-col gap-2 px-3 py-4">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
              active
                ? "bg-[#82d5bb] text-white shadow-[0_4px_0_rgba(85,159,135,0.6)]"
                : "text-[#725d42] hover:bg-[#fdf6dc]"
            }`}
          >
            <Icon name={item.icon} size={24} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>

    <div className="px-3 pb-4">
      <Divider type="wave-yellow" />
      <div className="mt-3">
        <Button type="default" block danger onClick={onLogout}>
          离开小岛
        </Button>
      </div>
    </div>
  </>
);

const Layout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentTitle =
    NAV_ITEMS.find((item) => item.to === location.pathname)?.label ?? "小岛";

  return (
    <div className="flex h-dvh w-full bg-linear-to-br from-[#fdf6dc] via-[#f3e7c4] to-[#e8dab1]">
      <aside className="m-4 z-10 hidden w-64 flex-col overflow-hidden rounded-3xl border-2 border-[#d9c89a] bg-[#f7f3df] shadow-[0_6px_0_rgba(154,131,90,0.35)] md:flex">
        <SidebarContent
          username={user?.username}
          email={user?.email}
          pathname={location.pathname}
          onLogout={logout}
        />
      </aside>

      <main className="relative flex flex-1 flex-col overflow-hidden">
        <header className="h-[60px] flex items-center justify-between border-b-2 border-dashed border-[#d9c89a] bg-[#f7f3df]/80 backdrop-blur md:hidden pt-(--safe-area-inset-top) pl-[max(16px,var(--safe-area-inset-left))] pr-[max(16px,var(--safe-area-inset-right))]">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7cd67] text-base font-bold text-[#725d42] shadow-[0_2px_0_rgba(154,131,90,0.45)]">
              {user?.username.charAt(0).toUpperCase()}
            </div>
            <span className="text-base font-bold text-[#725d42]">
              {currentTitle}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="打开菜单"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-[#d9c89a] bg-[#fdf6dc] text-[#725d42] shadow-[0_3px_0_rgba(154,131,90,0.45)] transition-transform active:translate-y-0.5 active:shadow-[0_1px_0_rgba(154,131,90,0.45)]"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto box-border pb-(--safe-area-inset-bottom) pl-(--safe-area-inset-left) pr-(--safe-area-inset-right)">
          <div className="pb-4 pt-4 pr-4 max-md:pl-4">
            <Card>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Card>
          </div>
        </div>
      </main>

      <div
        className={`fixed inset-0 z-40 bg-[#3d2f1a]/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          drawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] flex-col overflow-hidden border-l-2 border-[#d9c89a] bg-[#f7f3df] transition-transform duration-300 ease-out md:hidden pt-(--safe-area-inset-top) pb-(--safe-area-inset-bottom) pr-(--safe-area-inset-right) ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="导航菜单"
      >
        <div className="flex items-center justify-between border-b-2 border-dashed border-[#d9c89a] px-4 py-3">
          <span className="text-sm font-bold text-[#725d42]">导航菜单</span>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="关闭菜单"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#725d42] hover:bg-[#fdf6dc]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <SidebarContent
          username={user?.username}
          email={user?.email}
          pathname={location.pathname}
          onNavigate={() => setDrawerOpen(false)}
          onLogout={() => {
            setDrawerOpen(false);
            logout();
          }}
        />
      </aside>
    </div>
  );
};

export default Layout;
