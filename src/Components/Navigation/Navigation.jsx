import React from 'react';
import Logo from './logo.png';

const Navigation = () => {
    const elements = (
        <nav className="navigation sticky">
            <div className="navigation__logo">
                <img src={Logo} alt="Logo" className="navigation__logo--file"/>
            </div>

            <input className="navigation__button" type="checkbox" id="navButton"/>
            <label className="navigation__label" htmlFor="navButton">
                <span></span>
            </label>

            <ul className="navigation__list">
                <li className="navigation__item">
                    <a href="#main" className="navigation__link">Home</a>
                </li>
                <li className="navigation__item">
                    <a href="#skills" className="navigation__link">Skills</a>
                </li>
                <li className="navigation__item">
                    <a href="#portfolio" className="navigation__link">My Work</a>
                </li>
                <li className="navigation__item">
                    <a href="#achievement" className="navigation__link">Achievement</a>
                </li>
                <li className="navigation__item">
                    <a href="https://drive.google.com/file/d/1N5kWWseeZeY5HTq-rqxDyzFnHfCEoiY0/view" 
                    className="navigation__link"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                        Resume
                    </a>
                </li>
                <li className="navigation__item">
                    <a href="#footer" className="navigation__link">Contact</a>
                </li>
            </ul>
        </nav>
    );

    return elements;
}

export default Navigation;