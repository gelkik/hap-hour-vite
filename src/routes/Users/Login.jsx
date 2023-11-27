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
        <div className="bg-gray-100 h-screen flex  justify-center">
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

{/* <div class="h-auto">
            <div class="flex w-1/2 mx-auto justify-center items-center bg-white">
                <form class="bg-white">
                <h1 class="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                <p class="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Username or Email" />
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                    <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" />
                </div>
                <button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password?</span>
                </form>
            </div>
        </div> */}

export default Login;