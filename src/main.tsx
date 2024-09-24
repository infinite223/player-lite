import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Player from "./pages/Player.tsx";
import Search from "./pages/Search.tsx";
import Downloads from "./pages/Downloads.tsx";
import Settings from "./pages/Settings.tsx";
import { MusicPlayerProvider } from "./context/MusicPlayerContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Player />,
      },
      {
        path: "search",
        element: <Search />,
        errorElement: <h2>Error</h2>,
      },
      {
        path: "downloads",
        element: <Downloads />,
        errorElement: <h2>Error</h2>,
      },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <h2>Error</h2>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MusicPlayerProvider>
      <RouterProvider router={router} />
    </MusicPlayerProvider>
  </React.StrictMode>,
);
