import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "./App.css";


import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import Dashboard from "./components/Dashboard/Dashboard";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import UsersPage from "./pages/UsersPage/UsersPage";
import CampaignsPage from "./pages/CampaignsPage/CampaignsPage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage";
import AccountsPage from "./pages/AccountsPage/AccountsPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import Sprite from './assets/Sprite.jsx';


function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Sprite />
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboardpage" element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="accounts" element={<AccountsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
