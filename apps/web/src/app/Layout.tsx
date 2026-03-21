import { Outlet } from "react-router";
import BottomNav from "../shared/components/BottomNav";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="pb-28">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
