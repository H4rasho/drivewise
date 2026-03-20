import { Routes, Route } from "react-router";
import Layout from "./Layout";
import HomePage from "../home/pages/HomePage";
import ParkingHubPage from "../parking/pages/ParkingHubPage";
import ParkingDetailPage from "../parking/pages/ParkingDetailPage";
import MaintenancePage from "../maintenance/pages/MaintenancePage";
import CarePage from "../care/pages/CarePage";
import LearningPage from "../learning/pages/LearningPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/parking" element={<ParkingHubPage />} />
        <Route path="/parking/:type" element={<ParkingDetailPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/care" element={<CarePage />} />
        <Route path="/learning" element={<LearningPage />} />
      </Route>
    </Routes>
  );
}
