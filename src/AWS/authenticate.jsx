import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

export const authenticate = async ({ Username, Password })=>{
    return await new Promise((resolve,reject)=>{
        const params = new CognitoUser({
            Username:Username,
            Pool:UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username:Username,
            Password
        });

        params.authenticateUser(authDetails,{
            onSuccess:(result)=>{
                console.log("login successful");
                resolve(result);
            },
            onFailure:(err)=>{
                console.log("login failed",err);
                reject(err);
            }
        });
    });
};


export const logout = () => {
    const params = UserPool.getCurrentUser();
    params.signOut();
    window.location.href = '/';
};
