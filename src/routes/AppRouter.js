import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../components/Login";

import { Dashboard } from './DashboardRouter';
import { PrivateRoute } from "./PrivateRouter";
import { PublicRoute } from './PublicRouter';
export const AppRouter = () => {
  return (
    <BrowserRouter>
            
    <Routes>
        
  
        <Route path="/login" element={
            <PublicRoute>
                <Login />
            </PublicRoute>
        } 
        />
        

        <Route path="/*" element={ 
                <PrivateRoute>
                    <Dashboard />
                </PrivateRoute>
            } 
        />


    </Routes>
</BrowserRouter>
  );
};
