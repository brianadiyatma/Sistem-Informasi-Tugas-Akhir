import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Pengajuan from "./Pages/Pengajuan/Pengajuan";
import Repository from "./Pages/Repository/Repository";
import Login from "./Pages/Login/Login";
import Daftar from "./Pages/Daftar/Daftar";
import Auth from "./Auth/Auth";
import { useDispatch } from "react-redux";
import authSlice from "./features/authSlice";
import NotFoundPage from "./Pages/NotFound/NotFound";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(authSlice.actions.retriveLocalStorage());
    }
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/daftar" element={<Daftar />} />
      <Route element={<Auth />}>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="pengajuan" element={<Pengajuan />} />
          <Route path="repository" element={<Repository />} />
        </Route>
      </Route>
      <Route />
      <Route path="*" exact element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
