import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../store/Context";


function Header() {

    const {user}=useContext(AuthContext);
    const navigate =useNavigate();

    useEffect(()=>{
        console.log('userDetails:',user);
    })

    const logout=async ()=>{
        signOut(auth);
        navigate('/');
    }

    const handleLoginClick=async ()=>{
        navigate('/login')
    }

    return (
        <div className="headerParentDiv">
            <div className="headerChildDiv">
                <div className="brandName">
                    <OlxLogo/>
                </div>
                <div className="placeSearch">
                    <Search></Search>
                    <input type="text" />
                    <Arrow></Arrow>
                </div>
                <div className="productSearch">
                    <div className="input">
                        <input type="text" placeholder="Find car,mobile phone and more..." />
                    </div>
                    <div className="searchAction">
                        <Search color="#ffffff"></Search>
                    </div>
                </div>
                <div className="language">
                    <span> ENGLISH </span>
                    <Arrow></Arrow>
                </div>
                <div className="loginPage">
                    <span onClick={!user?handleLoginClick:''}>{user ? `welcome ${user.displayName}` : "Login"}</span>
                    <hr />
                </div>
                {user ? <button onClick={logout}>Logout</button> : ""}

                <div className="sellMenu">
                    <SellButton></SellButton>
                    <div className="sellMenuContent">
                        <SellButtonPlus></SellButtonPlus>
                        <span>SELL</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default Header;
