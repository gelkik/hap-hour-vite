import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

export const authenticate = async ({ Username, Password })=>{

    // console.log("Username:", Username);
    // console.log("UserPool:", UserPool);
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
        
        // cognitoUser.signOut = () => {
        //     cognitoUser.globalSignOut({
        //         onSuccess: () => {
        //             console.log("Logout successful");
        //             window.location.href = '/login';
        //         },
        //         onFailure: (err) => {
        //             console.log("Logout failed", err);
        //             window.location.href = '/login';
        //         },
        //     });
        // };

        // cognitoUser.logout = cognitoUser.signOut;
    });
    
};

export const logout = async () => {
    const user = UserPool.getCurrentUser();
    if (user) {
        user.signOut();
        window.location.href = '/login';
    }
    else {
        console.log('Logout Error.')
    }
};


// export const logout = () => {
//     const cognitoUser = UserPool.getCurrentUser();
//     console.log(cognitoUser)
//     if (cognitoUser){
//         // cognitoUser.signOut();
//         // window.location.href = '/';
//         cognitoUser.signOut(() => {
//             window.location.href = '/';
//         });
//     }
//     else{
//         console.log('Logout Error.')
//     }
// };
