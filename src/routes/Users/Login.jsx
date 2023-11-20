import React, { useState } from 'react'
import { authenticate } from "../../AWS/authenticate";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const Navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [loginErr,setLoginErr]=useState('');

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

    const handleClick = (e) => {
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
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={(e) => {
                    handleClick(e);
                }}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;