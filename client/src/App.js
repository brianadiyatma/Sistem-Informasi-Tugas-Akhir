import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Pengajuan from "./Pages/Pengajuan/Pengajuan";
import Repository from "./Pages/Repository/Repository";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navbar />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="pengajuan" element={<Pengajuan />} />
        <Route path="repository" element={<Repository />} />
      </Route>
      <Route />
    </Routes>
  );
}

export default App;
