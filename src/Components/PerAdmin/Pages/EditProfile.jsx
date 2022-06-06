import React from "react";
import styles from "../../Styles/EditAdminPersProfile.module.css";
import avatar from "../../Img/adminp.webp";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const EditProfileP = () => {
  const { t } = useTranslation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [ok, setok] = useState(false);
  const [response, setresponse] = useState(false);
  // console.log(password, firstName, lastName)
  // console.log(email);
  useEffect(() => {
    showAdminPersInput();
  }, [email]);

  async function showAdminPersInput() {
    setemail(JSON.parse(localStorage.getItem("userEmail")));
    const Temail = { email }
    // console.log(Temail)

    // console.log(email);
    let result = await fetch(
      "http://localhost:8000/api/showeprsnadministrative",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Temail),
      }
    );
    result = await result.json();
    console.log(result);
    setfirstName(result.firstname);
    setlastName(result.lastname);
    // setphoneNumber(result.phonenumber);
  }

  async function EditAdminPerProfile() {
    setemail(JSON.parse(localStorage.getItem("userEmail")));
    const adminPerInfo = { password, firstName, lastName, email };
    let result = await fetch(
      "http://localhost:8000/api/editprofileprsnadministrative",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(adminPerInfo),
      }
    );
    result = await result.json();
    // console.log(result)
    alert(result);
  }
  return (
    <div className={styles.mainPage}>
      <dir className={styles.card}>
        <div className={styles.card_left}>
          <img src={avatar} alt="" />
          {/* <h1>Edit Profile</h1> */}
        </div>
        <div className={styles.card_right}>
          <span className={styles.line}></span>
          <h1>{t("Edit Profile")}</h1>

          <div className={styles.group}>
            <input
              className={styles.input}
              type="text"
              required
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
            />
            <span className={styles.highlight}></span>
            <span className={styles.bar}></span>
            <label className={styles.label}>{t("First Name")}</label>
          </div>

          <div className={styles.group}>
            <input
              className={styles.input}
              type="text"
              required
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
              }}
            />
            <span className={styles.highlight}></span>
            <span className={styles.bar}></span>
            <label className={styles.label}>{t("Last Name")}</label>
          </div>

          <div className={styles.group}>
            <input
              className={styles.input}
              type="text"
              required
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <span className={styles.highlight}></span>
            <span className={styles.bar}></span>
            <label className={styles.label}>{t("Password")}</label>
          </div>
          {/* <p className={`${ok ? styles.green : styles.red}`}>
            {response ? "UpDated" : ""}
          </p> */}
          <button
            className={styles.button}
            onClick={() => {
              EditAdminPerProfile();
            }}
          >
            {t("Save")}
          </button>
        </div>
      </dir>
    </div>
  );
};

export default EditProfileP;
