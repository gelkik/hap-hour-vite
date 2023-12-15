import AWS from 'aws-sdk';

const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;

AWS.config.update({
    region: "us-east-1",
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });

// Create a DynamoDB DocumentClient
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Example: PutItem
const params = {
  TableName: 'Users',
  Item: {
    userId: 'uniqueUserId',
    username: 'john_doe',
    email: 'john@example.com',
    // other attributes
  },
};

dynamoDb.put(params, (err, data) => {
  if (err) {
    console.error('Unable to add user', err);
  } else {
    console.log('User added successfully', data);
  }
});
