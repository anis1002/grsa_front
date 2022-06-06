import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaSignOutAlt,
  FaWrench,
  FaRegTrashAlt,
  FaCog,
  FaPlus,
  FaBuilding,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch, BiLaptop } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import {
  AiFillHeart,
  AiTwotoneFileExclamation,
  AiTwotoneEdit,
} from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import avatar from "../../Img/adminp.webp";
import { GiArchiveResearch } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const SideBar = ({ children }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const [email, setemail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const routes = [
    {
      path: "/AdministrativePerson/EditProfile",
      name: t("Edit Profile"),
      icon: <FaCog />,
    },
    {
      path: "/AdministrativePerson/ConsultResrvation",
      name: t("Consult Reservation"),
      icon: <GiArchiveResearch />,
    },

    {
      path: "/AdministrativePerson/Logout",
      name: t("Logout"),
      icon: <FaSignOutAlt />,
    },
  ];
  useEffect(() => {
    getFirstLastName();
  }, [firstName,lastName]);

  async function getFirstLastName() {
    setemail(JSON.parse(localStorage.getItem("userEmail")));
    const Temail = { email };
    // console.log(Temail)

    // console.log(email);
    let result = await fetch(
      "http://localhost:8000/api/showeprsnadministrative",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Temail),
      }
    );
    result = await result.json();
    console.log(result);
    setfirstName(result.firstname);
    setlastName(result.lastname);
    // setphoneNumber(result.phonenumber);
  }

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className="sidebar"
        >
          <div className="top_section">
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
            <div className={!isOpen ? "hide" : "profile"}>
              <img src={avatar} />
              <h5 style={{ textTransform: "capitalize" }}>
                {firstName} {lastName}
              </h5>
              <p>{t("Administrative Person")}</p>
            </div>

            {/* <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Adminstrator
                </motion.h1>
              )}
            </AnimatePresence> */}
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  // className="link"
                  // activeClassName="active"
                  className={`${({ isActive }) =>
                    isActive ? "active" : ""} link`}
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
