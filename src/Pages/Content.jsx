import React from 'react';
import Main from './Main';
import Skills from './Skills';
import Portfolio from './Portfolio';

const Content = () => {
    const elements = (
        <div className="content">
            <Main />
            <Skills />
            <Portfolio />
        </div>
    );

    return elements;
}

export default Content;