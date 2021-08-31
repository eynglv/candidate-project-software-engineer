import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h3>Welcome</h3>
      <Link to='/game'>
        <button>Start the Game</button>
      </Link>
    </div>
  );
};

export default Home;
