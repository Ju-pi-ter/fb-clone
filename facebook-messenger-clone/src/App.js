import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import Chats from "./components/Chats";

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/chats" element={<Chats/>} />
          <Route path="/" element={<Login />} />
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
