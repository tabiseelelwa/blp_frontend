/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Pied from "../Composants/Pied";
import Navbar from "../Composants/Navbar";
import { Outlet } from "react-router-dom";

const ClientLayout = () => { 

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Pied />
      </footer>
    </div>
  );
};

export default ClientLayout;
