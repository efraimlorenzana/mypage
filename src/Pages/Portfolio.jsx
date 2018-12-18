import React, { Component } from 'react';
import { projects } from '../Data/personalInfo';
import Project from '../Components/Project/Project';

class Portfolio extends Component {
    constructor() {
        super();
        this.state = {
            projects: projects
        }
    }
    render () {
        const elements = (
            <section id="portfolio" className="Portfolio">
                <h2>My Work</h2>

                <div className="Portfolio__gallery">
                    {
                        this.state.projects.map((d, i) => <Project key={i} details={d} />)
                    }
                </div>
            </section>
        );

        return elements;
    }
}

export default Portfolio;