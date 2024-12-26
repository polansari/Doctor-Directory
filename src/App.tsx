import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Register } from './pages/Register';
import { DoctorRegister } from './pages/DoctorRegister';
import { Login } from './pages/Login';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="register" element={<Register />} />
          <Route path="register/doctor" element={<DoctorRegister />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="dashboard/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}