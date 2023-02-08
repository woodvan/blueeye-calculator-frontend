import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "./containers/SignUpPage";
import SignInPage from "./containers/SignInPage";
import HomePage from "./containers/HomePage";
import NotFoundPage from "./containers/NotFoundPage";

function App() {
  const [currentUser, setCurrentUser] = useState("as");

  return (
    <Routes>
      <Route
        path="//*"
        element={currentUser ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<NotFoundPage/>}
      />
      <Route
        path="/register"
        element={currentUser ? <Navigate to="/" /> : <SignUpPage />}
      />
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <SignInPage />}
      />
    </Routes>
  );
}

export default App;
