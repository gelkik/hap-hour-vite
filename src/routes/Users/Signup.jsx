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
        <h1>Signup</h1>
    )
}

export default Signup;