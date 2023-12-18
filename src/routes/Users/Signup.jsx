import React, { useState,useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import AppContext from '../../context/AppContext'
import UserPool from '../../AWS/UserPool';
import { createUser } from '../../AWS/dynamodb'

const Signup = () => {

    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [signupErr, setSignupErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [cognitoUserId, setCognitoUserId] = useState(null);
    const [cognitoUser, setCognitoUser] = useState(null);
    const [confirmationCode, setConfirmationCode] = useState("");
    const [registrationPending, setRegistrationPending] = useState(false);
    const [togglePass, setTogglePass] = useState(false)

    useEffect(() => {
        // If user is already logged in, redirect to the home page
        if (user) {
            navigate('/favorites'); // or the desired route
        }
    }, [user, navigate]);

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
                // alert('User Added Successfully');
                navigate('/favorites');
            }
        );
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     setUsernameErr("");
    //     setEmailErr("");
    //     setPasswordErr("");
    //     validation()
    //     .then((res) => {
    //         if (res.username === '' && res.password === '' && res.email === '') {
    //             const attributeList = [];
    //             attributeList.push(
    //                 new CognitoUserAttribute({
    //                     Name: 'email',
    //                     Value: email,
    //                 })
    //             );
                
    //             UserPool.signUp(username, password, attributeList, null, (err, data) => {
    //                 if (err) {
    //                     console.log(err);
    //                     JSON.stringify(err);
    //                     // alert("Couldn't sign up");
    //                     const errorMessage = err.message.split(': ')[1];

    //                     setSignupErr(errorMessage);
    //                 } 
    //                 else {
    //                     console.log(data);
    //                     setCognitoUser(new CognitoUser({
    //                         Username: username,
    //                         Pool: UserPool,
    //                     }));
    //                     setUser({username: username})
    //                     setRegistrationPending(true);
    //                     // setCognitoUserId(data.userSub);
    //                     // alert('User Added Successfully');
    //                     // Navigate('/favorites');
    //                 }
    //             });
    //         }
    //     }, 
    //     err => console.log(err))
    //     .catch(err => console.log(err));
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameErr("");
        setEmailErr("");
        setPasswordErr("");
      
        try {
          const res = await validation();
          if (res.username === '' && res.password === '' && res.email === '') {
            const attributeList = [
              new CognitoUserAttribute({
                Name: 'email',
                Value: email,
              }),
            ];
      
            const signUpPromise = () =>
              new Promise((resolve, reject) => {
                UserPool.signUp(username, password, attributeList, null, (err, data) => {
                  if (err) {
                    console.log(err);
                    JSON.stringify(err);
                    // alert("Couldn't sign up");
                    const errorMessage = err.message.split(': ')[1];
                    setSignupErr(errorMessage);
                    reject(err);
                  } 
                  else {
                    console.log(data);
                    setCognitoUser(new CognitoUser({
                      Username: username,
                      Pool: UserPool,
                    }));

                    setUser({ username: username });
                    setRegistrationPending(true);
                    setCognitoUserId(data.userSub);
                    resolve(data);
                  };
                });
              });
            const data = await signUpPromise();
            await createUser(username, password, email, data.userSub);
          }
        } catch (err) {
          console.error('Error:', err);
        }
      };
      
    //   const handleSignUp = async () => {
    
    //     if (!username) {
    //       return; 
    //     }
        
    //     try {
    //       await createUser(username, password, email, cognitoUserId);
    //     } catch (err) {
    //       console.error('Error:', err); 
    //     }
    //   };

    //   const handleNewUserSignup = async (e) => {
    //     e.preventDefault();
    //     try {
    //       handleSubmit();
    //       console.log(`Cognito userId: ${cognitoUserId}`)
    //       await handleSignUp();
    
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
      


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
                <form onSubmit={handleSubmit} id="SignUp-Form">
                    <h1 className="text-gray-800 font-bold text-2xl mb-4">Sign Up</h1>
                    {signupErr && <p className="text-red-600 mt-1 -mb-1">{signupErr}</p>}
                    <div className="flex items-center border-2 py-4 px-5 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="text" name="username" 
                            onChange = {(e)=>{
                                formInputChange(e.target.name,e.target.value)}}
                            value = {username} id="username-signup" placeholder="Username" />
                    </div>
                    {usernameErr && <p className="text-red-600 mb-2 -mt-2">{usernameErr}</p>}
                    <div className="flex items-center border-2 py-4 px-5 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="text" name="email" 
                            onChange = {(e)=>{
                                formInputChange(e.target.name,e.target.value)}}
                            value = {email} id="email-signup" placeholder="Email" />
                    </div>
                    {emailErr && <p className="text-red-600 mb-2 -mt-2">{emailErr}</p>}
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
                        <input className="pl-2 outline-none border-none" type={togglePass ? "text":"password"} name="password" 
                            onChange = {(e)=>{
                                formInputChange(e.target.name,e.target.value)}}
                            value = {password} id="password-signup" placeholder="Password" />
                    </div>
                    {passwordErr && <p className="text-red-600 mt-1 -mb-1">{passwordErr}</p>}
                    <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white-100 font-semibold mb-2">Sign Up</button>
                    <a href='/login' className="text-blue-600 font-bold text-1x1  hover:underline cursor-pointer">Already have an account?</a>
                </form>
            </div>}
        </div>
    )
}

export default Signup;

const Confirmation = ({ submitConfirmationCode, confirmationCode, handleConfirmationCode }) =>{
    return (
        <div className="flex w-1/2 mx-auto justify-center items-center bg-white">
            <form onSubmit={submitConfirmationCode} id="Confirmation-Code">
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