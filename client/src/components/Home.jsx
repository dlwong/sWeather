import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return(
      <div className="container">
        <h1>S W E A T H E R</h1>
        <p>
          <Link to="/login">LOGIN</Link>
        </p>
      </div>
  )
}