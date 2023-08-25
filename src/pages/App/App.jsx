//file: src/pages/App.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import LoginPage from "../LoginPage/LoginPage";
import ProfileAvtar from "../ProfileAvtar/ProfileAvtar";
import NavBar from "../../components/NavBar/NavBar";
import SideBarMenu from "../../components/HomePage/SideBarMenu";

import ChatWindow from "../../components/HomePage/ChatWindow/ChatWindow";

import "./App.css";
import SingleTaskDetails from "../../components/HomePage/SingleTaskDetails";


function App() {

  const [user, setUser] = useState(getUser());
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  console.log(user);

  return (
    <main className="App">
      {user ? (
        <>
          <div class="page-wrapper">
            <div class="chat-main-row">
              <div class="chat-main-wrapper">
                <ChatWindow selectedTaskId={selectedTaskId} setSelectedTaskId={setSelectedTaskId} isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} />
                <SingleTaskDetails selectedTaskId={selectedTaskId} isDetailsVisible={isDetailsVisible} setIsDetailsVisible={setIsDetailsVisible} />
              </div>
            </div>
          </div>
          <NavBar user={user} setUser={setUser} />
          <SideBarMenu />
          <Routes>
            {/* Route components in here */}
            <Route path="/profile/new" element={<ProfileAvtar />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
