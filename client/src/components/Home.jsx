import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return(
      <div className="container">
        <img src = "https://i.imgur.com/9uQz7kg.png" />
        <p>
          <Link to="/login">LOGIN</Link><br /><br />
          <Link to="/signup">SIGN UP</Link>
        </p>
      </div>
  )
}