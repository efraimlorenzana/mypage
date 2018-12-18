import React from 'react';
import Main from './Main';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Achievement from './Achievement';

const Content = () => {
    const elements = (
        <div className="content">
            <Main />
            <Skills />
            <Portfolio />
            <Achievement />
        </div>
    );

    return elements;
}

export default Content;