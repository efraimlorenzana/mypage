import React from 'react';
import SVGIcon from '../svg';

const Project = ({ details, icons }) => {
    const SVG_ICON = details.domainName !== "#"
                 ? icons[details.projectSiteLinkIconAvailable.id]
                 : icons[details.projectSiteLinkIconNotAvailable.id];
    
    let github = icons[details.githubIcon.id];

    const elements = (
        <div className="project">
            <div className="project__image">
                <img src={`https://media.graphcms.com/${details.posterImage.handle}` } alt="website" className="project__image--photo"/>
            </div>
            <div className="project__details">
                {/* <h6 className="project__title-sub">Website</h6> */}
                <h1 className="project__title">{details.title}</h1>
                <h6 className="project__title-sub">Description :</h6>
                <p className="project__description">{details.description}</p>
                <h6 className="project__title-sub">Technology :</h6>
                <p className="project__description">{details.technology}</p>
            </div>
            <div className="project__link">
                
                <a target="_blank" rel="noopener noreferrer" href={`${details.github}`} className="project__repo">
                    <svg className="project__icon--site">
                        <use xlinkHref={`#${github.iconClass}`}>
                            <SVGIcon icon={github} />
                        </use>
                    </svg>
                </a>

                <a  target="_blank" rel="noopener noreferrer" href={`${details.domainName}`} className="project__site">
                    <svg className="project__icon--site">
                        <use xlinkHref={`#${SVG_ICON.iconClass}`}>
                            <SVGIcon icon={SVG_ICON} />
                        </use>
                    </svg>
                </a>

            </div>
        </div>
    );

    return elements;
}

export default Project;