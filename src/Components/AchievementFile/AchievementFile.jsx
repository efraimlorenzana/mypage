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
            <span className="sub-value">{details.dateAcquired}</span>

            <img 
            src={`https://media.graphcms.com/${details.certificate.handle}` } 
            alt={details.title}
            />

            <a href={details.googleDriveLocation} target="_blank" rel="noopener noreferrer">
                <svg>
                    <use xlinkHref={`${Sprite}#icon-googledrive`}></use>
                </svg>
            </a>
        </div>
    );

    return elements;
}

export default AchievementFile;