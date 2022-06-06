import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from"../../Components/PerAdmin/Header/SideBar";

function AdminPer() {
  return (
    <div>
      <div className="two">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPer;
