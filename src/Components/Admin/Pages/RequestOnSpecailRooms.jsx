import styles from "../../Styles/RequestOnSpecailRooms.module.css";
import logo from "../../Img/logo.png";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import avatar from "../../Img/teacher.webp";
import { ImCross, ImCheckmark } from "react-icons/im";
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
  async function refuseRequest(emailRe,id,room_id)
  {
    
    if (window.confirm("Are You Sure ?")) {
      let info = { emailRe, id, room_id };
      let result = await fetch("http://localhost:8000/api/DeletRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(info),
      });
      result = await result.json();
      alert(result);
      allRequest();
    } else {
      alert("Canceled")
   }
    // console.log(emailRe,id,room_id)
    // alert("Successfully Refused");
  }
  async function acceptRequest(emailRe, id, room_id) {
    let info = { emailRe, id, room_id };
    let result = await fetch("http://localhost:8000/api/AcceptRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(info),
    });
    result = await result.json();
    alert(result);
    allRequest();
  }

  // console.log(element);
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
                    <p className={styles.messageContent}>
                      Request For special Room
                      <span className={styles.info}>
                        {row.roomname.toUpperCase()}
                      </span>{" "}
                      In:{" "}
                      <span className={styles.info}>
                        {" "}
                        {row.reservationdate}
                      </span>{" "}
                      At:
                      <span className={styles.info}>
                        {" "}
                        {
                          (row.starttime = row.starttime.replace(
                            ":00:00",
                            `${t("H")}`
                          ))
                        }
                      </span>
                      <span className={styles.Line}>-</span>
                      <span className={styles.info}>
                        {
                          (row.endtime = row.endtime.replace(
                            ":00:00",
                            `${t("H")}`
                          ))
                        }
                      </span>
                    </p>
                  </div>

                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button1} ${styles.btns}`}
                      onClick={() => {
                        console.log("accept");
                        acceptRequest(row.teacher_email, row.id, row.room_id);

                      }}
                    >
                      <ImCheckmark />
                    </button>
                    <button
                      className={`${styles.button2} ${styles.btns}`}
                      onClick={() => {
                        // console.log("delete");
                        refuseRequest(row.teacher_email,row.id,row.room_id);
                      }}
                    >
                      <ImCross />
                    </button>
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
