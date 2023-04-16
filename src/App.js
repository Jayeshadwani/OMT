import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"
import Login from "./Components/Login";
import Orders from "./Components/Orders";
import { useState } from "react";

function App() {
  const [isAuthUser,setIsAuthUser] = useState()
  const [isLoggedIn,setIsLoggedIn] = useState(false) 
  return (
    <>      
        <Router>
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} isAuthUser={isAuthUser} setIsAuthUser={setIsAuthUser}  />}></Route>
            <Route path="/orders" element={<Orders isLoggedIn={isLoggedIn} />}></Route>
            <Route path="*" element={<Navigate to="/login"/>}></Route>
          </Routes>
        </Router>
    </>
  );
}

export default App;
