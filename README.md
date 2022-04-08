# Casino Platform [![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

Front-End side of the Casino Platform @ Haaga-Helia Project course 2.


## Directory Layout

```bash
  Front-End #Miscellaneous
|   .env
|   .gitignore
|   LICENSE
|   package.json
|   README.md
|   yarn.lock
|   
+---.github #Run test suites
|   \---workflows
|           node.js.yml
|                      
+---public #Public files to be used from public/index.html 
|   |   favicon.ico
|   |   index.html
|   |   logo192.png
|   |   logo512.png
|   |   manifest.json
|   |   robots.txt
|   |   
|   \---assets
|           bet.svg
|           chips.svg
|           freeseat.png
|           pokerbg.jpg
|           table.svg
|           
\---src #Files to be processed by webpack 
    |  | App.css
    |  | App.js
    |  | App.test.js
    |  | index.css
    |  | index.js
    |  | logo.svg
    |  | reportWebVitals.js
    |  | service-worker.js
    |  | serviceWorkerRegistration.js
    |  | setupTests.js
    |  |
    |  \---test #Test suites
    |		  App.test.js
    |  
    +---components #User actions on main page
    |       AppbarWithMenu.js
    |       Deposit.js
    |       Game.js
    |       Games.js
    |       Login.js
    |       Register.js
    |       
    +---holdem #Texas Holdem table
    |   |   Holdem.css
    |   |   index.js
    |   |   
    |   +---components #Rendering user and his actions
    |   |       Alert.js
    |   |       Buy.js
    |   |       Player.js
    |   |       
    |   \---services 
    |           socket.js #socket.io connection
    |           
    +---services #Api and user data related to state management
    |       Api.js
    |       User.js
    |       
    \---store #State management files
        |   index.js
        |   
        +---actions
        |       index.js
        |       
        +---constants
        |       index.js
        |       
        \---reducers
                index.js
```


## Authors

- [@S1nd5](https://www.github.com/s1nd5)
- [@PutkisDude](https://www.github.com/PutkisDude)
- [@otsojm](https://www.github.com/otsojm)
- [@Danquu](https://www.github.com/Danquu)
- [@RiikonenMiro](https://www.github.com/RiikonenMiro)


## Demo

- [Main Page](https://casinohaaga.awsproject.link)


## Features

- React.js and Material-UI.
- Game listing page, Login, register and deposit forms.
- Texas Holdem table with socket.io connection.


# Dependencies

```bash
"dependencies": {
    "@emotion/react": "^11.7.1",
    "@emotion/styled": "^11.6.0",
    "@heruka_urgyen/react-playing-cards": "^0.5.0",
    "@material-ui/core": "^4.12.3",
    "@mui/icons-material": "^5.3.1",
    "@mui/material": "^5.4.0",
    "@mui/styled-engine-sc": "^5.3.0",
    "@reduxjs/toolkit": "^1.7.2",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^0.25.0",
    "dotenv": "^16.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-free-playing-cards": "^0.4.2",
    "react-redux": "^7.2.6",
    "react-router-dom": "^6.2.1",
    "react-scripts": "^5.0.0",
    "recoil": "^0.6.1",
    "recoil-persist": "^4.0.0",
    "socket.io-client": "^4.4.1",
    "styled-components": "^5.3.3",
    "web-vitals": "^0.2.4",
    "workbox-background-sync": "^5.1.3",
    "workbox-broadcast-update": "^5.1.3",
    "workbox-cacheable-response": "^5.1.3",
    "workbox-core": "^5.1.3",
    "workbox-expiration": "^5.1.3",
    "workbox-google-analytics": "^5.1.3",
    "workbox-navigation-preload": "^5.1.3",
    "workbox-precaching": "^5.1.3",
    "workbox-range-requests": "^5.1.3",
    "workbox-routing": "^5.1.3",
    "workbox-strategies": "^5.1.3",
    "workbox-streams": "^5.1.3"
  }
 ```

## Roadmap

- CSS styling.
- Texas Holdem table responsiveness.


## Environment Variables

To run this project, you will need to at least add the following environment variables to your .env file:

`API_BASE_STRING`

`SOCKET_BASE_STRING`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Agile-Applet/Front-End.git
```


Go to the project directory

```bash
  cd Front-End
```


Install dependencies

```bash
  yarn install
```


Start the server

```bash
  yarn start
```


## Running Tests

To run tests, run the following command:

```bash
  yarn test
```

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
 

## Related

Here are some related projects:

- [Back-End side](https://github.com/Agile-Applet/Back-End)
