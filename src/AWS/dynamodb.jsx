import AWS from 'aws-sdk';

const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

AWS.config.update({
    region: "us-east-1",
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const createUser = async (username,password,email,cognitoUserId) => {
    const params = {
      TableName: "Users",
      Item: {
        userID: cognitoUserId,
        username: username,
        email: email,
        password: password,
      }
    };

    try {
      await dynamoDb.put(params).promise();
      console.log(`User with ID: ${cognitoUserId} and Username: ${username} added.`);
    } catch (err) {
      console.error("Unable to add user", JSON.stringify(err, null, 2));
    }
  };