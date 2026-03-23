import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router";
import BottomNav from "../shared/components/BottomNav";
export default function Layout() {
    return (_jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [_jsx("main", { className: "pb-28", children: _jsx(Outlet, {}) }), _jsx(BottomNav, {})] }));
}
