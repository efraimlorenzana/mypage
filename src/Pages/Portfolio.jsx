import React, { Component } from 'react';
import { projects } from '../Data/personalInfo';

class Portfolio extends Component {
    constructor() {
        super();
        this.state = {
            projects: projects
        }
    }
    render () {
        const elements = (
            <section className="Portfolio">
                <h2>My Work</h2>

                <div className="Portfolio__gallery">

                </div>
            </section>
        );

        return elements;
    }
}

export default Portfolio;