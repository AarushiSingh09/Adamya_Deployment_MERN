import React from 'react';
import './styles/main.css'
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
// import AnimatedButton from 'react-animated-buttons';
// import {
//   AwesomeButton,
//   AwesomeButtonProgress,
//   AwesomeButtonSocial,
// } from 'react-awesome-button';
const Landing = (props) => {
    return(
      
      <div className="landing">
       <div className="dark-overlay">
        <div ><centre>
                    <h1 className="x-large">ADAMYA-Game of the Indomitable</h1>
          <p className="x-large">
            Our game promotes women empowerment through experimential gamification.
          </p>
          <Link to="/download">
          <div style={{margin: '0rem 1rem', display: 'inline-block',fontFamily:'Franklin Gothic Medium',fontStyle:'bold'}}>
          {/* <AnimatedButton   color="#ead724" textColor="#a00955fd">Get Now</AnimatedButton> */}
          <Button  className="Primary">Get Now</Button>
          </div>
          {/* <AwesomeButtonProgress type="primary">Primary</AwesomeButtonProgress> */}
          </Link>
          </centre>
          
          <div className="buttons">
          <div className="buttchar">
          {/* <Link to="/download">
          <Button className="getbutt">Get Now!</Button>
          </Link>
           */}
          <img  className="character" src={require("./images/char (1).png")} />
          </div>
        </div>
        </div>
      </div>
    </div>
    
    );
}
    
export default Landing;
