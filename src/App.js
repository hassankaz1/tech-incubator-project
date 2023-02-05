import logo from './logo.svg';
import './App.css';
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import Navbar from './Navbar/Navbar';
import CreateTask from './CreateTask/CreateTask';
import ViewProjects from './ViewTasks/ViewTasks';

export const AuthContext = createContext(null);

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setCurrentUser(user)
        console.log(user)
        // ...
      } else {
        setCurrentUser(null);
      }
    });
    // app.auth().onAuthStateChanged((user) => {

    // });
  }, []);





  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create-task' element={<CreateTask />}></Route>
        <Route path='/view-task' element={<ViewProjects />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
