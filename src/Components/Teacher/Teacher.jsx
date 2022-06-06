import React from "react";
import SideBar from "./Header/SideBar";
import { Outlet} from "react-router-dom";
const Teacher = () => {
  return (
    <div>
      <div className="two">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Teacher;
