import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import VehicleSettings from "./pages/VehicleSettings";
import EarningsSettings from "./pages/EarningsSettings";
import RideHistory from "./pages/RideHistory";
import KineticOverlay from "./pages/KineticOverlay";
import AdminDashboard from "./pages/AdminDashboard";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vehicle" element={<VehicleSettings />} />
        <Route path="/earnings" element={<EarningsSettings />} />
        <Route path="/rides" element={<RideHistory />} />
        <Route path="/kinetic" element={<KineticOverlay />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
