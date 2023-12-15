import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './views/Home/Home.js';
import Signup from './views/Signup/Signup.js';
import Login from './views/Login/Login.js';
import AddTransaction from './views/AddTransaction/AddTransaction.js';
import UpdateTransaction from './views/UpdateTransaction/UpdateTransaction.js';



const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/addtransaction",
        element: <AddTransaction />
      },
      {
        path: '/updateTransaction/:id',
        element: <UpdateTransaction />
      },

      {
        path: "/signup",
        element: <Signup />
      }
  ]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);


