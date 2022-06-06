import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { BiAnalyse, BiSearch, BiLaptop, BiBookBookmark } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { GiArchiveResearch } from "react-icons/gi";
import { RiBookMarkFill } from "react-icons/ri";
import { IoIosChatbubbles } from "react-icons/io";
import {
  AiFillHeart,
  AiTwotoneFileExclamation,
  AiTwotoneEdit,
} from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState,useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import avatar from "../../Img/teacher.webp";



const SideBar = ({ children }) => {
  const [email, setemail] = useState("");
   const [firstName, setfirstName] = useState("");
   const [lastName, setlastName] = useState("");
  useEffect(() => {
    showTeacherInput();
  }, [firstName,lastName]);

   const { t } = useTranslation();
  const routes = [
    {
      path: "/Teacher/EditProfile",
      name: t("Edit Profile"),
      icon: <FaSignOutAlt />,
    },
    {
      path: "/",
      name: t("Manage Reservation"),
      icon: <RiBookMarkFill />,
      subRoutes: [
        {
          path: "/Teacher/ConsultResrvation",
          name: t("Consult Reservation"),
          icon: <GiArchiveResearch />,
        },
        {
          path: "/Teacher/AddReservation",
          name: t("Add Reservation"),
          icon: <FaPlus />,
        },
        {
          path: "/Teacher/ReserveMaterial",
          name: t("Reserve Material"),
          icon: <BiLaptop />,
        },
        // {
        //   path: "/Teacher/EditReservation",
        //   name: "Edit Reservation",
        //   icon: <AiTwotoneEdit />,
        // },
        {
          path: "/Teacher/DeleteReservation",
          name: t("My Reservation"),
          icon: <BiBookBookmark />,
        },
      ],
    },

    {
      path: "/Teacher/ContactOwner",
      name: t("Contact Owner"),
      icon: <IoIosChatbubbles />,
    },

    {
      path: "/Teacher/Logout",
      name: t("Logout"),
      icon: <FaSignOutAlt />,
    },
  ];

   
  const [isOpen, setIsOpen] = useState(false);
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

   async function showTeacherInput() {
     setemail(JSON.parse(localStorage.getItem("userEmail")));
     const Temail = { email };
     // console.log(Temail)

     // console.log(email);
     let result = await fetch("http://localhost:8000/api/showeteacher", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
       },
       body: JSON.stringify(Temail),
     });
     result = await result.json();
     console.log(result);
     setfirstName(result.firstname);
     setlastName(result.lastname);
   }

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
          className={`sidebar `}
        >
          <div className="top_section">
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
            <div className={!isOpen ? "hide" : "profile"}>
              <img src={avatar} />
              <h5>{firstName} { lastName}</h5>
              <p>{t('Teacher_type')}</p>
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
