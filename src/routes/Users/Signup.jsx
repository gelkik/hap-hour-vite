import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

import UserPool from '../../AWS/UserPool';

const Signup = () => {

    const Navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [cognitoUser, setCognitoUser] = useState(null);
    const [confirmationCode, setConfirmationCode] = useState("");
    const [registrationPending, setRegistrationPending] = useState(false);

    const [togglePass, setTogglePass] = useState(false)

    const formInputChange = (formField, value) => {
        if (formField === "username") {
            setUsername(value);
        }
        if (formField === "password") {
            setPassword(value);
        }
        if (formField === "email") {
            setEmail(value);
        }
    };


    const validation = () => {
        return new Promise((resolve,reject)=>{
            if (username === '' && password === '' && email === '') {
                setUsernameErr("Username is required.");
                setPasswordErr("Password is required.")
                resolve({username:"Username is required.",password:"Password is required.",email:""});
            }
            else if (username === '') {
                setUsernameErr("Username is required.")
                resolve({username:"Username is required.",password:"",email:""});
            }
            else if (email === '') {
                setEmailErr("Email is required")
                resolve({username:"",password:"",email:"Email is required"});
            }
            else if (password === '') {
                setPasswordErr("Password is required")
                resolve({username:"",password:"Password is required.",email:""});
            }
            else if (password.length < 8) {
                setPasswordErr("Must be 8 characters.")
                resolve({username:"",password:"Must be 8 characters.",email:""});
            }
            else{
                resolve({username:"",password:"",email:""});
            }
            reject('')
        });
    };

    const handleConfirmationCode = (e) => {
        setConfirmationCode(e.target.value);
    };

    const submitConfirmationCode = (e) => {
        e.preventDefault();
        cognitoUser.confirmRegistration(
            confirmationCode,
            true,
            function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Confirmation successful:", result);
                alert('User Added Successfully');
                Navigate('/favorites');
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setUsernameErr("");
        setEmailErr("");
        setPasswordErr("");
        validation()
        .then((res) => {
            if (res.username === '' && res.password === '' && res.email === '') {
                const attributeList = [];
                attributeList.push(
                    new CognitoUserAttribute({
                        Name: 'email',
                        Value: email,
                    })
                );
                
                // let username = email
                UserPool.signUp(username, password, attributeList, null, (err, data) => {
                    if (err) {
                        console.log(err);
                        JSON.stringify(err);
                        alert("Couldn't sign up");
                    } 
                    else {
                        console.log(data);
                        setCognitoUser(new CognitoUser({
                            Username: username,
                            Pool: UserPool,
                        }));
                        setRegistrationPending(true);
                        // alert('User Added Successfully');
                        // Navigate('/favorites');
                    }
                });
            }
        }, 
        err => console.log(err))
        .catch(err => console.log(err));
    }

    return (
        <div className="h-screen flex">
            {registrationPending ? 
            <Confirmation
                submitConfirmationCode = {submitConfirmationCode} 
                confirmationCode={confirmationCode}
                handleConfirmationCode={handleConfirmationCode}
            />
            : 
            <div className="flex w-1/2 mx-auto justify-center items-center bg-white">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-gray-800 font-bold text-2xl mb-4">Sign Up</h1>
                    <div className="flex items-center border-2 py-4 px-5 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="text" name="username" 
                            onChange = {(e)=>{
                                formInputChange(e.target.name,e.target.value)}}
                            value = {username} id="" placeholder="Username" />
                    </div>
                            {usernameErr && <p className="text-red-600 mb-2 -mt-2">{usernameErr}</p>}
                    <div className="flex items-center border-2 py-4 px-5 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="text" name="email" 
                            onChange = {(e)=>{
                                formInputChange(e.target.name,e.target.value)}}
                            value = {email} id="" placeholder="Email" />
                    </div>
                            {emailErr && <p className="text-red-600 mb-2 -mt-2">{emailErr}</p>}
                    <div className="flex items-center border-2 py-4 px-5 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type={togglePass ? "text":"password"} name="password" 
                            onChange = {(e)=>{
                                formInputChange(e.target.name,e.target.value)}}
                            value = {password} id="" placeholder="Password" />
                            {togglePass ? 
                                <img
                                    id="password_hide"
                                    src="src/pass_icon/hide.png"
                                    alt="password_hide"
                                    className="h-6 w-6 transform -translate-y-1 cursor-pointer"
                                    onClick={()=>{setTogglePass(false)}}
                                />
                                :
                                <img
                                    id="password_view"
                                    src="src/pass_icon/view.png"
                                    alt="password_view"
                                    className="h-6 w-6 transform -translate-y-1 cursor-pointer"
                                    onClick={()=>{setTogglePass(true)}}
                                />
                            }
                    </div>
                    {passwordErr && <p className="text-red-600 mt-1 -mb-1">{passwordErr}</p>}
                    <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white-100 font-semibold mb-2">Sign Up</button>
                    <a href='/login' className="text-gray-200 font-bold text-1x1 hover:underline">Already have an account?</a>
                </form>
            </div>}
        </div>
    )
}

export default Signup;

const Confirmation = ({ submitConfirmationCode, confirmationCode, handleConfirmationCode }) =>{
    return (
        <div className="flex w-1/2 mx-auto justify-center items-center bg-white">
            <form onSubmit={submitConfirmationCode}>
                <h1 className="text-gray-800 font-bold text-2xl mb-4">Enter Confirmation Code</h1>
                <div className="flex items-center border-2 py-4 px-5 rounded-2xl mb-4">
                    <input className="pl-2 outline-none border-none" type="text" name="confirmationCode" placeholder="Confirmation Code" 
                        onChange = {handleConfirmationCode}
                        value = {confirmationCode} />
                </div>
                <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white-100 font-semibold mb-2">Submit</button>
            </form>
        </div>
    )
}