import logo from "./logo.svg";
import "./App.css";

import AuthPage from "./components/AuthPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Notes from "./components/Notes";
import About from "./components/About";

import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/authpage");
  };

  /*useEffect(
    () => {
      // Fetch user's notes using the stored token and populate the notes state
      console.log(isLoggedIn);
      if (isLoggedIn == true) {
        navigate("/notes");
        console.log(isLoggedIn);
      }
    },
    { isLoggedIn }
  );*/

  const navigateToNotes = () => {
    navigate("/notes");
  };
  const navigateToAbout = () => {
    navigate("/about");
  };
  return (
    <div className="App">
      <AuthPage></AuthPage>
      <button onClick={navigateToAbout}>About</button>
      <Routes>
        <Route path="/authpage" element={<AuthPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
/*


   <Notes></Notes>

   <div>
        

        <Routes>
          <Route path="/authpage" element={<AuthPage />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
      <AuthPage></AuthPage>

      <Footer></Footer> 
}*/
