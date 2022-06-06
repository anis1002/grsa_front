import React from "react";
import styles from "../../Styles/Admin.module.css";
import {useNavigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";
const Logout = () => {
   const { t } = useTranslation();
  const Navigate = useNavigate();

  function yes(){
    window.localStorage.clear();
    window.location.reload()
    console.log("yes")
  }
  function no(){
    Navigate("/")
    
    console.log("no")
  }
  return (
    <div className={styles.main_page}>
      <div className={styles.logout}>
        <p>{t("Are You Sure")}</p>
        <button
          className={`${styles.button} ${styles.btn1}`}
          onClick={() => {
            yes();
          }}
        >
          {t("Yes")}
        </button>
        <button
          className={`${styles.button} ${styles.btn2}`}
          onClick={() => {
            no();
          }}
        >
          {t("No")}
        </button>
      </div>
    </div>
  );
};

export default Logout;
