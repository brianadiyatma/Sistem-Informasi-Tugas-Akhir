import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import User from "./Pages/User/User";
import Repository from "./Pages/Repository/Repository";
import Pengajuan from "./Pages/Pengajuan/Pengajuan";
import authSlice from "./features/authSlice";
import { useDispatch } from "react-redux";
import Login from "./Pages/Login/Login";
import Auth from "./Auth/Auth";
import NotFoundPage from "./Pages/NotFound/NotFound";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("admin")) {
      dispatch(authSlice.actions.retriveLocalStorage());
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route element={<Auth />}>
        <Route path="/admin" element={<Navbar />}>
          <Route path="" element={<Admin />} />
          <Route path="user-management" element={<User />} />
          <Route path="repository" element={<Repository />} />
          <Route path="pengajuan" element={<Pengajuan />} />
        </Route>
      </Route>
      <Route path="*" exact element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
