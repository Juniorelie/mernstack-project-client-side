import "./App.css";
import { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";
import IsLoggedOut from "./components/Routing/IsLoggedOut";
import IsLoggedIn from "./components/Routing/IsLoggedIn";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route element={<IsLoggedOut />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<IsLoggedIn />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
