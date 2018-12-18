import React from 'react';
import Sprite from '../../Icons/sprite.svg';

const Project = ({details}) => {
    const icon = details.site === "#"
                 ? `${Sprite}#icon-visibility_off`
                 : `${Sprite}#icon-visibility`;

    const elements = (
        <div className="project">
            <div className="project__image">
                <img src={ require(`../../Data/Images/projects/${details.img}`) } alt="website" className="project__image--photo"/>
            </div>
            <div className="project__details">
                {/* <h6 className="project__title-sub">Website</h6> */}
                <h1 className="project__title">{details.title}</h1>
                <h6 className="project__title-sub">Description :</h6>
                <p className="project__description">{details.description}</p>
                <h6 className="project__title-sub">Technology :</h6>
                <p className="project__description">{details.tech}</p>
            </div>
            <div className="project__link">
                
                <a target="_blank" rel="noopener noreferrer" href={`${details.github}`} className="project__repo">
                    <svg className="project__icon--site">
                        <use xlinkHref={`${Sprite}#icon-github`}></use>
                    </svg>
                </a>

                <a  target="_blank" rel="noopener noreferrer" href={`${details.site}`} className="project__site">
                    <svg className="project__icon--site">
                        <use xlinkHref={icon}></use>
                    </svg>
                </a>

            </div>
        </div>
    );

    return elements;
}

export default Project;