import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className="header">
      <h2 className="header-text">
        Brief History
        <nav className="topnav" id="myTopnav">
          <a href="/">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </nav>
      </h2>
      <div className="search_and_input">
        <input
          className="search_bar"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></input>
        <button onClick>Search</button>
      </div>
    </div>
  );
}

export default Nav;
