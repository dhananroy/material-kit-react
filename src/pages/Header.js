import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { FiMenu } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

import "./css/style.css";

import AOS from 'aos';
import gsap from 'gsap';

function Header() {

  useEffect(() => {
    AOS.init();
    gsap.from('.logo', {
      opacity: 0,
      y: -10,
      delay: 1,
      duration: 0.5,
    });
    gsap.from('.nav_menu_list .nav_menu_item', {
      opacity: 0,
      y: -10,
      delay: 1.1,
      duration: 0.5,
      stagger: 0.3,
    });
    gsap.from('.toggle_btn', {
      opacity: 0,
      y: -10,
      delay: 1.1,
      duration: 0.5,
    });
    gsap.from('.main-heading', {
      opacity: 0,
      y: 20,
      delay: 2,
      duration: 1,
    });
    gsap.from('.info-text', {
      opacity: 0,
      y: 20,
      delay: 2.1,
      duration: 1,
    });
    gsap.from('.btn_wrapper', {
      opacity: 0,
      y: 20,
      delay: 2.1,
      duration: 1,
    });
    gsap.from('.card', {
      opacity: 0,
      y: 20,
      delay: 1.8,
      duration: 1,
    });
    gsap.from('.centered', {
      opacity: 0,
      y: 20,
      delay: 1.4,
      duration: 1,
    });
    gsap.from('.team_img_wrapper img', {
      opacity: 0,
      y: 20,
      delay: 2,
      duration: 1,
    });
    gsap.from('.footer', {
      opacity: 0,
      y: 20,
      delay: 2,
      duration: 1,
    });

  }, []);

  const showMenu = () => {
    const navId = document.getElementById('nav_menu');
    navId.classList.add('show');
  };

  const hideMenu = () => {
    const navId = document.getElementById('nav_menu');
    navId.classList.remove('show');
  };


  return (
    <header className="container header">
      <nav className="nav">
        <div className="logo">
        <Link to="/"><Box
            component="img"
            src="/assets/icons/ucmate.png"
            sx={{ width: 110, height: 33, cursor: 'pointer' }}
          />
          </Link>
        </div>

        <div className="nav_menu" id="nav_menu">
          <button className="close_btn" id="close_btn" onClick={hideMenu}>
            <MdClose style={{ width: '32px', height: '32px' }} />
          </button>

          <ul className="nav_menu_list">
            <li className="nav_menu_item">
              <Link to="/product" className="nav_menu_link">Product</Link>
            </li>
            <li className="nav_menu_item">
            <Link to="/services" className="nav_menu_link">Services</Link>
            </li>
            <li className="nav_menu_item">
              <Link to="/developers" className="nav_menu_link">Developers</Link>
            </li>
            <li className="nav_menu_item">
              <Link to="/research" className="nav_menu_link">Research</Link>
            </li>
            <li className="nav_menu_item">
              <Link to="/login" className="nav_menu_link">Login</Link>
            </li>
          </ul>
        </div>

        <button className="toggle_btn" id="toggle_btn" onClick={showMenu}>
          <FiMenu
            style={{
              width: '32px',
              height: '32px',
            }}
          />
        </button>
      </nav>
    </header>
  );
}

export default Header;
