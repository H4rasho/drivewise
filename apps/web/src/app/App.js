import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router";
import Layout from "./Layout";
import HomePage from "../home/pages/HomePage";
import ParkingHubPage from "../parking/pages/ParkingHubPage";
import ParkingDetailPage from "../parking/pages/ParkingDetailPage";
import MaintenancePage from "../maintenance/pages/MaintenancePage";
import CarePage from "../care/pages/CarePage";
import LearningPage from "../learning/pages/LearningPage";
import SignalsPage from "../learning/pages/SignalsPage";
import RulesPage from "../learning/pages/RulesPage";
export default function App() {
    return (_jsx(Routes, { children: _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/parking", element: _jsx(ParkingHubPage, {}) }), _jsx(Route, { path: "/parking/:type", element: _jsx(ParkingDetailPage, {}) }), _jsx(Route, { path: "/maintenance", element: _jsx(MaintenancePage, {}) }), _jsx(Route, { path: "/care", element: _jsx(CarePage, {}) }), _jsx(Route, { path: "/learning", element: _jsx(LearningPage, {}) }), _jsx(Route, { path: "/learning/signals", element: _jsx(SignalsPage, {}) }), _jsx(Route, { path: "/learning/rules", element: _jsx(RulesPage, {}) })] }) }));
}
