import React from "react";

import { Auth } from 'aws-amplify';

const signUp = async () => {
  try {
    await Auth.signUp({
      username: 'user@example.com',
      password: 'password',
      attributes: {
        email: 'user@example.com',
        // Add additional attributes as needed
      },
    });
    console.log('Sign up successful');
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

// Sign in a user
const signIn = async () => {
  try {
    await Auth.signIn('user@example.com', 'password');
    console.log('Sign in successful');
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

// Sign out a user
const signOut = async () => {
  try {
    await Auth.signOut();
    console.log('Sign out successful');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};


const Signup = () => {
    return (
        <h1>Signup</h1>
    )
}

export default Signup;