import "@/../public/css/menu.css";
import React from "react";
import { Context } from "@app/Provider";
import { useState, useContext } from "react";

function Menu() {
  const myContext = useContext(Context);

  return (
    <div
      className={`grid grid-cols-3 menu relative ${
        myContext.menu ? "menu-open" : ""
      }`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div className={`menu-hover absolute rounded-sm`}></div>
      <div className={`menu-hover absolute rounded-md`}></div>
    </div>
  );
}

export default Menu;
