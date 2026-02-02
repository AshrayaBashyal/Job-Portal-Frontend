import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobList from "./pages/jobs/JobList";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthContext";
import CreateJob from "./pages/jobs/CreateJob"; 
import CreateCompany from "./pages/companies/CreateCompany";


export default function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/list" element={<JobList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/my-jobs" element={<PrivateRoute> <MyJobs /> </PrivateRoute>} /> */}
      <Route 
        path="/create-company" 
        element={<PrivateRoute><CreateCompany /></PrivateRoute>} 
      />
      <Route 
        path="/create-job" 
        element={<PrivateRoute><CreateJob /></PrivateRoute>} 
      />
      <Route path="/jobs" element={<JobList />} /> 
    </Routes>
    </>
  );
}
