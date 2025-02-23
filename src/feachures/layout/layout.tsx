import { Outlet } from "react-router-dom";
import { Menu } from "../../entities/menu/menu";

export function Layout() {
  return (
    <div className="Layout">
      <Menu />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
