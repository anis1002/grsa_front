import React from "react";
import styles from "../../Styles/MyMaterialRes.module.css";
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

function MyMaterialRes() {
  const [timing, settiming] = useState([]);
  const [date, setdate] = useState("");
  const [hour, sethour] = useState();
  const [available, setavailable] = useState(false);
  const [roomType, setroomType] = useState("");
  const [edit, setedit] = useState(false);
  const [del, setdel] = useState(false);

  let rows = JSON.parse(localStorage.getItem("Material"));
  let email = JSON.parse(localStorage.getItem("userEmail"));

  const [elements, setelements] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch("http://localhost:8000/api/returntiming")
      .then((res) => res.json())
      .then((data) => settiming(data));

    yourReservation();
  }, [date]);

  async function DelReservation(
    typematerial,
    reservationdate,
    starttime,
    endtime,
    id
  ) {
    const idR = { id };

    if (
      window.confirm(
        "You Want to Delete " +
          typematerial.toUpperCase() +
          " IN: " +
          reservationdate +
          " At: " +
          starttime +
          "-" +
          endtime
      )
    ) {
      let result = await fetch(
        "http://localhost:8000/api/deletereservationmaterial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(idR),
        }
      );
      result = await result.json();

      // console.log(JSON.stringify(idR));
      alert(result);
      deleteRow(id);
    } else {
      alert("Canceled");
    }
  }

  function deleteRow(room_id) {
    rows = rows.filter((row) => row.id != room_id);
    // console.log(rows);
    localStorage.setItem("Material", JSON.stringify(rows));
    setelements(rows);
  }

  async function yourReservation() {
    if (date == "") {
      // console.log("error");
    } else {
      let reservationInfo = { date, email };

      let result = await fetch(
        "http://localhost:8000/api/showmyreservationmaterial",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(reservationInfo),
        }
      );
      result = await result.json();
      console.log(result);

      localStorage.setItem("Material", JSON.stringify(result));

      setavailable(true);

      setelements(JSON.parse(localStorage.getItem("Material")));
    }
  }
  return (
    <div className={styles.main_container}>
      <div className={styles.resvation_container}>
        <div className={styles.input_field}>
          <div>
            <input
              type="date"
              onChange={(event) => setdate(event.target.value)}
              value={date}
            />
          </div>
          <h4 className={styles.title}>{t("My Material Reservation")}</h4>

          <div className={styles.logoConstantine}>
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
                    <span>{t("Material Type")}</span>
                  </th>
                  <th>
                    <span>{t("State of Material")}</span>
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
                    // .filter((val) => val.roomname.includes(roomType))
                    .map((row, index) => (
                      <tr key={index}>
                        <td className={styles.materialname}>
                          {row.typematerial.toUpperCase()}
                        </td>
                        <td>{row.state}</td>
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
                          <Link to="/Teacher/EditMaterailRes">
                            <button
                              value={row.id}
                              className={`${styles.button} ${styles.edit}`}
                              onClick={() => {
                                localStorage.setItem(
                                  "reservationIdMaterial",
                                  row.id
                                );
                              }}
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
                              console.log("delete");
                              console.log(row.id);
                              DelReservation(
                                row.typematerial,
                                row.reservationdate,
                                row.starttime,
                                row.endtime,
                                row.id
                              );
                            }}
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

export default MyMaterialRes;
