//pages
import Admin from "./Components/Admin/Admin";
import AdminPer from "./Components/PerAdmin/AdminPer";
import Teacher from "./Components/Teacher/Teacher";
import BeforeLogin from "./Components/BeforeLogin";
import Login from "./Components/Login";
// import "./App.css";
import "./App.css";
//import from react
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddRoom from "./Components/Admin/Pages/AddRoom";
import DeleteRoom from "./Components/Admin/Pages/DeleteRoom";
import EditRoom from "./Components/Admin/Pages/EditRoom";
import AddMaterial from "./Components/Admin/Pages/AddMaterial";
import DeleteMaterial from "./Components/Admin/Pages/DeleteMaterial";
import EditProfileT from "./Components/Teacher/Pages/EditProfile";
import EditProfileA from "./Components/Admin/Pages/EditProfileA";
import AddTeacher from "./Components/Admin/Pages/AddTeacher";
import EditTeacher from "./Components/Admin/Pages/EditTeacher";
import DeleteTeacher from "./Components/Admin/Pages/DeleteTeacher";
import EditMaterial from "./Components/Admin/Pages/EditMaterial";
import Logout from "./Components/Admin/Pages/Logout";
import AddReservation from "./Components/Teacher/Pages/AddReservation";
import DeleteReservation from "./Components/Teacher/Pages/DeleteReservation";
import EditRevservation from "./Components/Teacher/Pages/EditRevservation";
import ConsultReservation from "./Components/Teacher/Pages/ConsultReservation";
import ContactOwner from "./Components/Teacher/Pages/ContactOwner";
import ReserveMaterial from "./Components/Teacher/Pages/ReserveMaterial";
import RecievedMessages from "./Components/Teacher/Pages/RecievedMessages";
import EditProfileP from "./Components/PerAdmin/Pages/EditProfile";


function App() {
  const [user, setuser] = useState(false);
  const [teacher, setteacher] = useState(false);
  const [admin, setadmin] = useState(false);
  const [adminPer, setadminPer] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("loginStatus");
    u && JSON.parse(u) ? setuser(true) : setuser(false);

    const a = localStorage.getItem("admin");
    a && JSON.parse(a) ? setadmin(true) : setadmin(false);

    const t = localStorage.getItem("teacher");
    t && JSON.parse(t) ? setteacher(true) : setteacher(false);

    const ap = localStorage.getItem("adminPer");
    ap && JSON.parse(ap) ? setadminPer(true) : setadminPer(false);
  }, []);

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/" element={<BeforeLogin />} />

          <Route
            path="/Administrator/login"
            element={
              <Login
                defineAdmin={() => {
                  setadmin(true);
                }}
                Authentication={() => {
                  setuser(true);
                }}
              />
            }
          />
          <Route
            path="/Teacher/login"
            element={
              <Login
                defineTeacher={() => {
                  setteacher(true);
                }}
                Authentication={() => {
                  setuser(true);
                }}
              />
            }
          />
          <Route
            path="/AdministrativePerson/login"
            element={
              <Login
                defineAdminPer={() => {
                  setadminPer(true);
                }}
                Authentication={() => {
                  setuser(true);
                }}
              />
            }
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </>
      )}

      {teacher && (
        <>
          <Route path="/Teacher" element={<Teacher />}>
            <Route
              path="/Teacher/AddReservation"
              element={<AddReservation />}
            />
            <Route
              path="/Teacher/DeleteReservation"
              element={<DeleteReservation />}
            />
            <Route
              path="/Teacher/EditReservation"
              element={<EditRevservation />}
            />
            <Route
              path="/Teacher/ConsultResrvation"
              element={<ConsultReservation />}
            />
            <Route
              path="/Teacher/RecievedMessages"
              element={<RecievedMessages />}
            />
            <Route path="/Teacher/ContactOwner" element={<ContactOwner />} />
            <Route path="/Teacher/EditProfile" element={<EditProfileT />} />
            <Route
              path="/Teacher/ReserveMaterial"
              element={<ReserveMaterial />}
            />
            <Route path="/Teacher/Logout" element={<Logout />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={"/Teacher/ConsultResrvation"} />}
          />
        </>
      )}

      {admin && (
        <>
          <Route path="/Administrator" element={<Admin />}>
            {/* teacher routes */}
            <Route path="/Administrator/AddTeacher" element={<AddTeacher />} />
            <Route
              path="/Administrator/ConsultResrvation"
              element={<ConsultReservation />}
            />
            <Route
              path="/Administrator/EditTeacher"
              element={<EditTeacher />}
            />
            <Route
              path="/Administrator/DeleteTeacher"
              element={<DeleteTeacher />}
            />
            {/* rooms routes */}
            <Route path="/Administrator/AddRoom" element={<AddRoom />} />
            <Route path="/Administrator/DeleteRoom" element={<DeleteRoom />} />
            <Route path="/Administrator/EditRoom" element={<EditRoom />} />
            {/* material routes */}
            <Route
              path="/Administrator/AddMaterial"
              element={<AddMaterial />}
            />
            <Route
              path="/Administrator/DeleteMaterial"
              element={<DeleteMaterial />}
            />

            <Route
              path="/Administrator/EditMaterial"
              element={<EditMaterial />}
            />
            <Route
              path="/Administrator/EditProfile"
              element={<EditProfileA />}
              _
            />
            <Route path="/Administrator/Logout" element={<Logout />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={"/Administrator/ConsultResrvation"} />}
          />
        </>
      )}

      {adminPer && (
        <>
          <Route path="/AdministrativePerson" element={<AdminPer />}>
            <Route
              path="/AdministrativePerson/ConsultResrvation"
              element={<ConsultReservation />}
            />
            <Route path="/AdministrativePerson/Logout" element={<Logout />} />
            <Route
              path="/AdministrativePerson/EditProfile"
              element={<EditProfileP />}
            />
          </Route>
          <Route
            path="*"
            element={
              <Navigate to={"/AdministrativePerson/ConsultResrvation"} />
            }
          />
        </>
      )}
    </Routes>
  );
}

export default App;

//  {/* <select
//               className={styles.select}
//               value={Who}
//               onChange={(e) => setWho(e.target.value)}
//             >
//               <option value="">CHOOSE ONE</option>
//               <option value="Admin">Administrator</option>
//               <option value="Teacher">Teacher</option>
//               <option value="AdminPer">Administrative Person</option>
//             </select> */}
