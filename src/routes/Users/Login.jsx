import React, { useState,useContext } from 'react'
import { authenticate } from "../../AWS/authenticate";
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Login = () => {
    
    const Navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [loginErr,setLoginErr]=useState('');
    const [togglePass, setTogglePass] = useState(false)
	const { setUser } = useContext(AppContext);

    const formInputChange = (formField, value) => {
        if (formField === "username") {
            setUsername(value);
        }
        if (formField === "password") {
            setPassword(value);
        }
    };

    const validation = () => {
        return new Promise((resolve,reject)=>{
            if (username === '' && password === '') {
                setUsernameErr("Username is required.");
                setPasswordErr("Password is required.")
                resolve({username:"Username is required.",password:"Password is required."});
            }
            else if (username === '') {
                setUsernameErr("Username is required.")
                resolve({username:"Username is required.",password:""});
            }
            else if (password === '') {
                setPasswordErr("Password is required")
                resolve({username:"",password:"Password is required."});
            }
            else if (password.length < 8) {
                setPasswordErr("Must be 8 characters.")
                resolve({username:"",password:"Must be 8 characters."});
            }
            else{
                resolve({username:"",password:""});
            }
            reject('')
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsernameErr("");
        setPasswordErr("");
        validation()
          .then((res) => {
            if (res.username === '' && res.password === '') {
                authenticate(username,password)
                .then((data)=>{
                    setLoginErr('');
                    Navigate('/favorites');
                },
                (err)=>{
                    console.log(err);
                    setLoginErr(err.message)
                })
                .catch(err=>console.log(err))
            }
          }, 
          err => console.log(err))
          .catch(err => console.log(err));
      }
    

    return (
        <div className="h-screen flex">
            <div className="flex w-1/2 mx-auto justify-center items-center bg-white">
                <form className="bg-white" onSubmit={handleSubmit}>
                <h1 className="text-gray-800 font-bold text-2xl mb-4">Login</h1>
                <div className="flex items-center border-2 py-4 px-5 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input className="pl-2 outline-none border-none" type="text" name="username" 
                        onChange={(e)=>{formInputChange(e.target.name,e.target.value)}}
                        value={username}
                        id="username-login" placeholder="Username" />
                </div>
                <div className="flex items-center border-2 py-4 px-5 rounded-2xl">
                    {togglePass ? 
                                    <img
                                        id="password_hide"
                                        src="src/pass_icon/hide.png"
                                        alt="password_hide"
                                        className="h-6 w-6 mt-2 transform -translate-y-1 cursor-pointer"
                                        onClick={()=>{setTogglePass(false)}}
                                    />
                                    :
                                    <img
                                        id="password_view"
                                        src="src/pass_icon/view.png"
                                        alt="password_view"
                                        className="h-6 w-6 mt-2 transform -translate-y-1 cursor-pointer"
                                        onClick={()=>{setTogglePass(true)}}
                                    />
                                }
                    <input className="pl-2 outline-none border-none" type={togglePass? "text":"password"} name="password" 
                        onChange={(e)=>{formInputChange(e.target.name,e.target.value)}}
                        value={password}
                        id="password-login" placeholder="Password" />
                </div>
                <button type="submit" className="block w-full text-white-100 bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer font-bold text-gray-200">Forgot Password?</span>
                </form>
            </div>
        </div>
    )
}

export default Login;