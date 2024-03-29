import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'materialize-css/dist/css/materialize.min.css'
import { PostProvider } from './store/PostProvider';
import { BrowserRouter } from "react-router-dom";
import Header from './components/Header';
// import Header from './conponents/Header';


ReactDOM.render(

  <PostProvider>
    <BrowserRouter>
      {/* <Header/> */}
      {/* <Header/> */}
      <App />
    </BrowserRouter>
  </PostProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
