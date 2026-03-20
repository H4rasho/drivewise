import { NavLink } from "react-router";
import { Home, ParkingSquare, Wrench, BookOpen } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Inicio" },
  { to: "/parking", icon: ParkingSquare, label: "Estacionar" },
  { to: "/maintenance", icon: Wrench, label: "Mantención" },
  { to: "/learning", icon: BookOpen, label: "Aprender" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-4 py-2 text-xs transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
