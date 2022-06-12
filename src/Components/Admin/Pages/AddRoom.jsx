import React from "react";
import styles from "../../Styles/Room.module.css";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUserAdd,
} from "react-icons/ai";
import {
  MdMessage,
  MdOutlineStairs,
  MdOutlineReduceCapacity,
} from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import DeleteMaterial from "./DeleteMaterial";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AiFillStar } from "react-icons/ai";

function AddRoom() {
    const { t } = useTranslation();
  const [roomname, setroomname] = useState("");
  const [id, setid] = useState("");
  const [row, setrow] = useState([]);
  const [blur, setblur] = useState(false);
  const [show, setshow] = useState(false);
  const [Popupdelete, setPopupdelete] = useState(false);
  const [showAddRoom, setshowAddRoom] = useState(false);
  const [response, setresponse] = useState(false);
  const [Popup, setPopup] = useState(false);
  const [range, setrange] = useState("");
  const [Typefilter, setTypefilter] = useState("");

  const [type, settype] = useState("");
  const [floor, setfloor] = useState("");
  const [capacity, setcapacity] = useState("");
  const [roomType, setroomType] = useState("");
  // console.log(row);

  function empty() {
    setroomType("");
    setfloor("");
    setcapacity("");
    settype("")
  }

  async function showRoom() {
    fetch("http://localhost:8000/api/ShowAllRooms")
      .then((res) => res.json())
      .then((data) => setrow(data));
  }
  useEffect(() => {
    showRoom();
    //  empty();?
  }, []);
  async function deleteRoom() {
    const deleteInfo = { id };
    // console.log(deleteInfo);
    let result = await fetch("http://localhost:8000/api/deleteroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(deleteInfo),
    });
    result = await result.json();
    // console.log(result);
    showRoom();
    // if (result == "deleted succesfully") {
    alert(result);
    // } else {
    //   alert("error");
    // }
  }
  async function addRoom() {
    const addTeacherInfo = {
      floor,
      capacity,
      roomType,
      type
    };
    let result = await fetch("http://localhost:8000/api/addroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addTeacherInfo),
    });
    result = await result.json();
    console.log(result);
    showRoom();
    if (result == "succefully added") {
      setresponse(true);
      setshow(false);
      setshowAddRoom(false);

      alert("Room Added Succesfully");
    } else {
      // setresponse(false);
      // setshowAddRoom(true);
      setshowAddRoom(true);
      alert("Imput Field Empty");
    }
  }
  async function EditRoom() {
    const editRoomInfo = {
      roomType,
      capacity,
      floor,
      id,
      type
    };
    console.log(editRoomInfo);
    let result = await fetch("http://localhost:8000/api/editroom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(editRoomInfo),
    });
    result = await result.json();
    console.log(result);
    alert(result);
    // if (result == "updated succesfully") {
    //   setresponse(true);
    //   setshow(true);
    //   // setTimeout(function () {
    //     // setresponse(true);
    //   //   setshow(false);
    //   // }, 1000);

    //   // setresponse(true)
    // } else {
    //   setresponse(false);
    //   setshow(true);
    //   // setresponse(false);
    //   // setTimeout(function () {
    //   //   setshow(false);
    //   // }, 1000);
    // }
    showRoom();
  }
  function fieldFill(idR) {
    // console.log(email);
    row.forEach((rows) => {
      if (rows.id == idR) {
        setfloor(rows.floor);
        setcapacity(rows.capacity);
        setroomType(rows.roomname);
        setid(rows.id);
        settype(rows.type)
      }
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.topcontainer}>
        <select
          className={styles.filter}
          onChange={(e) => {
            setTypefilter(e.target.value);
          }}
        >
          <option value="">{t("All")}</option>
          <option value="td">{t("Td")}</option>
          <option value="tp">{t("Tp")}</option>
          <option value="amphi">{t("Amphi")}</option>
          <option value="s">{t("Special")}</option>
          <option value="n">{t("Normal")}</option>
        </select>

        <h1 className={blur ? `${styles.blur} ${styles.title}` : styles.title}>
          {t("Manage Room")}
        </h1>
        <button
          className={blur ? `${styles.blur}` : ""}
          onClick={() => {
            empty();
            setblur(true);
            setshow(false);
            setshowAddRoom(true);
          }}
        >
          <span>
            <FaRegBuilding />
          </span>
          {t("Add Room")}
        </button>
      </div>
      <div
        className={
          // Popup
          //   ? `${styles.blurColor} ${styles.formContainer}`
          // :
          styles.formContainer
        }
      >
        {/* add */}
        <div
          className={
            showAddRoom
              ? `${styles.popupedit} ${styles.slidefwdcenter} `
              : `${styles.slidefwdcenter} ${styles.hide}`
          }
        >
          <div className={styles.formEdit}>
            <div className={styles.formInputs}>
              <div className={`${styles.firstHalf} ${styles.flex}`}>
                <div className={styles.group}>
                  <input
                    value={roomType}
                    type="text"
                    onChange={(e) => {
                      setroomType(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Room Name")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={capacity}
                    type="text"
                    onChange={(e) => {
                      setcapacity(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Capacity")}</label>
                </div>

                <div className={`${styles.group}`}>
                  <select
                    value={type}
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      settype(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      {t("Type")}
                    </option>
                    <option value="s">{t("Special")}</option>
                    <option value="n">{t("Normal")}</option>
                  </select>
                </div>

                <div className={`${styles.group}`}>
                  <select
                    value={floor}
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setfloor(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      {t("Floor")}
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              {/* <div className={styles.secondHalf}></div> */}
            </div>
            {/* <p className={`${show ? styles.response : styles.hide}`}>
              {response ? "Added succesfully" : "error"}
            </p> */}
            <h1>{t("Add Room")}</h1>
          </div>
          <div className={styles.bts}>
            <button
              className={styles.buttons2}
              onClick={() => {
                // console.log("save");
                // addTeacher();
                // setshowAddRoom(false);
                // empty();
                // setPopup(false);
                addRoom();
                setshow(false);
                setblur(false);
                setshow(true);
              }}
            >
              {t("Add")}
            </button>
            <button
              // className={styles.btn}
              className={styles.buttons1}
              onClick={() => {
                // setPopup(false);
                empty();
                setblur(false);
                // setPopup(false);
                setshowAddRoom(false);
              }}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>

        {/* end add */}
        {/* delete */}
        <div
          className={
            Popupdelete
              ? `${styles.popupdelete} ${styles.slidefwdcenter} `
              : `${styles.popupdelete} ${styles.hide}`
          }
        >
          <h5>{t("Delete Room")}</h5>
          <h6>{t("Want to delete?")}</h6>
          <h4>{roomname}</h4>
          <div className={styles.bts}>
            <button
              className={styles.buttons3}
              onClick={() => {
                deleteRoom();

                // deleteTeacher();
                setPopupdelete(false);
                setblur(false);
              }}
            >
              {t("Delete")}
            </button>
            <button
              // className={styles.btn}
              className={styles.buttons4}
              onClick={() => {
                setPopupdelete(false);
                setblur(false);
              }}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
        {/* end delete */}
        {/* edit */}
        <div
          className={
            Popup
              ? `${styles.popupedit} ${styles.slidefwdcenter} `
              : `${styles.slidefwdcenter} ${styles.hide}`
          }
        >
          <div className={styles.formEdit}>
            <div className={styles.formInputs}>
              <div className={styles.firstHalf}>
                <div className={styles.group}>
                  <input
                    value={roomType}
                    type="text"
                    onChange={(e) => {
                      setroomType(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Room Name")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={capacity}
                    type="text"
                    onChange={(e) => {
                      setcapacity(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Capacity")}</label>
                </div>

                <div className={`${styles.group}`}>
                  <select
                    value={type}
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      settype(e.target.value);
                    }}
                  >
                    <option value="" disabled selected>
                      {t("Type")}
                    </option>
                    <option value="s">{t("Special")} </option>
                    <option value="n">{t("Normal")}</option>
                  </select>
                </div>
                <div className={`${styles.group}`}>
                  <select
                    value={floor}
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setfloor(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      {t("Floor")}
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div className={styles.secondHalf}></div>
            </div>
            <p className={`${show ? styles.response : styles.hide}`}>
              {response ? "Updated succesfully" : "error"}
            </p>
            <h1>{t("Edit Room")}</h1>
          </div>
          <div className={styles.bts}>
            <button
              className={styles.buttons2}
              onClick={() => {
                // console.log("save");
                EditRoom();
                // empty();
                setshow(false);

                // setPopup(false);
                // setblur(false);
              }}
            >
              {t("Save")}
            </button>
            <button
              // className={styles.btn}
              className={styles.buttons1}
              onClick={() => {
                setPopup(false);
                setblur(false);
                empty();
              }}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
        {/* end edit */}
        <table
          // className={styles.table}
          // className={styles.table}
          className={blur ? `${styles.blur} ${styles.table}` : styles.table}
        >
          <thead className={styles.thead}>
            <tr>
              <th>{t("Room Name")}</th>
              <th>{t("Capacity")}</th>
              <th>{t("Floor")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {row
              .filter(
                (val) =>
                  val.type.includes(Typefilter) ||
                  val.roomname.includes(Typefilter)
              )
              .map((rows, index) => (
                <tr key={index}>
                  <td className={styles.roomname}>
                    {rows.roomname.toUpperCase()}
                    <span
                      className={rows.type == "s" ? styles.show : styles.hide}
                    >
                      <AiFillStar />
                    </span>
                  </td>
                  <td>
                    {rows.capacity}{" "}
                    <span className={styles.stairs}>
                      <MdOutlineReduceCapacity />
                    </span>
                  </td>
                  <td>
                    {rows.floor}{" "}
                    <span className={styles.stairs}>
                      <GiStairsGoal />
                    </span>
                  </td>

                  <td>
                    <button
                      className={`${styles.btn1} ${styles.btn}`}
                      onClick={() => {
                        setPopup(true);
                        setblur(true);
                        fieldFill(rows.id);
                        setshow(false);
                        setshowAddRoom(false);
                      }}
                    >
                      <AiOutlineEdit />
                      {/* <span>Edit</span> */}
                    </button>

                    <button
                      className={`${styles.btn2} ${styles.btn}`}
                      onClick={() => {
                        setid(rows.id);
                        setroomname(rows.roomname);
                        setPopupdelete(true);
                        setblur(true);
                        // setTemail(rows.email);
                        setshowAddRoom(false);
                        setPopup(false);
                      }}
                    >
                      <AiOutlineDelete />
                      {/* <span>Delete</span> */}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddRoom;
