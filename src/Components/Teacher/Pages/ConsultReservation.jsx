import React from "react";
import logo from "../../Img/logo.png";
import styleConsult from "../../Styles/ConsultTable.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AiFillStar } from "react-icons/ai";

function ConsultReservation() {
  const [date, setdate] = useState("");
  const [timing, settiming] = useState([]);
  const [rows, setrows] = useState([]);
  const [available, setavailable] = useState(false);
  const [rooms, setrooms] = useState([]);
  const [type, settype] = useState("");
  let time = [];
  const { t } = useTranslation();

  //  function generateColor () {
  //   return '#' +  Math.random().toString(16).substr(-6);
  // }

  // const color = generateColor();
  // generateColor()
  // localStorage.setItem("color", color);
  // console.log(color)
  // console.log(timing)
  // timing.map(t => time.fill(t.roomtiming))

  // timing.forEach((element) => {
  //   time.push(element.roomtiming);
  // });
  // console.log(time);
  // useEffect(() => {

  // }, []);

  // console.log(rows);

  useEffect(() => {
    fetch("http://localhost:8000/api/returntiming")
      .then((res) => res.json())
      .then((data) => settiming(data));

    fetch("http://localhost:8000/api/allshowroom")
      .then((roomsAll) => roomsAll.json())
      .then((roomData) => setrooms(roomData));

    showAllReservation();
  }, [date]);
  // console.log(rooms);
  let email = JSON.parse(localStorage.getItem("userEmail"));
  let words = email.split("@");

  async function showAllReservation() {
    let reservationInfo = { date };
    if (date == "") {
      // console.log("error");
    } else {
      let result = await fetch("http://localhost:8000/api/showreservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(reservationInfo),
      });
      result = await result.json();
      // console.log(result);
      localStorage.setItem("Consult", JSON.stringify(result));
      setavailable(true);
      setrows(JSON.parse(localStorage.getItem("Consult")));
      // console.log(rows);
    }

    // let res=timing.filter(time => time.roomtiming == rows.roomtiming)
    // // let time = timing.id;
    // console.log(res)
  }
  function handleReservation() {
    rows.forEach((row) => {
      time.forEach((t) => {
        // if (row.roomtiming == t) {
        return <td key={t.roomtiming}>Reverved</td>;
        // }
      });
    });

    // timing.forEach((element) => {
    //   // if (element.roomtiming === rows.roomtiming) {
    //   //   // return "hello";
    //   //   console.log(rows.roomtiming)
    //   // }
    //   const intersection = timing.filter((element) => rows.includes(element.roomtiming));
    //   return intersection;
    // });
  }
  return (
    <div className={styleConsult.main_container}>
      <div className={styleConsult.resvation_container}>
        <div className={styleConsult.input_field}>
          <div className={styleConsult.dateField}>
            {/* <span>Select a Date</span> */}
            <input
              type="date"
              onChange={(event) => setdate(event.target.value)}
              value={date}
              className={styleConsult.dateInput}
            />
            <select
              className={styleConsult.selectRoomType}
              name=""
              id=""
              onChange={(e) => {
                settype(e.target.value);
              }}
            >
              <option value="">{t("Room Type")}</option>
              <option value="td">{t("Td")}</option>
              <option value="tp">{t("Tp")}</option>
              <option value="amphi">{t("Amphi")}</option>
              <option value="s">{t("Speacial")}</option>
              <option value="n">{t("Normal")}</option>
            </select>
            {/* <div className={styleConsult.colorRange}>
              <input type="color" id="body" name="body" value="#f6b73c" />
              {/* <label for="body">Body</label> */}
            {/* </div>  */}
          </div>
          {/* <dir><input type="time" /></dir> */}

          {/* <dir><input type="text" /></dir> */}
          {/* <button
            // onClick={availableRooms}
            className={styleConsult.button}
            onClick={showAllReservation}
            >
            Search
          </button> */}

          <div className={styleConsult.logoConstantine}>
            <h4 className={styleConsult.title}>{t("Consult Booking")}</h4>
            <img src={logo} className={styleConsult.logo} />
          </div>
        </div>

        <div className={styleConsult.content}>
          <table className={styleConsult.table}>
            <thead className={styleConsult.thead}>
              <tr>
                <th>{t("Rooms")}</th>
                {timing.map((time) => (
                  <th value={time.roomtiming} key={time.roomtiming}>
                    {
                      (time.starttime = time.starttime.replace(
                        ":00:00",
                        `${t("H")}`
                      ))
                    }
                    -
                    {
                      (time.endtime = time.endtime.replace(
                        ":00:00",
                        `${t("H")}`
                      ))
                    }
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {available ? (
                rows
                  .filter(
                    (val) =>
                      val.roomname.includes(type) || val.type.includes(type)
                  )
                  .map((room) => (
                    <tr key={room.room_id} className={styleConsult.tr}>
                      <td className={styleConsult.td}>
                        {room.roomname.toUpperCase()}
                        <span
                          className={
                            room.type == "s"
                              ? styleConsult.show
                              : styleConsult.hide
                          }
                        >
                          <AiFillStar />
                        </span>
                      </td>
                      <td
                        className={`${
                          room.h8 == null
                            ? styleConsult.reserved
                            : styleConsult.notreserved
                        } ${styleConsult.td}`}
                      >
                        {room.h8 == null ? "" : room.h8}
                      </td>
                      <td
                        className={`${
                          room.h10 == null
                            ? styleConsult.reserved
                            : styleConsult.notreserved
                        } ${styleConsult.td}`}
                      >
                        {room.h10 == null ? "" : room.h10}
                      </td>
                      <td
                        className={`${
                          room.h12 == null
                            ? styleConsult.reserved
                            : styleConsult.notreserved
                        } ${styleConsult.td}`}
                      >
                        {room.h12 == null ? "" : room.h12}
                      </td>
                      <td
                        className={`${
                          room.h14 == null
                            ? styleConsult.reserved
                            : styleConsult.notreserved
                        } ${styleConsult.td}`}
                      >
                        {room.h14 == null ? "" : room.h14}
                      </td>
                    </tr>

                    // <tr key={room.id}>
                    //   {rows.map((row) =>
                    //     <td>{ rooms.roomname}</td>
                    //     (<td>{row.id == room.id ? "reserved" : "-----"}</td>)(
                    //       <td>{row.id == room.id ? "reserved" : "-----"}</td>
                    //     )(<td>{row.id == room.id ? "reserved" : "-----"}</td>)(
                    //       <td>{row.id == room.id ? "reserved" : "-----"}</td>
                    //     )
                    //   )}
                    // </tr>
                  ))
              ) : (
                // rows
                //   .filter((val) => val.roomname.includes(""))
                //   .map((row, key) => (
                //     <tr key={key}>
                //       <td>{row.roomname}</td>
                //       {/* {handleReservation} */}

                //       {time.map((t) => (
                //         <td>
                //           {row.roomtiming == t ? row.teacher_email : "- - -"}
                //         </td>
                //       ))}

                //       {/* <td>{row.roomtiming == time[1] ? row.teacher_email : "- - -"}</td> */}
                //       {/* <td>{row.roomtiming == time[2] ? row.teacher_email : "- - -"}</td> */}
                //       {/* <td>{row.roomtiming == time[3] ? row.teacher_email : "- - -"}</td>  */}
                //     </tr>
                //   ))
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ConsultReservation;
