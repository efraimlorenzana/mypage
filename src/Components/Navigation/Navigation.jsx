import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo.png';


class Navigation extends Component {
    render() {
        const resume = this.props.resume && this.props.resume[0];
        const url = resume?.url || '#resume';
        const navigationLinkText = resume?.navigationLinkText || 'Resume';
        
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
                        <a href="#achievement" className="navigation__link">Certification</a>
                    </li>
                    <li className="navigation__item">
                        <a href="#resume" className="navigation__link">Resume</a>
                    </li>
                    <li className="navigation__item">
                        <a href="#experience" className="navigation__link">Experience</a>
                    </li>
                    <li className="navigation__item">
                        <a href="#testimonials" className="navigation__link">Testimonials</a>
                    </li>
                    <li className="navigation__item navigation__item--login">
                        <Link to="/admin/login" className="navigation__link navigation__link--login">
                            Login
                        </Link>
                    </li>
                </ul>
            </nav>
        );

        return elements;
    }
}

export default Navigation;
