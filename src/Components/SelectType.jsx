import React from "react";
import { useState } from "react";
import styles from "./Styles/Login.module.css";


function SelectType({}) {
  const [Who, setWho] = useState("");
  localStorage.setItem("PersonTypeStatus", Who);
  return (
    <div className={styles.The_Main_page}>
      <div className={styles.Login_Container}>
        <div className={styles.img_size}></div>
        <div className={styles.select_field}>
          <div className={styles.Logo}></div>
          <h2>You Login As :</h2>
          <select
            className={styles.select}
            value={Who}
            onChange={(e) => setWho(e.target.value)}
          >
            <option value="">CHOOSE ONE</option>
            <option value="Admin">Administrator</option>
            <option value="Teacher">Teacher</option>
            <option value="AdminPer">Administrative Person</option>
          </select>
          <button className={styles.button}>NEXT</button>
        </div>
      </div>
    </div>
  );
}

export default SelectType;
