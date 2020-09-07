import React, { Component } from 'react';
import SVGIcon from '../Components/svg';

class Footer extends Component {
    render() {
        const { icons, accounts, technologies, contacts } = this.props;
        
        const element = (
            <section id="footer" className="Footer">
                <div className="social">
                    <ul>
                       {
                            accounts.map(a => {
                                return a.stage === 'PUBLISHED' ? (
                                    <li key={a.id}>
                                        <a 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            href={a.link}
                                        >
                                            <svg>
                                                <use xlinkHref={`#${icons[a.svgIcon.id].iconClass}`}>
                                                    <SVGIcon key={a.id} icon={icons[a.svgIcon.id]} />
                                                </use>
                                            </svg>
                                        </a>
                                    </li>
                                ) : null
                            })
                        }
                    </ul>
                </div>

                <div className="Footer__text">
                    
                    <div className="Footer__text--contact">
                        
                        <div className="col2">
                            <h2>Technologies</h2>

                            <div className="tech-gallery">
                                {
                                    technologies.map(t => {
                                        return t.stage === 'PUBLISHED' ? (
                                            <span key={t.id}>
                                                {
                                                    t.svgIcon !== null ? (
                                                        <svg>
                                                            <use xlinkHref={`#${icons[t.svgIcon.id].iconClass}`}>
                                                                <SVGIcon key={t.id} icon={icons[t.svgIcon.id]} />
                                                            </use>
                                                        </svg>
                                                    ) : (
                                                        <img 
                                                            src={`https://media.graphcms.com/${t.icon.handle}`} 
                                                            alt={t.languageName}
                                                            width='50px'
                                                        />
                                                    )
                                                }
                                                <div>
                                                    {t.languageName} 
                                                </div>
                                            </span>
                                        ) : null
                                    })
                                }
                            </div>
                        </div>

                        <div className="col1">
                            <h2 id="contact">Contact</h2>
                            <ul>
                                {
                                    contacts.map(c => {
                                        return c.stage === 'PUBLISHED' ? (
                                            <li key={c.id} style={{minWidth: '200px'}}>
                                                {
                                                    c.svgIcon !== null ? (
                                                        <svg>
                                                            <use xlinkHref={`#${icons[c.svgIcon.id].iconClass}`}>
                                                                <SVGIcon key={c.id} icon={icons[c.svgIcon.id]} />
                                                            </use>
                                                        </svg>
                                                    ) : (
                                                        <img 
                                                            src={`https://media.graphcms.com/${c.mediaIcon.handle}`} 
                                                            alt={c.title}
                                                            width='20px'
                                                            style={{marginRight: '10px'}}
                                                        />
                                                    )
                                                }
                                                <span>
                                                    {c.info} 
                                                </span>
                                            </li>
                                        ) : null
                                    })
                                }
                            </ul>
                        </div>
                    </div>

                    <hr/>

                    <div className="footer">
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
                                <a href="https://docs.google.com/document/d/1vKiiNvR-zK9fsNcrNvHZ7Y0DgPt22-Szs6noFvhx420/edit?usp=sharing" 
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