import styles from "../../Styles/RequestOnSpecailRooms.module.css";
import logo from "../../Img/logo.png";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import avatar from "../../Img/teacher.webp";
function RequestOnSpecailRooms() {
  const [name, setname] = useState("");
  const [emailSend, setemailSend] = useState("");
  const [available, setavailable] = useState(false);
  const [element, setelement] = useState([]);
  const { t } = useTranslation();

  function allRequest() {
    fetch("http://localhost:8000/api/AllRequest")
    .then((res) => res.json())
    .then((data) => setelement(data));
    setavailable(true);
  }
  
  useEffect(() => {
    setemailSend(JSON.parse(localStorage.getItem("userEmail")));
    allRequest();
    
  }, [available]);
  
  console.log(element)
  return (
    <div className={`${styles.main_container} `}>
      <div className={styles.top_bar}>
        {/* <div className={styles.group}>
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setname(event.target.value);
            }}
            className={styles.input}
          />
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label>{t("Last Name")}</label>
        </div> */}
        <img src={logo} className={styles.logo} />
      </div>
      <div className={styles.content}>
        <div className={styles.table}>
          {available ? (
            element
              // .filter(
              //   (val) =>
              //     val.email_sender.toUpperCase().includes(name) ||
              //     val.email_sender.toLowerCase().includes(name)
              // )
              .map((row, index) => (
                <div className={styles.card} key={index}>
                  <div className={styles.upPart}>
                    <img src={avatar} />
                    <p>{row.teacher_email}</p>
                    {/* <p>{row.reservationdate}</p> */}
                  </div>
                  <div className={styles.downPart}>
                    <p>
                      Request For special Room{row.roomname.toUpperCase()} In:{" "}
                      {row.reservationdate} At:
                      {
                        (row.starttime = row.starttime.replace(
                          ":00:00",
                          `${t("H")}`
                        ))
                      }
                      -
                      {
                        (row.endtime = row.endtime.replace(
                          ":00:00",
                          `${t("H")}`
                        ))
                      }
                    </p>
                  </div>
                </div>
              ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestOnSpecailRooms;
