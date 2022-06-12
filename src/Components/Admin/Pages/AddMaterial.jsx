import React from "react";

import styles from "../../Styles/Material.module.css";
import { useState, useEffect } from "react";

import { BiLaptop } from "react-icons/bi";
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
import { FcViewDetails } from "react-icons/fc";
import { FaRegBuilding } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import EditMaterial from './EditMaterial';
import { t } from "i18next";
function AddMaterial() {
  const [id, setid] = useState("");
  const [state, setstate] = useState("");
  const [Popup, setPopup] = useState(false);
  const [Popupdelete, setPopupdelete] = useState(false);
  const [showAddMaterial, setshowAddMaterial] = useState(false);
  const [row, setrow] = useState([]);
  const [blur, setblur] = useState(false);
  const [show, setshow] = useState(false);
  const [materialtype, setmaterialtype] = useState("");
  const [serialnumber, setserialnumber] = useState("");
  const [response, setresponse] = useState(false);
  const [property, setproperty] = useState("");
  const [materialInfo, setmaterialInfo] = useState('');
  const [info, setinfo] = useState('');
  // console.log(state)
async function EditMaterial() {
  const editMaterialInfo = {
    serialnumber,
    property,
    materialtype,
    state,
    id,
  };
  console.log(editMaterialInfo);
  let result = await fetch("http://localhost:8000/api/editmaterials", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(editMaterialInfo),
  });
  result = await result.json();
  console.log(result);
  alert(result)
  // if (result == "updated succesfully") {
  //   setresponse(true);
  //   setshow(true);
  //   // setTimeout(function () {
  //   //   setresponse(false);
  //   //   setshow(false);
  //   // }, 1000);

  //   // setresponse(true)
  // } else {
  //   setshow(true);
  //   setresponse(false);
  //   // setTimeout(function () {
  //   //   // setresponse(false);
  //   //   setshow(false);
  //   // }, 1000);
  // }
  showMaterial();
}
  async function deleteMaterial() {
    const deleteInfo = { id };
    // console.log(deleteInfo);
    let result = await fetch("http://localhost:8000/api/deletematerials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(deleteInfo),
    });
    result = await result.json();
    // console.log(result);
    showMaterial();
    // if (result == "succefully deleted") {
      alert(result);
  // } 
    // else {
    //   alert("error");
    // }
  }

  async function showMaterial() {
    fetch("http://localhost:8000/api/ShowAllmaterials")
      .then((res) => res.json())
      .then((data) => setrow(data));
  }
  async function addMaterial() {
    const addMaterialInfo = {
      materialtype,
      property,
      serialnumber,
      state,
    };
    // console.log(addMaterialInfo)
    let result = await fetch("http://localhost:8000/api/addmaterials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addMaterialInfo),
    });
    result = await result.json();
    // console.log(result);
    showMaterial();
// console.log(result)\
    alert(result)
    // if (result == "succefully added") {
    //   setresponse(true);
    //   // setshow(false)
    //   setshowAddMaterial(false);

    //   alert("Material Added Succesfully");
    // } else {
    //   setresponse(false);
    //   setshowAddMaterial(true);
    //   // setshowAddRoom(true);
    //   // alert("Imput Field Empty");
    //   alert("Something Went Wrong");
    // }
  }
  // console.log(row);
  useEffect(() => {
    showMaterial();
    //  empty();?
  }, []);
   function empty() {
     setmaterialtype("")
     setstate("")
     setproperty("")
     setserialnumber("")
  }
   function fieldFill(idM) {
     // console.log(email);
     row.forEach((rows) => {
       if (rows.id == idM) {
         setserialnumber(rows.serialnumber);
         setmaterialtype(rows.typematerial);
         setproperty(rows.property);
         setid(rows.id);
         setstate(rows.state)
       }
     });
   }
  return (
    <div className={styles.container}>
      <div className={styles.topcontainer}>
        <h1 className={blur ? `${styles.blur}` : ""}>{t("Manage Material")}</h1>
        <button
          className={blur ? `${styles.blur}` : ""}
          onClick={() => {
            empty();
            setblur(true);
            setshow(false);
            setshowAddMaterial(true);
          }}
        >
          <span>
            <BiLaptop />
          </span>
          {t("Add Material")}
        </button>
      </div>
      <div
        className={
          Popup
            ? `${styles.blurColor} ${styles.formContainer}`
            : styles.formContainer
        }
      >
        {/* add */}
        <div
          className={
            showAddMaterial
              ? `${styles.popupedit} ${styles.slidefwdcenter} `
              : `${styles.slidefwdcenter} ${styles.hide}`
          }
        >
          <div className={styles.formEdit}>
            <div className={styles.formInputs}>
              <div className={`${styles.firstHalf} ${styles.flex}`}>
                <div className={styles.group}>
                  <input
                    value={materialtype}
                    type="text"
                    onChange={(e) => {
                      setmaterialtype(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Material Type")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={property}
                    type="text"
                    onChange={(e) => {
                      setproperty(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Properties")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={serialnumber}
                    type="text"
                    onChange={(e) => {
                      setserialnumber(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Serial Number")}</label>
                </div>
                <div className={`${styles.group}`}>
                  <select
                    value={state}
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setstate(e.target.value);
                    }}
                  >
                    <option value="">{t("State")}</option>
                    <option value="good">{t("Good")}</option>
                    <option value="not good">{t("Not Good")}</option>
                  </select>
                </div>
              </div>
              {/* <div className={styles.secondHalf}></div> */}
            </div>
            {/* <p className={`${show ? styles.response : styles.hide}`}>
              {response ? "Added succesfully" : "error"}
            </p> */}
            <h1>{t("Add Material")}</h1>
          </div>
          <div className={styles.bts}>
            <button
              className={styles.buttons2}
              onClick={() => {
                // console.log("save");
                // addTeacher();
                addMaterial();
                // setshowAddMaterial(false);
                // empty();
                // setPopup(false);
                // addRoom();
                // setshow(true);
                // setblur(false);
                // setshow(true);
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
                setshowAddMaterial(false);
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
          <h5>{t("Delete Material")}</h5>
          <h6>{t("Want to delete?")}</h6>
          <h5>{materialInfo}</h5>
          <h6>{info}</h6>
          <div className={styles.bts}>
            <button
              className={styles.buttons3}
              onClick={() => {
                deleteMaterial();

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
                    value={materialtype}
                    type="text"
                    onChange={(e) => {
                      setmaterialtype(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Material Type")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={property}
                    type="text"
                    onChange={(e) => {
                      setproperty(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Properties")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={serialnumber}
                    type="text"
                    onChange={(e) => {
                      setserialnumber(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Serial Number")}</label>
                </div>
                <div className={`${styles.group}`}>
                  <select
                    value={state}
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setstate(e.target.value);
                    }}
                  >
                    <option value="" disabled>
                      {t("State")}
                    </option>
                    <option value="good">{t("Good")}</option>
                    <option value="not good">{t("Not Good")}</option>
                  </select>
                </div>
              </div>
              <div className={styles.secondHalf}></div>
            </div>
            <p className={`${show ? styles.response : styles.hide}`}>
              {response ? "Updated succesfully" : "error"}
            </p>
            <h1>{t("Edit Material")}</h1>
          </div>
          <div className={styles.bts}>
            <button
              className={styles.buttons2}
              onClick={() => {
                // console.log("save");
                EditMaterial();
                // empty();

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
          <thead>
            <tr>
              <th>{t("Material Type")}</th>
              <th>{t("Properties")}</th>
              <th>{t("Serial Number")}</th>
              <th>{t("State")}</th>
              <th>{t("Action")}</th>
            </tr>
          </thead>
          <tbody>
            {row.map((rows, index) => (
              <tr key={index}>
                <td>{rows.typematerial.toUpperCase()}</td>
                <td>
                  {rows.property}{" "}
                  <span className={styles.stairs}>
                    <FcViewDetails />
                  </span>
                </td>
                <td>
                  {rows.serialnumber}{" "}
                  <span className={styles.stairs}>
                    {/* <GiStairsGoal /> */}
                  </span>
                </td>
                <td>
                  {rows.state}{" "}
                  <span className={styles.stairs}>
                    {/* <GiStairsGoal /> */}
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
                      setshowAddMaterial(false);
                    }}
                  >
                    <AiOutlineEdit />
                    {/* <span>Edit</span> */}
                  </button>

                  <button
                    className={`${styles.btn2} ${styles.btn}`}
                    onClick={() => {
                      setid(rows.id);
                      setmaterialInfo(rows.typematerial);
                      setinfo(rows.property);
                      setPopupdelete(true);
                      setblur(true);
                      setshowAddMaterial(false);
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

export default AddMaterial;
