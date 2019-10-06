import React, { Component } from 'react';
import Main from './Main';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Achievement from './Achievement';
import Experience from '../Components/Experience/experience';
import Footer from './Footer';

class Content extends Component {
    render () {
        const { personalInfoes, skillSets, projects, achievements, workHistories, svgIcons, socialAccounts, technologies, contactDetailses } = this.props.data;

        return (
            <div className="content">
                <Main PersonalInfo={personalInfoes[0]} />
                <Skills skills={skillSets} />
                <Portfolio 
                    projects={projects} 
                    svg={this.props.SVG_ICONS_OBJECT}
                />
                <Achievement achievements={achievements} />
                <Experience workHistories={workHistories} />
                <Footer 
                    accounts={socialAccounts} 
                    icons={this.props.SVG_ICONS_OBJECT}
                    svg={svgIcons} 
                    technologies={technologies} 
                    contacts={contactDetailses}
                />
            </div>
        );
    }
}

export default Content;