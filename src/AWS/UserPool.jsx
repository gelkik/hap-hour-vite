import { CognitoUserPool } from "amazon-cognito-identity-js";

// const poolData = {
// 	UserPoolId: process.env.VITE_USER_POOL_ID,
// 	ClientId: process.env.VITE_CLIENT_ID,
// };

const poolData = {
	UserPoolId: import.meta.env.VITE_USER_POOL_ID,
	ClientId: import.meta.env.VITE_CLIENT_ID,
};

export default new CognitoUserPool(poolData);