import React, {useState} from 'react';
import './styles/main.css';
import {useSelector, useDispatch} from 'react-redux' 
import {logout} from '../utils/login'
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {Dropdown} from 'react-bootstrap';
import {getLanguage,langMap} from '../utils/consts';

const Navbar = () => {

  const isAuthenticated = useSelector(state => state.register.isAuthenticated);
  const dispatch = useDispatch();
  const currentLang = langMap[getLanguage()];
  const [lang,setLang] = useState(currentLang);
  const { t, i18n } = useTranslation();
  const changeLanguage = (e,lng) => {
    i18n.changeLanguage(lng);
    setLang(e.target.text);
  };

  const GuestLinks = (
    <ul>
    <Link to="/register">
          <Button variant="outline-light" > Sign Up</Button>
    </Link>
    <Link to="/login">
          <Button variant="outline-light" > Login</Button>
    </Link>
    <Dropdown>
        <Dropdown.Toggle className="field" id="basic-nav-dropdown">{lang}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={e=>changeLanguage(e,"en")}>English</Dropdown.Item>
          <Dropdown.Item onClick={e=>changeLanguage(e,"hi")}>हिन्दी</Dropdown.Item>
          <Dropdown.Item onClick={e=>changeLanguage(e,"ml")}>മലയാളം</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
   </ul>
  );
  const AuthLinks = (
    <ul>
      <Link to="/projects">
          <Button variant="outline-light"> Download Now!</Button>
    </Link>
    <Link to="/login">
          <Button variant="outline-light" onClick={()=>dispatch(logout())}> Logout</Button>
    </Link>
    <Dropdown>
        <Dropdown.Toggle className="field" id="basic-nav-dropdown">{lang}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={e=>changeLanguage(e,"en")}>English</Dropdown.Item>
          <Dropdown.Item onClick={e=>changeLanguage(e,"hi")}>हिन्दी</Dropdown.Item>
          <Dropdown.Item onClick={e=>changeLanguage(e,"ml")}>മലയാളം</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
   </ul>
  );
    return(
        <div>
         <nav className="navbar bg-dark">
          <h2>
           <a href="/">Adamya : The Indomitable One!</a>
          </h2>
          {isAuthenticated?AuthLinks:GuestLinks}
         </nav>
        </div>
        );
}

export default Navbar;