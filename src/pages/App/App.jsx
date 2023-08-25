import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import ProfileAvtar from "../ProfileAvtar/ProfileAvtar";
import NavBar from "../../components/NavBar/NavBar";
import SideBarMenu from "../../components/HomePage/SideBarMenu";
import ChatWindow from "../../components/HomePage/ChatWindow/ChatWindow";
import "./App.css";
import SingleTaskDetails from "../../components/HomePage/SingleTaskDetails";

function App() {
  const [user, setUser] = useState(getUser());
  console.log(user);

  return (
    <main className="App">
      {user ? (
        <>
          <div className="page-wrapper">
            <div className="chat-main-row">
              <div className="chat-main-wrapper">
                <ChatWindow />
                <SingleTaskDetails />
              </div>
            </div>
          </div>
          <NavBar user={user} setUser={setUser} />
          <SideBarMenu user={user} />
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