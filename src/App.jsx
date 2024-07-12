import { useEffect, useContext } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext, firebaseContext } from "./store/Context";
import { onAuthStateChanged } from "firebase/auth";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";

function App() {
    const { user, setUser } = useContext(AuthContext);
    const { auth } = useContext(firebaseContext);

    useEffect(() => {
        console.log("user from context:", user);
        onAuthStateChanged(auth, async (user) => {
            setUser(user);
        });
    });

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/post" element={<Create />} />
                    <Route path="/viewpost" element={<View />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
