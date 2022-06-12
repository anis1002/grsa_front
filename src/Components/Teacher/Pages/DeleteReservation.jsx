import React from "react";
import styles from "../../Styles/DeleteReservation.module.css";
import { useEffect, useState } from "react";
// import axios from "axios";
import EditRevservation from "../Pages/EditRevservation";
//table imports
import "../../Styles/Tables.css";
// import { useNavigate } from "react-router-dom";
//table imports
import reservationIng from "../../Img/3-1.png";
// import { Navigate } from "react-router-dom";
import logo from "../../Img/logo.png";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit, AiOutlineLaptop } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { AiFillStar } from "react-icons/ai";

// import { style } from "@mui/system";
// import EditRevservation from './EditRevservation';

function DeleteReservation() {
  // const navigate = useNavigate();
  const [timing, settiming] = useState([]);
  const [date, setdate] = useState("");
  const [hour, sethour] = useState();
  const [available, setavailable] = useState(false);
  const [roomType, setroomType] = useState("");
  const [edit, setedit] = useState(false);
  const [del, setdel] = useState(false);
  // const [ disabledButton, setdisabledButton]  = useState(false);
  // let rows = localStorage.setItem("freeRoons",false)
  let rows = JSON.parse(localStorage.getItem("Yours"));
  let email = JSON.parse(localStorage.getItem("userEmail"));
  // rows = JSON.parse(rows);
  const [elements, setelements] = useState([]);
  const { t } = useTranslation();
  // console.log(elements)
  // console.log(elements)

  // console.log(roomType);

  useEffect(() => {
    fetch("http://localhost:8000/api/returntiming")
      .then((res) => res.json())
      .then((data) => settiming(data));
    // availableRooms()
    // navigate("/Teacher/AddReservation")
    yourReservation();
  }, [date]);
  // const u = localStorage.getItem("AvailableRooms");
  // u && JSON.parse(u) ? setavailable(true) : setavailable(false);
  // useEffect(() => {}, [rows]);
  // console.log(timing)
  // console.log(date);
  // console.log(hour);

  // availableRooms();
  //   function editRevservation(id) {
  //    <Navigate to={<EditRevservation />} />;
  //  }
  async function DelReservation(
    roomname,
    reservationdate,
    starttime,
    endtime,
    id
  ) {
    const idR = { id };

    if (
      window.confirm(
        "You Want to Delete " +
          roomname.toUpperCase() +
          " IN: " +
          reservationdate +
          " At: " +
          starttime +
          "-" +
          endtime
      )
    ) {
      let result = await fetch("http://localhost:8000/api/deletereservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(idR),
      });
      result = await result.json();
      // console.log();
      console.log(JSON.stringify(idR));
      alert(result);
      deleteRow(id);
    } else {
      alert("Canceled");
    }
  }

  function deleteRow(room_id) {
    rows = rows.filter((row) => row.id != room_id);
    // console.log(rows);
    localStorage.setItem("Yours", JSON.stringify(rows));
    setelements(rows);
    // return
    // availableRooms()
    // window.location.reload(true)
    // rows = JSON.parse(localStorage.getItem("freeRooms"));
  }

  async function yourReservation() {
    // window.location.reload(false);
    if (date == "") {
      console.log("error");
    } else {
      let reservationInfo = { date, email };
      // console.log(reservationInfo);
      let result = await fetch("http://localhost:8000/api/showmyreservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(reservationInfo),
      });
      result = await result.json();
      console.log(result);

      localStorage.setItem("Yours", JSON.stringify(result));

      // setelements(result)
      // console.log(result)

      // window.location.reload();

      // localStorage.setItem("AvailableRooms",true);
      // console.log(result);
      setavailable(true);

      setelements(JSON.parse(localStorage.getItem("Yours")));
      //  yourReservation();
      //  console.log(elements)
    }
    // console.log(rows.filter((val) => val.roomname.includes(roomType)));
  }

  // console.log(rows);

  return (
    <div className={styles.main_container}>
      <div className={styles.resvation_container}>
        <div className={styles.input_field}>
          <div>
            <input
              type="date"
              onChange={(event) => setdate(event.target.value)}
              value={date}
              // className={styles.dateInput}
            />
          </div>
          <h4 className={styles.title}>{t("My Reservation")}</h4>
          {/* <dir><input type="time" /></dir> */}
          {/* <select
            onChange={(event) => sethour(event.target.value)}
            value={hour}
            defaultValue={"none"}
            className={`${styles.button} ${styles.select}`}
          >
            <option value="DEFAULT" defaultValue={"DEFAULT"}>
              Select an Option
            </option>

            {timing.map((time) => (
              <option value={time.roomtiming} key={time.roomtiming}>
                {(time.starttime = time.starttime.replace(":00:00", ":00 h"))}-
                {(time.endtime = time.endtime.replace(":00:00", ":00 h"))}
              </option>
            ))}
          </select> */}
          {/* <dir><input type="text" /></dir> */}

          {/* <button onClick={yourReservation} className={styles.button}>
            Search
          </button> */}

          <div className={styles.logoConstantine}>
            <img src={logo} className={styles.logo} />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.resversationImg}>
            {/* <select
              className={styles.filter}
              onChange={(e) => {
                setroomType(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="td">TD</option>
              <option value="tp">TP</option>
              <option value="amphi">Amphi</option>
            </select> */}
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
                    <span>{t("date")}</span>
                  </th>
                  <th>
                    <span>{t("timing")}</span>
                  </th>
                  <th>{/* {t("Action")} */}</th>
                </tr>
              </thead>
              <tbody>
                {available ? (
                  elements
                    .filter((val) => val.roomname.includes(roomType))
                    .map((row, index) => (
                      <tr key={index}>
                        <td className={styles.roomname}>
                          {row.roomname.toUpperCase()}
                          <span
                            className={
                              row.type == "s" ? styles.show : styles.hide
                            }
                          >
                            <AiFillStar />
                          </span>
                        </td>
                        <td>{row.reservationdate}</td>
                        <td className={styles.time}>
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
                        </td>

                        <td>
                          {/* <button
                            value={row.id}
                            className={`${styles.button} ${styles.add}`}
                            onClick={() => {
                              // reservation(row.id);
                              console.log("book material");

                              console.log(row.id);
                            }}

                            // disabled={disabledButton ? "true" : ""}
                          >
                            <span className={styles.btn_title}>
                              Book Material
                            </span>
                            <span className={styles.icons}>
                              <AiOutlineLaptop />
                            </span>
                          </button> */}
                          <Link to="/Teacher/EditReservation">
                            <button
                              value={row.id}
                              className={`${styles.button} ${styles.edit}`}
                              onClick={() => {
                                localStorage.setItem("reservationId", row.id);
                                // reservation(row.id);
                                // console.log("edit");
                                // console.log(row.id);
                                // <Navigate to={<EditRevservation />}/>
                                // editRevservation(row.id)
                              }}

                              // disabled={disabledButton ? "true" : ""}
                            >
                              <span className={styles.btn_title}>
                                {t("Edit")}
                              </span>
                              <span className={styles.icons}>
                                <AiFillEdit />
                              </span>
                            </button>
                          </Link>

                          <button
                            value={row.id}
                            className={`${styles.button} ${styles.delete}`}
                            onClick={() => {
                              // reservation(row.id);
                              console.log("delete");
                              console.log(row.id);
                              DelReservation(
                                row.roomname,
                                row.reservationdate,
                                row.starttime,
                                row.endtime,
                                row.id
                              );
                            }}

                            // disabled={disabledButton ? "true" : ""}
                          >
                            <span className={styles.btn_title}>
                              {" "}
                              {t("Delete")}
                            </span>
                            <span className={styles.icons}>
                              <MdDeleteForever />
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
      </div>
    </div>
  );
}

export default DeleteReservation;
