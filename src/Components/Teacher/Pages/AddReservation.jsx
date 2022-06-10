import React from "react";
// import { useNavigate } from "react-router-dom";
import styles from "../../Styles/Teacher.module.css";
import { useEffect, useState } from "react";
// import axios from "axios";
//table imports
// import "../../Styles/Tables.css";
// import { useNavigate } from "react-router-dom";
//table imports
import reservationIng from "../../Img/3-1.png";
import { Navigate } from "react-router-dom";
import logo from "../../Img/logo.png";
import { style } from "@mui/system";
import { getElementError } from "@testing-library/react";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { ImCheckboxChecked } from "react-icons/im";
import { GiStairsGoal } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import {
  
  MdOutlineReduceCapacity
} from "react-icons/md";

function AddReservation() {
  // const navigate = useNavigate();
  const [timing, settiming] = useState([]);
  // const [star, setstar] = useState("");
  const [date, setdate] = useState("");
  const [hour, sethour] = useState("");
  const [available, setavailable] = useState(false);
  const [roomType, setroomType] = useState("");
  const [reserved, setreserved] = useState(false);
  const [reservId, setresevId] = useState([]);
  const [saveIcon, setsaveIcon] = useState(false);
  const { t } = useTranslation();
  // console.log(reservId)

  // const [ disabledButton, setdisabledButton]  = useState(false);
  // let rows = localStorage.setItem("freeRoons",false)
  let rows = JSON.parse(localStorage.getItem("freeRooms"));
  let email = JSON.parse(localStorage.getItem("userEmail"));
  // rows = JSON.parse(rows);
  const [elements, setelements] = useState([]);
  // console.log(elements)
  // console.log(elements)

  // console.log(roomType);

  useEffect(() => {
    fetch("http://localhost:8000/api/returntiming")
      .then((res) => res.json())
      .then((data) => settiming(data));
    // availableRooms()
    // navigate("/Teacher/AddReservation")
    availableRooms();
  }, [hour, date]);
  // const u = localStorage.getItem("AvailableRooms");
  // u && JSON.parse(u) ? setavailable(true) : setavailable(false);
  // useEffect(() => {}, [rows]);
  // console.log(timing)
  // console.log(date);
  // console.log(hour);

  // availableRooms();

  function deleteRow(room_id) {
    rows = rows.filter((row) => row.id != room_id);
    // console.log(rows);
    localStorage.setItem("freeRooms", JSON.stringify(rows));
    setelements(rows);
    // return
    // availableRooms()
    // window.location.reload(true)
    // rows = JSON.parse(localStorage.getItem("freeRooms"));
    setreserved(false);
  }

  async function reservation(room_id,type) {
    // availableRooms
    // let hour = document.getElementById("tempHiddenInput").value;
    const addReservationInfo = { room_id, date, hour, email,type };
    // console.log(addReservationInfo);
    // console.log(JSON.stringify(addReservationInfo));
    let result = await fetch("http://localhost:8000/api/addreservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addReservationInfo),
    });
    result = await result.json();
    // console.log(result)
    // <Navigate to="/Teacher/AddReservation" />;
    // deleteRow(room_id);
    // setTimeout(function () {
    alert(result)
    deleteRow(room_id);
    // }, 1000);
  }

  async function availableRooms() {
    // window.location.reload(false);
    if (date == "" || hour == "") {
      // console.log("error");
      setavailable(false);
    } else {
      let reservationInfo = { date, hour /*, roomType */ };
      // console.log(reservationInfo);
      let result = await fetch("http://localhost:8000/api/availablerooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(reservationInfo),
      });
      result = await result.json();
      // console.log()

      localStorage.setItem("freeRooms", JSON.stringify(result));

      // setelements(result)
      // console.log(result)

      // window.location.reload();

      // localStorage.setItem("AvailableRooms",true);
      // console.log(result);
      setavailable(true);

      setelements(JSON.parse(localStorage.getItem("freeRooms")));

      //  console.log(elements)
    }
  }

  // console.log(rows);

  return (
    <div className={styles.main_container}>
      <div className={styles.resvation_container}>
        <div className={styles.input_field}>
          <dir>
            {/* <input id="tempHiddenInput" type="hidden" /> */}

            <input
              type="date"
              onChange={(event) => {
                setdate(event.target.value);
                //  saveIcon(false);
                //  setresevId([]);
                // setavailable(false)
              }}
              value={date}
              // className={styles.dateInput}
            />
          </dir>
          <select
            className={styles.filter}
            onChange={(e) => {
              setroomType(e.target.value);
            }}
          >
            <option value="">{t("All")}</option>
            <option value="td">{t("Td")}</option>
            <option value="tp">{t("Tp")}</option>
            <option value="amphi">{t("Amphi")}</option>
          </select>
          {/* <dir><input type="time" /></dir> */}
          <select
            onChange={(event) => {
              sethour(event.target.value);
              //  saveIcon(false)

              // availableRooms()
            }}
            value={hour}
            // defaultValue={"none"}
            className={`${styles.button} ${styles.select}`}
          >
            <option value="">{t("Select a Timing")}</option>

            {timing.map((time) => (
              <option value={time.roomtiming} key={time.roomtiming}>
                {
                  (time.starttime = time.starttime.replace(
                    ":00:00",
                    `${t("H")}`
                  ))
                }
                -{(time.endtime = time.endtime.replace(":00:00", `${t("H")}`))}
              </option>
            ))}
          </select>

          {/* <dir><input type="text" /></dir> */}
          {/* <button onClick={availableRooms} className={styles.button}>
            Search
          </button> */}

          <div className={styles.logoConstantine}>
            <p className={styles.title}>{t("Add Booking")}</p>
            <img src={logo} className={styles.logo} />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.resversationImg}>
            <img src={reservationIng} />
          </div>
          <div className={styles.table}>
            <table className={styles.keywords}>
              <thead className={styles.tableHead}>
                <tr>
                  <th>
                    <span>{t("Room Type")}</span>
                  </th>
                  <th>
                    <span>{t("Capacity")}</span>
                  </th>
                  <th>
                    <span>{t("Floor")}</span>
                  </th>
                  <th>
                    
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
          
                {available ? (
                  elements
                    .filter((val) => val.roomname.includes(roomType))
                    .map((row) => (
                      <tr key={row.id}>
                        <td className={styles.roomname}>
                          {row.roomname.toUpperCase()}
                          <span
                            className={row.type=="s"? styles.show : styles.hide}
                          >
                            <AiFillStar />
                          </span>
                        </td>

                        <td>
                          {row.capacity}
                          <span className={styles.stairesLogo}>
                            <MdOutlineReduceCapacity />
                          </span>
                        </td>
                        <td className={styles.tdContainer}>
                          {row.floor}{" "}
                          <span className={styles.stairesLogo}>
                            <GiStairsGoal />
                          </span>
                        </td>
                        <td>
                          <button
                            value={row.id}
                            className={`${styles.button} 
                             
                            `}
                            onClick={(e) => {
                              setresevId(e.target.value);
                              // setreserved(true);
                              reservation(row.id, row.type);
                              // console.log(row.type)
                              // show(true);
                              // setsaveIcon(true);
                            }}

                            // disabled={disabledButton ? "true" : ""}
                          >
                            {t("Reserve")}
                            {/* <span
                              className={
                                saveIcon && row.id == reservId
                                  ? styles.ckeck
                                  : styles.hide
                              }
                            >
                              <ImCheckboxChecked />
                            </span> */}
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
      </div>
    </div>
  );
}

export default AddReservation;
