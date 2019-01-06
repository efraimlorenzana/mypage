import React from 'react';
import Main from './Main';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Achievement from './Achievement';
import Footer from './Footer';

const Content = () => {
    const elements = (
        <div className="content">
            <Main />
            <Skills />
            <Portfolio />
            <Achievement />
            <Footer />
        </div>
    );

    return elements;
}

export default Content;