import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "./containers/SignUpPage";
import SignInPage from "./containers/SignInPage";
import HomePage from "./containers/HomePage";
import NotFoundPage from "./containers/NotFoundPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocalStorageService from './utils/LocalStorageService';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(()=>{
    const access_token = LocalStorageService.loadState('access_token');
    if (access_token) {
      setAuthenticated(true);
    }
  }, []);
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="//*"
          element={authenticated ? <HomePage setAuthenticated={setAuthenticated}/> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<NotFoundPage/>}
        />
        <Route
          path="/register"
          element={authenticated ? <Navigate to="/" /> : <SignUpPage />}
        />
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/" /> : <SignInPage setAuthenticated={setAuthenticated}/>}
        />
      </Routes>
      <ToastContainer/>
    </React.Fragment>
  );
}

export default App;
