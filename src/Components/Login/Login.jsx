import {useState} from "react";
import Logo from "../../assets/olx-logo.png";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseContext } from "../../store/Context";
import { useContext } from "react";
// import {useHistory} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'


function Login() {

    const [email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const {auth}=useContext(firebaseContext);
    const navigate=useNavigate();

    const login=async (event)=>{
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth,email,password); 
            navigate('/');
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    return (
        <div>
            <div className="loginParentDiv">
                <img width="200px" height="200px" src={Logo}></img>
                <form onSubmit={login}>
                    <label htmlFor="fname">Email</label>
                    <br />
                    <input className="input" type="email" id="fname" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label htmlFor="lname">Password</label>
                    <br />
                    <input className="input" type="password" id="lname" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <br />
                    <button>Login</button>
                </form>
                <a>Signup</a>
            </div>
        </div>
    );
}

export default Login;
