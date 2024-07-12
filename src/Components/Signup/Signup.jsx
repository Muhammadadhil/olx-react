
import { useState,useContext} from "react";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import Logo from "../../assets/olx-logo.png";
import "./Signup.css";
import { firebaseContext } from "../../store/Context";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [userName,setUserName]=useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const {auth,db}=useContext(firebaseContext); 
    const navigate=useNavigate();    

    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log("firebaseContext:", firebase);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;

            await updateProfile(user,{
                displayName:userName
            })

            await addDoc(collection(db, "users"), {
                uid: user.uid,
                userName: userName,
                phone: phone,
            });
            navigate('/');
            
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <div className="signupParentDiv">
                <img width="200px" height="200px" src={Logo} alt="olx logo"></img>
                <form onSubmit={handleSubmit} >
                    <label htmlFor="fname">Username</label>
                    <br />
                    <input value={userName} onChange={(e) => setUserName(e.target.value)} className="input" type="text" id="fname" name="name" defaultValue="John" />
                    <br />
                    <label htmlFor="fname">Email</label>
                    <br />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="input" type="email" id="fname" name="email" defaultValue="John" />
                    <br />
                    <label htmlFor="lname">Phone</label>
                    <br />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input" type="number" id="lname" name="phone" defaultValue="Doe" />
                    <br />
                    <label htmlFor="lname">Password</label>
                    <br />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="input" type="password" id="lname" name="password" defaultValue="Doe" />
                    <br />
                    <br />
                    <button>Signup</button>
                </form>
                <a>Login</a>
            </div>
        </div>
    );
}
