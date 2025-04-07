import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./login";
import CurrentRequest from "./components/CurrentRequest";
import DriverPortal from "./components/DriverPortal";
import AdminPortal from "./components/AdminPortal";
import ProviderPortal from "./components/ProviderPortal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />} />
        <Route path="/current-request" element={<CurrentRequest />} />{" "}
        <Route path="/driver-portal" element={<DriverPortal />} />
        <Route path="/admin-portal" element={<AdminPortal />} />
        <Route path="/provider-portal" element={<ProviderPortal />} />
        <Route path="/driver-portal" element={<DriverPortal />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
