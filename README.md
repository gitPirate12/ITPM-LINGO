# ITPM-LINGO
ITPM-LINGO is a web app developed for the ITPM assignment. It’s a translator app that includes a forum and an emoji translation feature from Sinhala to English. The application is built using the MERN stack (MongoDB, Express, React, and Node.js) and features JWT authentication for secure user access.

## Running the Project

### Installing Packages
Before running the project, ensure you have Node.js and npm (Node Package Manager) installed on your system.

1. Clone the repository to your local machine:
    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:
    ```bash
    cd ITPM-LINGO/backend
    ```

3. Install server-side dependencies:
    ```bash
    npm install
    ```

4. Navigate to the client directory:
    ```bash
    cd ITPM-LINGO/frontend
    ```

5. Install client-side dependencies:
    ```bash
    npm install
    ```

### Running the Project
After installing the necessary packages, you can run the project with the following commands:

1. Start the server:
    ```bash
    npm run dev
    ```

2. Start the client:
    ```bash
    npm run dev
    ```

## Environment Variables
Create a `.env` file in the root of your project and add the following variables for example:

```env
MONGODB_URL=mongodb+srv://aneeqshaffy7:loserboy41@itpm-db.f9mla.mongodb.net/ITPM-LINGO-DB
SECRET=ninjadojoshifuyoshimarioluigipeachbowser
JWT_SECRET=3B4D8FC6C47CEBEC
 ```


By default, the server runs on port 3040 and the client runs on port 3000. Ensure that MongoDB is running on your system. 

## ScreenShots

![Screenshot of the App](./ScreenShots/Screenshot%201.png)
![Screenshot 2](./ScreenShots/Screenshot%202.png)
![Screenshot 3](./ScreenShots/Screenshot%203.png)

## Postman API Documentation

For complete details on our API endpoints, request/response formats, and usage examples, please refer to the Postman documentation:

[ITPM-LINGO API Documentation](https://documenter.getpostman.com/view/26831435/2sAYdZsYdc)

