import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser ,FaSignOutAlt,FaWrench,FaRegTrashAlt,FaCog,FaPlus,FaBuilding} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch ,BiLaptop} from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation ,AiTwotoneEdit} from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState,useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import avatar from '../../Img/admin.jpg';
import { useTranslation } from "react-i18next";
import { style } from '@mui/system';
import { GiArchiveResearch } from "react-icons/gi";
import { MdOutlineChecklistRtl } from "react-icons/md";


const SideBar = ({ children }) => {
   const [email, setemail] = useState("");
   const [firstName, setfirstName] = useState("");
   const [lastName, setlastName] = useState("");
   const { t } = useTranslation();
const routes = [
  {
    path: "/Administrator/EditProfile",
    name: t("Edit Profile"),
    icon: <FaCog />,
  },
  {
    path: "/Administrator/AddTeacher",
    name: t("Manage Teacher"),
    icon: <FaUser />,
    // subRoutes: [
    //   {
    //     path: "/Administrator/AddTeacher",
    //     name: "Add Teacher",
    //     icon: <FaUser />,
    //   },
    //   {
    //     path: "/Administrator/EditTeacher",
    //     name: "Edit Teacher",
    //     icon: <AiTwotoneEdit />,
    //   },
    //   {
    //     path: "/Administrator/DeleteTeacher",
    //     name: "Delete Teacher",
    //     icon: <FaRegTrashAlt />,
    //   },
    // ],
  },
  {
    path: "/Administrator/AddRoom",
    name: t("Manage Room"),
    icon: <FaBuilding />,
    // subRoutes: [
    //   {
    //     path: "/Administrator/AddRoom",
    //     name: "Add Room",
    //     icon: <FaPlus />,
    //   },
    //   {
    //     path: "/Administrator/EditRoom",
    //     name: "Edit Room",
    //     icon: <AiTwotoneEdit />,
    //   },
    //   {
    //     path: "/Administrator/DeleteRoom",
    //     name: "Delete Room",
    //     icon: <FaRegTrashAlt />,
    //   },
    // ],
  },

  {
    path: "/Administrator/AddMaterial",
    name: t("Manage Material"),
    icon: <BiLaptop />,
    // subRoutes: [
    //   {
    //     path: "/Administrator/AddMaterial",
    //     name: "Add Material",
    //     icon: <FaPlus />,
    //   },
    //   {
    //     path: "/Administrator/EditMaterial",
    //     name: "Edit Material",
    //     icon: <AiTwotoneEdit />,
    //   },
    //   {
    //     path: "/Administrator/DeleteMaterial",
    //     name: "Delete Material",
    //     icon: <FaRegTrashAlt />,
    //   },
    // ],
  },

  {
    path: "/Administrator/ConsultResrvation",
    name: t("Consult Reservation"),
    icon: <GiArchiveResearch />,
  },
  {
    path: "/Administrator/RequestOnSpecailRooms",
    name: t("Request On Speacial Rooms"),
    icon: <MdOutlineChecklistRtl />,
  },
  {
    path: "/Administrator/Logout",
    name: t("Logout"),
    icon: <FaSignOutAlt />,
  },
];


  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
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
        duration: 0.2,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.2,
      },
    },
  };
    useEffect(() => {
      showAdminInput();
    }, [firstName,lastName]);

    async function showAdminInput() {
      setemail(JSON.parse(localStorage.getItem("userEmail")));
      const Temail = { email };
      // console.log(Temail)

      // console.log(email);
      let result = await fetch("http://localhost:8000/api/showeadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Temail),
      });
      result = await result.json();
      // console.log(result);
      setfirstName(result.firstname);
      setlastName(result.lastname);
      // setphoneNumber(result.phonenumber);
    }

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "45px",

            transition: {
              duration: 0.1,
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
              <h5 style={{ textTransform: "capitalize" }}>{firstName} { lastName}</h5>
              <p>{t("Administrator")}</p>
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
