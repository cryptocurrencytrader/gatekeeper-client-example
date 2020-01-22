[<img src="https://avatars0.githubusercontent.com/u/29264727?s=200&v=4" alt="Wow" width="64"/>](https://www.bitcointrade.com.br/)  

# Gatekeeper Client Example

Gatekeeper client example written in Node.js.

## Dependencies

- [Node.js +8.10.0](https://nodejs.org/en/)

## Installation

Make sure Node.js (and npm) is installed.  
Go to the project root and run the following command:

```sh
npm install
```

## Running the project

To run the project you need to setup a dotenv file (`.env`).

File example:

```
CLIENT_ID=U2FsdGVkX1+7ftuvNqJYYkkMTtejtuyRYB/1JL8yQbk=
CLIENT_SECRET=change_123
GATEKEEPER_URL=http://localhost:5000
SCOPES=user_balance,user_profile
```

After setting up the file, run the following command inside the project folder:

```sh
npm start
```
