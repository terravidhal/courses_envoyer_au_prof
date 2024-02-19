import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import HomePage from "./views/HomePage/HomePage";
import CreatePage from "./views/CreatePage/CreatePage";
import UpdatePage from "./views/UpdatePage/UpdatePage";
import DetailsPage from "./views/DetailsPage/DetailsPage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Cookies from "universal-cookie";






function App() {
  const cookies = new Cookies();
  const userObjs = cookies.get("USER_OBJ");
  
  const userObj = JSON.parse(localStorage.getItem("USER_OBJ"));
  console.log("cookies+++++++++", userObj);
 
 const userInfo = userObj ? userObj : null;
 // State Hooks
 const [user, setUser] = useState(userInfo);
 // console.log("userDetails+++++++++", user);


 
//  useEffect(() => {
//   setUser(userInfo) }
//  , [])

  return (
    <div className="App">
       <h1>Favorite courses</h1>
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<Navigate replace to="/register_page"  />} />  {/* redirection */}
           <Route path="/register_page" element={<Register />} />
           <Route path="/login_page" element={<Login />} />
           <Route path="/courses" element={<HomePage />} />
           <Route path="/courses/new" element={<CreatePage />} />
           <Route path="/courses/edit/:id" element={<UpdatePage />}/>
           <Route path="/courses/:id" element={<DetailsPage />}/>
           {/* {!user ?
             <Route path="/register_page" element={<Register />} /> :
             <Route path="/register_page" element={<Navigate replace to="/courses"  />} />
           }
           {!user ?
             <Route path="/login_page" element={<Login />} /> :
             <Route path="/login_page" element={<Navigate replace to="/courses"  />} />
           }
           {user ?
             <Route path="/courses" element={<HomePage />} /> :
             <Route path="/courses" element={<Navigate replace to="/login_page"  />} />
           }
           {user ?
             <Route path="/courses/new" element={<CreatePage />} /> :
             <Route path="/courses/new" element={<Navigate replace to="/login_page"  />} />
           }
           {user ?
             <Route path="/courses/edit/:id" element={<UpdatePage />}/> :
             <Route path="/courses/edit/:id" element={<Navigate replace to="/login_page"  />} />
           } */}
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
