import { Link, useNavigate } from "@tanstack/react-router";
import { useAppStore, selectCurrentUser } from "@/store/app-store";
import { signOutUser } from "@/services/auth-service";
import { AvatarCircle } from "@/components/avatar-circle";
import { useEffect, useState } from "react";

export const AppNav = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const currentUser = useAppStore(selectCurrentUser);

  const handleSignOut = () => {
    signOutUser();
    navigate({ to: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 h-14 border-b border-zinc-900 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-semibold tracking-tighter uppercase text-zinc-100"
          >
            ImTheRichest
          </Link>
          <div className="hidden gap-6 sm:flex">
            <Link
              to="/leaderboard"
              className="text-xs font-medium text-zinc-400 transition-colors hover:text-gold"
              activeProps={{ className: "text-xs font-medium text-gold" }}
            >
              Leaderboard
            </Link>
            <Link
              to="/achievements"
              className="text-xs font-medium text-zinc-400 transition-colors hover:text-gold"
              activeProps={{ className: "text-xs font-medium text-gold" }}
            >
              Achievements
            </Link>
            {mounted && currentUser ? (
              <Link
                to="/dashboard"
                className="text-xs font-medium text-zinc-400 transition-colors hover:text-gold"
                activeProps={{ className: "text-xs font-medium text-gold" }}
              >
                Dashboard
              </Link>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {mounted && currentUser ? (
            <>
              <Link
                to="/pay"
                className="bg-gold px-4 py-1.5 text-xs font-semibold text-zinc-950 ring-1 ring-gold hover:bg-gold-light transition-colors"
              >
                Pay
              </Link>
              <Link to="/profile" className="flex items-center gap-2">
                <AvatarCircle
                  name={currentUser.displayName}
                  src={currentUser.avatarUrl}
                  size="sm"
                />
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-200"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-medium text-zinc-400 hover:text-zinc-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-zinc-100 px-4 py-1.5 text-xs font-semibold text-zinc-950 ring-1 ring-white/10 hover:bg-white transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};