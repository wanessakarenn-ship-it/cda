import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import { LoginPage } from '../pages/LoginPage';
import { AvaliacaoPage } from '../pages/AvaliacaoPage';

// Cast para contornar o erro de JSX do React 18
const Router = BrowserRouter as any;
const RoutesContainer = Routes as any;
const RouteItem = Route as any;

export const AppRoutes = () => {
  return (
    <Router>
      <RoutesContainer>
        {/* Rota pública */}
        <RouteItem path="/login" element={<LoginPage />} />
        
        {/* Rota protegida inicial */}
        <RouteItem path="/" element={<AvaliacaoPage />} />

        {/* Redirecionamento de segurança */}
        <RouteItem path="*" element={<Navigate to="/login" />} />
      </RoutesContainer>
    </Router>
  );
};