import React from 'react';

const AchievementFile = ({details}) => {
    const elements = (
        <div className="achievement-file">
            <iframe src={details.file} frameborder="0" className="achievement-file__embeded"></iframe>
        </div>
    );

    return elements;
}

export default AchievementFile;