import React from "react";
// import { useNavigate } from "react-router-dom";
import styles from "../../Styles/ReserveMaterial.module.css";
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
import { useTranslation } from "react-i18next";
import { MdOutlineReduceCapacity } from "react-icons/md";

function ReserveMaterial() {
  const [material_id, setmaterial_id] = useState("");
  const [timing, settiming] = useState([]);
  const [date, setdate] = useState("");
  const [hour, sethour] = useState("");
  const [available, setavailable] = useState(false);
  const [roomType, setroomType] = useState("");
  const [reserved, setreserved] = useState(false);
  const [reservId, setresevId] = useState([]);
  const [saveIcon, setsaveIcon] = useState(false);
  const { t } = useTranslation();

  let rows = JSON.parse(localStorage.getItem("AvaMaterial"));
  let email = JSON.parse(localStorage.getItem("userEmail"));

  const [elements, setelements] = useState([]);
  // console.log(material_id);

  useEffect(() => {
    fetch("http://localhost:8000/api/returntiming")
      .then((res) => res.json())
      .then((data) => settiming(data));
    // availableRooms()
    // navigate("/Teacher/AddReservation")
    availableRooms();
  }, [hour, date]);

  function deleteRow(material_id) {
    rows = rows.filter((row) => row.id != material_id);
    // console.log(rows);
    localStorage.setItem("AvaMaterial", JSON.stringify(rows));
    setelements(rows);
    // return
    // availableRooms()
    // window.location.reload(true)
    // rows = JSON.parse(localStorage.getItem("AvaMaterial"));
    setreserved(false);
  }

  async function reservation(material_id) {
    // availableRooms
    // let hour = document.getElementById("tempHiddenInput").value;
    const addReservationInfo = { date, hour, email, material_id };
    // console.log(addReservationInfo);
    // console.log(JSON.stringify(addReservationInfo));
    let result = await fetch(
      "http://localhost:8000/api/addreservationmaterial",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(addReservationInfo),
      }
    );
    // result = await result.json();
    // console.log(result)
    // <Navigate to="/Teacher/AddReservation" />;
    // deleteRow(room_id);
    // setTimeout(function () {
    alert("Material Booked");
    deleteRow(material_id);
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
      let result = await fetch("http://localhost:8000/api/availablematerials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(reservationInfo),
      });
      result = await result.json();
      console.log(result);

      localStorage.setItem("AvaMaterial", JSON.stringify(result));

      // setelements(result)
      // console.log(result)

      // window.location.reload();

      // localStorage.setItem("AvailableRooms",true);
      // console.log(result);
      setavailable(true);

      setelements(JSON.parse(localStorage.getItem("AvaMaterial")));

      //  console.log(elements)
    }
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.resvation_container}>
        <div className={styles.input_field}>
          <div>
            <input
              type="date"
              onChange={(event) => {
                setdate(event.target.value);
              }}
              value={date}
            />
          </div>

          <select
            onChange={(event) => {
              sethour(event.target.value);
            }}
            value={hour}
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
          <p className={styles.title}>{t("Book Material")}</p>

          <div className={styles.logoConstantine}>
            <img src={logo} className={styles.logo} />
          </div>
        </div>

        <div className={styles.content}>
          {/* <div className={styles.resversationImg}>
            <img src={reservationIng} />
          </div> */}
          <div className={styles.table}>
            <table className={styles.keywords}>
              <thead className={styles.tableHead}>
                <tr>
                  <th>
                    <span>{t("Material Type")}</span>
                  </th>
                  <th>
                    <span>{t("Properties")}</span>
                  </th>
                  <th>
                    <span>{t("Serial Number")}</span>
                  </th>
                  <th>
                    <span>{t("State")}</span>
                  </th>
                  <th>{/* <span>{t("Action")}</span> */}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {available ? (
                  elements.map((row) => (
                    <tr key={row.id}>
                      <td className={styles.materialname}>
                        {row.typematerial.toUpperCase()}
                      </td>

                      <td>
                        {row.property}
                        <span className={styles.stairesLogo}></span>
                      </td>
                      <td className={styles.tdContainer}>
                        {row.serialnumber}{" "}
                        <span className={styles.stairesLogo}></span>
                      </td>

                      <td
                      //   className={styles.tdContainer}
                      >
                        {row.state}
                      </td>

                      <td>
                        <button
                          value={row.id}
                          className={`${styles.button} 
                             
                            `}
                          onClick={(e) => {
                            setresevId(e.target.value);
                            setmaterial_id(row.id);

                            reservation(row.id);
                          }}
                        >
                          {t("Reserve")}
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

export default ReserveMaterial;
