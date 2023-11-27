import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

import UserPool from '../../AWS/UserPool';

const Signup = () => {

    // const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
    // const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

    const Navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const [togglePass, setTogglePass] = useState(false)

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
        e.preventDefault()
        setUsernameErr("");
        setPasswordErr("");
        validation()
        .then((res) => {
            if (res.username === '' && res.password === '') {
                const attributeList = [];
                attributeList.push(
                    new CognitoUserAttribute({
                        Name: 'username',
                        Value: username,
                    })
                );
                let username=username;
                UserPool.signUp(username, password, attributeList, null, (err, data) => {
                    if (err) {
                        console.log(err);
                        alert("Couldn't sign up");
                    } 
                    else {
                        console.log(data);
                        alert('User Added Successfully');
                        Navigate('/favorites');
                    }
                });
            }
        }, err => console.log(err))
        .catch(err => console.log(err));
    }

    return (
        <div class="h-screen flex">
            <div class="flex w-1/2 mx-auto justify-center items-center bg-white">
                <form>
                    <h1 class="text-gray-800 font-bold text-2xl mb-4">Sign Up</h1>
                    <div class="flex items-center border-2 py-4 px-5 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="username" 
                            onChange = {(e)=>{
                                formInputChange(e.target.name,e.target.value)}}
                            value = {username} id="" placeholder="Username or Email" />
                    </div>
                    <div class="flex items-center border-2 py-4 px-5 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type={togglePass ? "text":"password"} name="password" 
                            onChange = {(e)=>{
                                formInputChange(e.target.name,e.target.value)}}
                            value = {password} id="" placeholder="Password" />
                            {togglePass ? 
                                <img
                                    id="password_hide"
                                    src="src/pass_icon/hide.png"
                                    alt="password_hide"
                                    class="h-6 w-6 transform -translate-y-1 cursor-pointer"
                                />
                                :
                                <img
                                    id="password_view"
                                    src="src/pass_icon/view.png"
                                    alt="password_view"
                                    class="h-6 w-6 transform -translate-y-1 cursor-pointer"
                                />
                            }
                    </div>
                    <button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2" onClick={handleClick}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;