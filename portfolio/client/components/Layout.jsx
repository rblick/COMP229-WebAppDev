import React from "react";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <img src="/images/logo2.png" alt="Logo" />
        <h1>Robert Blick Portfolio</h1>
      </header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/project">Project</Link>
        <Link to="/service">Services</Link>
        <Link to="/references">References</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <br />
      <hr />
    </>
  );
}
