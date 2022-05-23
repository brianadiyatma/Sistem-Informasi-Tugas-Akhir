import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
    </Routes>
  );
}

export default App;
