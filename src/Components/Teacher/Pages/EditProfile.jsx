import React from "react";
import styles from "../../Styles/EditTeacherProfile.module.css";
import avatar from "../../Img/teacher.webp";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const EditProfileT = () => {
  const { t } = useTranslation();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [ok, setok] = useState(false);
  const [response, setresponse] = useState(false);
  //   setemail(localStorage.getItem("userEmail"));
  // console.log(email)

  // console.log(password, firstName, lastName)
  // console.log(email);
  useEffect(() => {
    showTeacherInput();
  }, [email]);
  // console.log(email);
  async function showTeacherInput() {
    setemail(JSON.parse(localStorage.getItem("userEmail")));
    const Temail = { email };
    // console.log(Temail)

    // console.log(email);
    let result = await fetch("http://localhost:8000/api/showeteacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(Temail),
    });
    result = await result.json();
    console.log(result);
    setfirstName(result.firstname);
    setlastName(result.lastname);
    setphoneNumber(result.phonenumber);
  }
  async function EditTeacherProfile() {
    const TeacherInfo = { password, firstName, lastName, email, phoneNumber };
    let result = await fetch("http://localhost:8000/api/editprofileteacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(TeacherInfo),
    });
    result = await result.json();
    // console.log(result)
    alert(result);
  }
  return (
    <div className={styles.mainPage}>
      <dir className={styles.card}>
        <div className={styles.card_left}>
          <img src={avatar} />
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
              value={phoneNumber}
              onChange={(e) => {
                setphoneNumber(e.target.value);
              }}
            />
            <span className={styles.highlight}></span>
            <span className={styles.bar}></span>
            <label className={styles.label}>{t("Phome Number")}</label>
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
              EditTeacherProfile();
            }}
          >
            {t("Save")}
          </button>
        </div>
      </dir>
    </div>
  );
};

export default EditProfileT;
