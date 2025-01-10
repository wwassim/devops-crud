import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';
import ProfileDetail from './pages/ProfileDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <Home/>
    ),
  },
  {
    path: "create",
    element: <Create/>
  },
  {
    path: "update/:id",
    element: <Update/>
  },
  {
    path: "page-details/:id",
    element: <ProfileDetail/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
