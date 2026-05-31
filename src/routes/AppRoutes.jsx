import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

import { Login } from "../views/Login";
import { Register } from "../views/Register";
import { Home } from "../views/Home";
import { PetDetails } from "../views/PetDetails";
import { Favorites } from "../views/Favorites";
import { CreatePet } from "../views/CreatePet"; 

const PrivateRoute = ({ children }) => {
  const { signed, loadingSession } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingSession && !signed) {
      navigate("/login");
    }
  }, [signed, loadingSession, navigate]);

  if (loadingSession) {
    return <div className="splash-screen">Carregando Sessão...</div>;
  }

  return signed ? children : null;
};

const PublicRoute = ({ children }) => {
  const { signed, loadingSession } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loadingSession && signed) {
      navigate("/home");
    }
  }, [signed, loadingSession, navigate]);

  if (loadingSession) {
    return <div className="splash-screen">Carregando...</div>;
  }

  return !signed ? children : null;
};

const RootRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, [navigate]);
  return null;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/pet/:id" 
          element={
            <PrivateRoute>
              <PetDetails />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/create-pet" 
          element={
            <PrivateRoute>
              <CreatePet />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};