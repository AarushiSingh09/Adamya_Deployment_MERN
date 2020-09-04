import React from 'react';
import './styles/main.css'
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
 
const Landing = (props) => {
    return(
      <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
                    <h1 className="x-large">Games are promising tools to raise awareness. </h1>
          <p className="x-large">
            Our game promotes women empowerment through experimential gamification.
          </p>
          <div className="buttons">
          <Link to="/download">
          <Button variant="outline-light">Get Now!</Button>
          </Link>
          </div>
        </div>
      </div>
    </div>
    );
}
    
export default Landing;
