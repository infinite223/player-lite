import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Player from "./Player.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Player />,
    children: [
      {
        path: "",
        element: <div />,
      },
      {
        path: "search",
        element: <div />,
        errorElement: <h2>Note not found</h2>,
      },
      {
        path: "downloads",
        element: <div />,
        errorElement: <h2>Note not found</h2>,
      },
      {
        path: "settings",
        element: <div />,
        errorElement: <h2>Note not found</h2>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
