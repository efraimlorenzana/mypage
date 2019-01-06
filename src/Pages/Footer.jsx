import React, { Component } from 'react';
import Sprite from '../Icons/sprite.svg';

class Footer extends Component {
    render() {
        const element = (
            <section id="footer" className="Footer">
                <div className="social">
                    <ul>
                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="https://web.facebook.com/strife08?_rdc=1&_rdr">
                                <svg>
                                    <use xlinkHref={`${Sprite}#icon-facebook`}></use>
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/efraimlorenzana">
                                <svg>
                                    <use xlinkHref={`${Sprite}#icon-github`}></use>
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.codepen.io/efraimlorenzana/">
                                <svg>
                                    <use xlinkHref={`${Sprite}#icon-codepen`}></use>
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.gitlab.com/efraim.lorenzana">
                                <svg>
                                    <use xlinkHref={`${Sprite}#icon-gitlab`}></use>
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/efraim-lorenzana-4bbb2575/">
                                <svg>
                                    <use xlinkHref={`${Sprite}#icon-linkedin`}></use>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="Footer__text">
                    
                    <div className="Footer__text--contact">
                        
                        <div className="col2">
                            <h2>Technologies</h2>

                            <div className="tech-gallery">
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-html5`}></use>
                                    </svg>
                                    <div>
                                        HTML 5 
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-css3`}></use>
                                    </svg>
                                    <div>
                                        CSS 3 
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-javascript`}></use>
                                    </svg>
                                    <div>
                                        Javascript 
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-git`}></use>
                                    </svg>
                                    <div>
                                        Git 
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-react`}></use>
                                    </svg>
                                    <div>
                                        ReactJS
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-node-dot-js`}></use>
                                    </svg>
                                    <div>
                                        NodeJS 
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-php`}></use>
                                    </svg>
                                    <div>
                                        PHP 
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-laravel`}></use>
                                    </svg>
                                    <div>
                                        Laravel 
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-visualstudiocode`}></use>
                                    </svg>
                                    <div>
                                        ASP.net MVC C# 
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-microsoftexcel`}></use>
                                    </svg>
                                    <div>
                                        Excel, VBA and Macro 
                                    </div>
                                </span>
                                <span>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-mysql`}></use>
                                    </svg>
                                    <div>
                                        MySQL
                                    </div>
                                </span>
                            </div>
                        </div>

                        <div className="col1">
                            <h2 id="contact">Contact</h2>
                            <ul>
                                <li>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-phone`}></use>
                                    </svg>
                                    <span>+63 906 0082 533</span>
                                </li>
                                <li>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-phone`}></use>
                                    </svg>
                                    <span>+63 912 5916 099</span>
                                </li>
                                <li>
                                    <svg>
                                        <use xlinkHref={`${Sprite}#icon-mail2`}></use>
                                    </svg>
                                    <span>efraim.lorenzana@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr/>

                    <div>
                        <ul className="footer__nav">
                            <li>
                                <a href="#main">Home</a> |
                            </li>
                            <li>
                                <a href="#skills">Skills</a> |
                            </li>
                            <li>
                                <a href="#skills">Portfolio</a> |
                            </li>
                            <li>
                                <a href="#achievement">Achievement</a> |
                            </li>
                            <li>
                                <a href="https://drive.google.com/file/d/1N5kWWseeZeY5HTq-rqxDyzFnHfCEoiY0/view" 
                                target="_blank"
                                rel="noopener noreferrer"
                                >
                                    Resume
                                </a>
                            </li>
                        </ul>

                        &copy; 2019 My Official Page
                    </div>
                </div>

            </section>
        );

        return element;
    }
}

export default Footer;