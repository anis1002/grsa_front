import styles from "./Styles/Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Login({ Authentication, defineTeacher, defineAdmin, defineAdminPer }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let error = localStorage.getItem("loginStatus");
  let localestoragePersonType = localStorage.getItem("person");
  localestoragePersonType = JSON.parse(localestoragePersonType);
  // console.log(localestoragePersonType)

  async function login() {
    let userInput = { email, password, localestoragePersonType };
    // console.log(JSON.stringify(userInput));

    let result = await fetch("http://localhost:8000/api/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userInput),
    });

    result = await result.json();
    // console.log(result);
    localStorage.setItem("loginStatus", JSON.stringify(result.Login));
    localStorage.setItem(
      "PersonTypeStatus",
      JSON.stringify(result.PersonType.role)
    );
    localStorage.setItem("userEmail", JSON.stringify(result.PersonType.email));

    if (result.Login) {
      switch (result.PersonType.role) {
        case "Administrator":
          defineAdmin();
          localStorage.setItem("admin", JSON.stringify(true));
          break;

        case "Teacher":
          defineTeacher();
          localStorage.setItem("teacher", JSON.stringify(true));
          break;

        case "AdministrativePerson":
          defineAdminPer();
          localStorage.setItem("adminPer", JSON.stringify(true));
          break;
      }
      Authentication();
      let person = localStorage.getItem("person");
      person = JSON.parse(person);
      if (result.PersonType.role == person) {
        navigate(`/${result.PersonType.role}/ConsultResrvation`);
      } else {
        navigate(`/${result.PersonType.role}`);
      }
    } else {
      let person = localStorage.getItem("person");
      person = JSON.parse(person);
      navigate(`/${person}/login`);
    }
  }

  return (
    <div className={styles.The_Main_page}>
      <div className={styles.Login_Container}>
        <div className={styles.img_size}></div>

        <div className={styles.Login_Info_Container}>
          <div className={styles.Logo}></div>
          <h4 className={styles.Login_Title}>{t("LOGIN")}</h4>
          <h5 className={styles.subtitle}>
            {t("Use Your Professional Account")}
          </h5>
          <div className={styles.inputs_container}>
            <div className={styles.group}>
              <input
                type="text"
                required
                onChange={(event) =>setEmail(event.target.value)}
                value={email}
                className={styles.input}
              />
              <span className={styles.highlight}></span>
              <span className={styles.bar}></span>
              <label>{t("Email")}</label>
            </div>

            <div className={styles.group}>
              <input
                type="password"
                required
                className={styles.input}
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
              <span className={styles.highlight}></span>
              <span className={styles.bar}></span>
              <label>{t("Password")}</label>
            </div>
          </div>
          <p className={error ? styles.error : styles.nondisplay}>
            {t("Incorrect email or password.")}
          </p>
          <button
            className={styles.button}
            type="submit"
            onClick={() => {
              login();
              
            }}
          >
            {t("LOGIN")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
