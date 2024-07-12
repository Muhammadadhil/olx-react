import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import { firebaseContext } from "./store/Context";
import Context from "./store/Context";
import { app, auth, db, storage } from "./firebase/config.js";
import Post from "./store/PostContext";



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <firebaseContext.Provider value={{ app, auth, db, storage }}>
            <Context>
                <Post>
                    <App />
                </Post>
            </Context>
        </firebaseContext.Provider>
    </React.StrictMode>
);
