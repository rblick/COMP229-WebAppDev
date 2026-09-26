import React from "react";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <img
          src="/images/profile.jpg"
          alt="logo"
          width="250"
        />
      <h1>My Portfolio</h1>
      <nav>
        <Link to="/">Home</Link>{"__"}
        <Link to="/about">About</Link>{"__"}
        <Link to="/project">Project</Link>{"__"}
        <Link to="/service">Services</Link>{"__"}
        <Link to="/refrences">Refrences</Link>{"__"}
        <Link to="/contact">Contact</Link>
      </nav>
      <br />
      <hr />
    </>
  );
}
