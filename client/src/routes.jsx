import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { NotesPage } from "./pages/NotesPage";

// Protegemos las rutas para evitar que usuarios no autenticados accedan
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/notes" element={<PrivateRoute><NotesPage /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};