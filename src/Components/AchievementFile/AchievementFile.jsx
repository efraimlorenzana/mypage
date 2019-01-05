import React from 'react';
import Sprite from '../../Icons/sprite.svg';

const AchievementFile = ({details}) => {
    const elements = (
        <div className="achievement-file">
            <h2>{details.title}</h2>

            {/* <span className="sub-title">Source :</span> */}
            <span className="sub-value">{details.source}</span>

            {/* <span className="sub-title">Issuer :</span> */}
            <span className="sub-value">{details.issuer}</span>

            {/* <span className="sub-title">Date :</span> */}
            <span className="sub-value">{details.date}</span>

            <img 
            src={ require(`../../Data/Images/certificate/${details.img}`) } 
            alt={details.title}
            />

            <a href={details.file} target="_blank" rel="noopener noreferrer">
                <svg>
                    <use xlinkHref={`${Sprite}#icon-googledrive`}></use>
                </svg>
            </a>
        </div>
    );

    return elements;
}

export default AchievementFile;