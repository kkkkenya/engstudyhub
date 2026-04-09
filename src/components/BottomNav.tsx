import { useLocation, Link } from "react-router-dom";
import { House, FolderOpen, FlaskConical, Briefcase, UserPlus } from "lucide-react";

const DISCORD_URL = "https://discord.gg/7yUz2rXumm";

const NAV_ITEMS = [
  { label: "Home", icon: House, route: "/" },
  { label: "Projects", icon: FolderOpen, route: "/projects" },
  { label: "Formulas", icon: FlaskConical, route: "/formulas" },
  { label: "Jobs", icon: Briefcase, route: "/jobs" },
  { label: "Join", icon: UserPlus, route: "/join", isCta: true },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.route;
          const Icon = item.icon;

          if (item.isCta) {
            return (
              <a
                key={item.label}
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center flex-1 min-h-[44px] gap-0.5 bg-primary text-primary-foreground"
              >
                <Icon size={20} strokeWidth={2} />
                <span className="text-[10px] font-mono font-bold uppercase">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.route}
              className={`flex flex-col items-center justify-center flex-1 min-h-[44px] gap-0.5 relative transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-primary rounded-full" />
              )}
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-mono font-bold uppercase">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
