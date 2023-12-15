import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

export const authenticate = async ({ Username, Password })=>{

    console.log("Username:", Username);
    console.log("UserPool:", UserPool);
    return new Promise((resolve,reject)=>{
        const cognitoUser = new CognitoUser({
            Username:Username,
            Pool:UserPool
        });

        const authDetails = new AuthenticationDetails({
            Username: Username,
            Password: Password
        });
        
        cognitoUser.authenticateUser(authDetails,{
            onSuccess:(session)=>{
                console.log("login successful");
                // resolve(result);
                resolve({
                    username: cognitoUser.getUsername(),
                    idToken: session.getIdToken().getJwtToken(),
                    accessToken: session.getAccessToken().getJwtToken(),
                    refreshToken: session.getRefreshToken().getToken(),
                });
                // console.log(session)

            },
            onFailure:(err)=>{
                console.log("login failed",err);
                reject(err);
            }
        });
    });
};


export const logout = () => {
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser){
        cognitoUser.signOut();
        window.location.href = '/';
    }
    else{
        console.log('Logout Error.')
    }
};
