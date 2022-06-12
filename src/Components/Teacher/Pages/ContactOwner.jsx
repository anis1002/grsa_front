import React from "react";
import styles from "../../Styles/Contact.module.css";
import logo from "../../Img/logo.png";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdCancelScheduleSend } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
function ContactOwner() {
  const [emailSend, setemailSend] = useState("");
  const [emailRe, setemailRe] = useState("");
  const { t } = useTranslation();
  // const [teachers, setteachers] = useState("");
  // const [search, setsearch] = useState("");
  const [name, setname] = useState("");

  const [available, setavailable] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [message, setmessage] = useState("");

  let rows = JSON.parse(localStorage.getItem("Allteachers")) || [];

  

  // async function searchName() {
  //   const searchName = { name };
  //   let result = await fetch("http://localhost:8000/api/searchteacher", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(searchName),
  //   });
  //   result = await result.json();
  //   rows = result;

  //   localStorage.setItem("Allteachers", JSON.stringify(rows));
  // }

  function sendHandle(email) {
    setemailRe(email);
    if (email != emailSend) {
      setclicked(true);
    } else {
      alert("You Can Not Send Message To Yourself");
      setclicked(false);
    }
  }
  async function sendTheMessage() {
    if (message == "") {
      alert("the field is empty");
    } else {
      let messageNeeds = { emailSend, emailRe, message };

      let result = await fetch("http://localhost:8000/api/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(messageNeeds),
      });
      result = await result.json();
      alert(result);
      setclicked(false);
      setmessage("");
    }
  }

  async function showAllTeachers() {
    await fetch("http://localhost:8000/api/ShowAllTeachers")
      .then((res) => res.json())
      .then((data) =>
        localStorage.setItem("Allteachers", JSON.stringify(data))
      );
    setavailable(true);
  }

  useEffect(() => {
    setemailSend(JSON.parse(localStorage.getItem("userEmail")));
    showAllTeachers();
  }, []);

  return (
    <div className={`${styles.main_container} `}>
      <div className={clicked ? styles.messageBox : styles.hide}>
        <p>{t("Send Message To")} :</p>
        <h5>{emailRe}</h5>
        <textarea
          placeholder={t("Write Your Message Here")}
          className={styles.textArea}
          value={message}
          onChange={(e) => {
            setmessage(e.target.value);
          }}
        ></textarea>
        <button
          className={`${styles.btn} ${styles.btn1}`}
          onClick={() => {
            sendTheMessage();
          }}
        >
          {t("Send")}{" "}
          <span>
            {" "}
            <AiOutlineSend />
          </span>
        </button>
        <button
          className={`${styles.btn} ${styles.btn2}`}
          onClick={() => {
            setclicked(false);
            setmessage("");
          }}
        >
          {t("Cancel")}
          <span>
            <MdCancelScheduleSend />
          </span>
        </button>
      </div>
      <div className={styles.top_bar}>
        <Link to="/Teacher/RecievedMessages">
          <button className={`${styles.btn} ${styles.btnRecived}`}>
            {t("Recieved Messages")}
          </button>
        </Link>
        <div className={styles.group}>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setname(event.target.value);
            }}
            // value={email}
            className={styles.input}
          />
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label>{t("Last Name")}</label>
        </div>
        <img src={logo} className={styles.logo} />
      </div>
      <div className={styles.content}>
        <table
          className={clicked ? `${styles.table} ${styles.blur}` : styles.table}
        >
          <thead className={styles.thead}>
            <tr>
              <th>{t("First Name")}</th>
              <th>{t("Last Name")}</th>
              <th>{t("Email")}</th>
              <th>{t("Phome Number")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {available ? (
              rows
                .filter(
                  (val) =>
                    val.lastname.toUpperCase().includes(name) ||
                    val.lastname.toLowerCase().includes(name)
                )
                .map((row, index) => (
                  <tr key={index}>
                    <td>{row.firstname}</td>
                    <td>{row.lastname}</td>
                    <td>{row.email}</td>
                    <td>{row.phonenumber}</td>
                    <td>
                      <button
                        // disabled={clicked ? true : false}
                        className={styles.btn}
                        onClick={() => {
                          sendHandle(row.email);
                        }}
                      >
                        {t("Send")}
                        <span>
                          <AiOutlineSend />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContactOwner;
