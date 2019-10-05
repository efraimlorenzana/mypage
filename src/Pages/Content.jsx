import React from 'react';
import Main from './Main';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Achievement from './Achievement';
import Experience from '../Components/Experience/experience';
import Footer from './Footer';

const Content = ({ data }) => {

    const { personalInfoes, skillSets, projects, achievements, workHistories } = data;

    return (
        <div className="content">
            <Main PersonalInfo={personalInfoes[0]} />
            <Skills skills={skillSets} />
            <Portfolio projects={projects} />
            <Achievement achievements={achievements} />
            <Experience workHistories={workHistories} />
            <Footer />
        </div>
    );
}

export default Content;