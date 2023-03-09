
import React from "react";
import "./index.css";
import { BrowserRouter , Route, Routes } from "react-router-dom";


import { AuthProvider } from "./context/AuthProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./views/loginPage";
import Home from "./views/homePage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path="/protected" element={<PrivateRoute/>}>
              <Route element={<ProtectedPage/>} path="/protected" />
            </Route>
            <Route element={<LoginPage/>} path="/login" />
            <Route element={<Register/>} path="/register" />
            <Route element={<Home/>} path="/" />
          </Routes>
        </AuthProvider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
