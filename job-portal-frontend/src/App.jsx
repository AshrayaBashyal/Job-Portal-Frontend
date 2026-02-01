import { Routes, Route } from "react-router-dom";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
import JobList from "./pages/jobs/JobList";

export default function App() {
  return (
    <Routes>
      <Route path="/list" element={<JobList />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/register" element={<Register />} /> */}
    </Routes>
  );
}
