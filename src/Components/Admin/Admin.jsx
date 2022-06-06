import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
// import styles from '../Styles/Admin.module.css';
import Header from "./Header";
import SideBar from "./Header/SideBar";
import SidebarMenu from "./Header/SidebarMenu";

function Admin() {
  return (
    // <div className={styles.the_main_page}>
    //   <div className={styles.sidebar}>
    <div className="two">
      <SideBar />
      <Outlet />
    </div>
    // <SidebarMenu/>
    // {
    /* </div>
      <div className={styles.the_main_content}>
        <Outlet />
      </div>
     
    </div> */
    // }
  );
}

export default Admin;
