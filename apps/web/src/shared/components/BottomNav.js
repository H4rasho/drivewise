import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("nav", { className: "fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none", children: _jsx("div", { className: "flex items-center gap-1 px-3 py-2 rounded-full border border-white/8 pointer-events-auto", style: {
                background: "rgba(28, 28, 26, 0.88)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }, children: navItems.map(({ to, icon: Icon, label }) => (_jsx(NavLink, { to: to, end: to === "/", title: label, className: ({ isActive }) => cn("relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200", isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"), children: ({ isActive }) => (_jsxs(_Fragment, { children: [isActive && (_jsx("span", { className: "absolute inset-0 rounded-full bg-primary/10" })), _jsx(Icon, { size: 20, strokeWidth: isActive ? 2.5 : 1.5 })] })) }, to))) }) }));
}
