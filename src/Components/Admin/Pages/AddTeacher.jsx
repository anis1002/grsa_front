import React from "react";
import styles from "../../Styles/AddTeacher.module.css";
import { useState, useEffect } from "react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import DeleteMaterial from "./DeleteMaterial";
import { useTranslation } from "react-i18next";

const AddTeacher = () => {
  const { t } = useTranslation();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Departemnt, setDepartemnt] = useState("");
  const [grade, setgrade] = useState("");
  const [state, setstate] = useState("");
  const [status, setstatus] = useState("");

  const [row, setrow] = useState([]);
  const [Popup, setPopup] = useState(false);
  const [blur, setblur] = useState(false);
  const [response, setresponse] = useState(false);
  const [show, setshow] = useState(false);
  const [Open, setOpen] = useState(false);
  const [Popupdelete, setPopupdelete] = useState(false);
  const [Temail, setTemail] = useState("");
  const [deleteMessage, setdeleteMessage] = useState("");
  const [showAddTeacher, setshowAddTeacher] = useState(false);
  // console.log(row)
  function empty() {
    setfirstName("");
    setlastName("");
    setemail("");
    setPhoneNumber("");
    setDepartemnt("");
    setgrade("");
    setstate("");
    setstatus("");
    setpassword("");
  }
  function fieldFill(email) {
    // console.log(email);
    row.forEach((rows) => {
      if (rows.email == email) {
        setfirstName(rows.firstname);
        setlastName(rows.lastname);
        setemail(rows.email);
        setPhoneNumber(rows.phonenumber);
        setDepartemnt(rows.department);
        setgrade(rows.grade);
        setstate(rows.state);
        setstatus(rows.status);
      }
    });
  }

  async function EditTeacher() {
    const editTeacherInfo = {
      firstName,
      lastName,
      email,
      password,
      PhoneNumber,
      Departemnt,
      grade,
      state,
      status,
    };
    console.log(editTeacherInfo);
    let result = await fetch("http://localhost:8000/api/editteacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(editTeacherInfo),
    });
    result = await result.json();
    alert(result);
    // console.log(result);
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
    showTeacher();
  }

  // console.log(row);
  async function showTeacher() {
    fetch("http://localhost:8000/api/ShowAllTeachers")
      .then((res) => res.json())
      .then((data) => setrow(data));
  }

  useEffect(() => {
    showTeacher();
    empty();
  }, []);
  async function deleteTeacher() {
    const deleteInfo = { Temail };
    // console.log(deleteInfo);
    let result = await fetch("http://localhost:8000/api/deleteteacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(deleteInfo),
    });
    result = await result.json();
    // console.log(result);
    showTeacher();
    // if (result == "deleted succesfully") {
    //   alert("deleted succesfully");
    // } else {
    //   alert("error");
    // }
    alert(result);
  }

  async function addTeacher() {
    const addTeacherInfo = {
      firstName,
      lastName,
      email,
      password,
      PhoneNumber,
      Departemnt,
      grade,
      state,
      status,
    };
    let result = await fetch("http://localhost:8000/api/addteacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(addTeacherInfo),
    });
    result = await result.json();
    // console.log(result)
    showTeacher();
    alert(result);
    // if (result == "added succesfully") {
    //   setresponse(true);
    //   setshow(false)
    //   setshowAddTeacher(false);
    //   blur(false)

    //   alert("Teacher Added Succesfully");
    // } else {
    //   setresponse(false);
    //   setshowAddTeacher(true);
    //   setshowAddTeacher(true);
    //   // alert("Imput Field Empty");
    // }
  }
  return (
    <div className={styles.container}>
      <div className={styles.topcontainer}>
        <h1 className={blur ? `${styles.blur}` : ""}>{t("Manage Teacher")}</h1>
        <button
          className={blur ? `${styles.blur}` : ""}
          onClick={() => {
            empty();
            setblur(true);
            setshow(false);
            setshowAddTeacher(true);
            // setshow(false);
          }}
        >
          <span>
            <AiOutlineUserAdd />
          </span>
          {t("Add Teacher")}
        </button>
      </div>
      <div
        className={
          // blur
          //   ? `${styles.overflow} ${styles.formContainer}`
          //   :
          styles.formContainer
        }
      >
        {/* add Teacher */}
        <div
          className={
            showAddTeacher
              ? `${styles.popupedit} ${styles.slidefwdcenter} `
              : `${styles.slidefwdcenter} ${styles.hide}`
          }
        >
          <div className={styles.formEdit}>
            <div className={styles.formInputs}>
              <div className={styles.firstHalf}>
                <div className={styles.group}>
                  <input
                    value={firstName}
                    type="text"
                    onChange={(e) => {
                      setfirstName(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("First Name")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={lastName}
                    type="text"
                    onChange={(e) => {
                      setlastName(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Last Name")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={email}
                    type="text"
                    // required
                    // disabled
                    // hidden
                    // disabled
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Email")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={PhoneNumber}
                    type="text"
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Phome Number")}</label>
                </div>

                <div className={styles.group}>
                  <input
                    value={password}
                    type="password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Password")}</label>
                </div>
              </div>
              <div className={styles.secondHalf}>
                <div className={`${styles.group}`}>
                  <select
                    value={Departemnt}
                    name=""
                    id=""
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setDepartemnt(e.target.value);
                    }}
                  >
                    <option value="">{t("Department")}</option>
                    <option value="ifa">IFA</option>
                    <option value="tlsi">TLSI</option>
                  </select>
                  {/* <input type="text" required />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Department</label> */}
                </div>
                <div className={`${styles.group}`}>
                  <select
                    value={status}
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setstatus(e.target.value);
                    }}
                  >
                    <option value="">{t("Account State")}</option>
                    <option value="active">{t("Active")}</option>
                    <option value="desactive">{t("Desactive")}</option>
                  </select>
                  {/* <input type="text" required />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Status</label> */}
                </div>
                <div className={`${styles.group}`}>
                  <select
                    value={grade}
                    name=""
                    id=""
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setgrade(e.target.value);
                    }}
                  >
                    <option value="">{t("Grade")}</option>
                    <option value="prof td">{t("Prof Td")}</option>
                    <option value="prof tp">{t("Prof Tp")}</option>
                    <option value="prof cour">{t("Prof Cour")}</option>
                  </select>
                  {/* <input type="text" required />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Grade</label> */}
                </div>

                <div className={`${styles.group}`}>
                  <select
                    value={state}
                    name=""
                    id=""
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setstate(e.target.value);
                    }}
                  >
                    <option value="">{t("State")}</option>
                    <option value="secondary">{t("Secondary")}</option>
                    <option value="principale">{t("Principale")}</option>
                  </select>
                  {/* <input type="text" required />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Grade</label> */}
                </div>
              </div>
            </div>
            {/* <p className={`${show ? styles.response : styles.hide}`}>
              {response ? "Added succesfully" : "error"}
            </p> */}
            <h1>{t("Add Teacher")}</h1>
          </div>
          <div className={styles.bts}>
            <button
              className={styles.buttons2}
              onClick={() => {
                // console.log("save");
                addTeacher();
                // setshowAddTeacher(false);
                // empty();
                // setPopup(false);
                setshow(true);
                // setblur(false);
                // setshow(true)
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
                setshowAddTeacher(false);
              }}
            >
              {t("Cancel")}
            </button>
          </div>
        </div>
        {/* end add teacher */}

        {/* editTeacher */}
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
                    value={firstName}
                    type="text"
                    required
                    onChange={(e) => {
                      setfirstName(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("First Name")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={lastName}
                    type="text"
                    required
                    onChange={(e) => {
                      setlastName(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Last Name")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={email}
                    type="text"
                    // required
                    disabled
                    // hidden
                    // disabled
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Email")}</label>
                </div>
                <div className={styles.group}>
                  <input
                    value={PhoneNumber}
                    type="text"
                    required
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Phome Number")}</label>
                </div>

                <div className={styles.group}>
                  <input
                    // value={password}
                    type="text"
                    required
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>{t("Password")}</label>
                </div>
              </div>
              <div className={styles.secondHalf}>
                <div className={`${styles.group}`}>
                  <select
                    value={Departemnt}
                    name=""
                    id=""
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setDepartemnt(e.target.value);
                    }}
                  >
                    <option value="">{t("Department")}</option>
                    <option value="ifa">IFA</option>
                    <option value="tlsi">TLSI</option>
                  </select>
                  {/* <input type="text" required />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Department</label> */}
                </div>
                <div className={`${styles.group}`}>
                  <select
                    value={status}
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setstatus(e.target.value);
                    }}
                  >
                    <option value="">{t("Account State")}</option>
                    <option value="active">{t("Active")}</option>
                    <option value="desactive">{t("Desactive")}</option>
                  </select>
                  {/* <input type="text" required />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Status</label> */}
                </div>
                <div className={`${styles.group}`}>
                  <select
                    value={grade}
                    name=""
                    id=""
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setgrade(e.target.value);
                    }}
                  >
                    <option value="">{t("Grade")}</option>
                    <option value="prof td">{t("Prof Td")}</option>
                    <option value="prof tp">{t("Prof Tp")}</option>
                    <option value="prof cour">{t("Prof Cour")}</option>
                  </select>
                  {/* <input type="text" required />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Grade</label> */}
                </div>

                <div className={`${styles.group}`}>
                  <select
                    value={state}
                    name=""
                    id=""
                    className={`${styles.Selection}`}
                    onChange={(e) => {
                      setstate(e.target.value);
                    }}
                  >
                    <option value="">{t("State")}</option>
                    <option value="secondary">{t("Secondary")}</option>
                    <option value="principale">{t("Principale")}</option>
                  </select>
                  {/* <input type="text" required />
                  <span className={styles.highlight}></span>
                  <span className={styles.bar}></span>
                  <label>Grade</label> */}
                </div>
              </div>
            </div>
            <p className={`${show ? styles.response : styles.hide}`}>
              {response ? "Updated succesfully" : "error"}
            </p>
            <h1>{t("Edit Teacher")}</h1>
          </div>
          <div className={styles.bts}>
            <button
              className={styles.buttons2}
              onClick={() => {
                // console.log("save");
                EditTeacher();
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
        {/* end edit teacher */}

        {/* delete teacher */}
        <div
          className={
            Popupdelete
              ? `${styles.popupdelete} ${styles.slidefwdcenter} `
              : `${styles.popupdelete} ${styles.hide}`
          }
        >
          <h5>{t("Delete Teacher")}</h5>
          <h6>{t("Want to delete?")}</h6>
          <h6>{Temail}</h6>
          <div
          // className={styles.btns}
          >
            <button
              className={styles.buttons3}
              onClick={() => {
                deleteTeacher();
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
        {/* end detete Teacher */}

        {/* tabel */}

        <table
          // className={styles.table}
          className={blur ? `${styles.blur} ${styles.table}` : styles.table}
        >
          <thead className={styles.thead}>
            <tr>
              <th>{t("First Name")}</th>
              <th>{t("Last Name")}</th>
              <th>{t("Email")}</th>
              {/* <th>Password</th> */}
              <th>{t("Phome Number")}</th>
              <th>{t("Department")}</th>
              <th>{t("Grade")}</th>
              <th>{t("Status")}</th>
              <th>{t("State")}</th>
              <th>{t("Action")}</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {row.map((rows, index) => (
              <tr key={index}>
                <td>{rows.firstname}</td>
                <td>{rows.lastname}</td>
                <td className={styles.email}>{rows.email}</td>
                <td>{rows.phonenumber}</td>
                <td>{rows.department}</td>
                <td>{rows.grade}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      rows.status === "active"
                        ? styles.text_success
                        : styles.text_danger
                    }`}
                  >
                    .
                  </span>
                  {rows.status}
                </td>
                <td>{rows.state}</td>
                <td>
                  <button
                    className={`${styles.btn1} ${styles.btn}`}
                    onClick={() => {
                      setPopup(true);
                      setblur(true);
                      fieldFill(rows.email);
                      setshow(false);
                      setshowAddTeacher(false);
                    }}
                  >
                    <AiOutlineEdit />
                  </button>

                  <button
                    className={`${styles.btn2} ${styles.btn}`}
                    onClick={() => {
                      setPopupdelete(true);
                      setblur(true);
                      setTemail(rows.email);
                      setshowAddTeacher(false);
                      setPopup(false);
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* table  end */}
      </div>
    </div>
  );
};

export default AddTeacher;
