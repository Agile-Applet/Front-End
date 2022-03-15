import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from './App';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';

import Holdem from './holdem/index';
import { RecoilRoot } from 'recoil';

const theme = createTheme({
  palette: {
    primary: {
      light: "#a24acd",
      main: "#70159b",
      dark: "#3e006c",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#833ca1",
      main: "#530872",
      dark: "#260046",
      contrastText: "#ffffff",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <Router>
      <RecoilRoot>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/holdem" element={<Holdem/>}></Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<App/>}/>
        </Routes>
      </RecoilRoot>
    </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();