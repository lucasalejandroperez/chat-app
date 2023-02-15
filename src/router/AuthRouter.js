import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';

import '../css/login-register.css';

export const AuthRouter = () => {
  return (

    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100 p-t-50 p-b-90">
            <Routes>
                {/* en AppRouter tenemos /auth/* que  va manejar las rutas anidadas */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/auth/login" />} />
            </Routes>
            </div>
        </div>
    </div>
  )
}
