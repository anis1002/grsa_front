import React from "react";
// import { useNavigate } from "react-router-dom";
import styles from "../../Styles/EditMaterialRes.module.css";
import { useEffect, useState } from "react";
// import axios from "axios";
//table imports
import "../../Styles/Tables.css";
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
import { MdOutlineReduceCapacity } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function EditMaterailRes() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const [timing, settiming] = useState([]);
  const [date, setdate] = useState("");
  const [hour, sethour] = useState("");
  const [available, setavailable] = useState(false);
  const [roomType, setroomType] = useState("");
  const [reserved, setreserved] = useState(false);
  const [reservId, setresevId] = useState([]);
  const [saveIcon, setsaveIcon] = useState(false);
  const [id, setid] = useState("");

  let rows = JSON.parse(localStorage.getItem("AvaMaterial"));
  let email = JSON.parse(localStorage.getItem("userEmail"));

  const [elements, setelements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/returntiming")
      .then((res) => res.json())
      .then((data) => settiming(data));

    availableMaterial();
  }, [hour, date]);
  useEffect(() => {
    setid(JSON.parse(localStorage.getItem("reservationIdMaterial")));
  }, [id]);

  function deleteRow(material_id) {
    rows = rows.filter((row) => row.id != material_id);

    localStorage.setItem("AvaMaterial", JSON.stringify(rows));
    setelements(rows);

    setreserved(false);
  }

  async function reservation(material_id) {
    const addReservationInfo = { material_id, date, hour, email, id };

    let result = await fetch(
      "http://localhost:8000/api/updatereservationmaterial",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(addReservationInfo),
      }
    );

    alert("Booking Updated");
    deleteRow(material_id);
  }

  async function availableMaterial() {
    if (date == "" || hour == "") {
      setavailable(false);
    } else {
      let reservationInfo = { date, hour };

      let result = await fetch("http://localhost:8000/api/availablematerials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(reservationInfo),
      });
      result = await result.json();
      console.log(result)

      localStorage.setItem("AvaMaterial", JSON.stringify(result));

      setavailable(true);

      setelements(JSON.parse(localStorage.getItem("AvaMaterial")));
    }
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.resvation_container}>
        <div className={styles.input_field}>
          <dir>
            <input
              type="date"
              onChange={(event) => {
                setdate(event.target.value);
              }}
              value={date}
            />
          </dir>

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
          <p className={styles.title}>{t("Edit Material Booking")}</p>

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
                    <span>{t("Properties")}</span>
                  </th>
                  <th>
                    <span>{t("Serial Number")}</span>
                  </th>
                  <th>
                    <span>{t("State")}</span>
                  </th>
                  <th>
                    {/* <span>{t("Action")}</span> */}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {available ? (
                  elements.map((row) => (
                    <tr key={row.id}>
                      <td>{row.typematerial.toUpperCase()}</td>

                      <td>
                        {row.property}
                        <span className={styles.stairesLogo}></span>
                      </td>
                      <td className={styles.tdContainer}>
                        {row.serialnumber}{" "}
                        <span className={styles.stairesLogo}></span>
                      </td>

                      <td>{row.state}</td>

                      <td>
                        <Link to="/Teacher/MaterialReservation">
                          <button
                            value={row.id}
                            className={`${styles.button} 
                             
                            `}
                            onClick={(e) => {
                              setresevId(e.target.value);

                              reservation(row.id);
                            }}
                          >
                            {t("Update")}
                          </button>
                        </Link>
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

export default EditMaterailRes;
