import React, { Component } from 'react';
import Project from '../Components/Project/Project';

class Portfolio extends Component {
    render () {
        const elements = (
            <section id="portfolio" className="Portfolio">
                <h2>My Work</h2>

                <div className="Portfolio__gallery">
                    {
                        this.props.projects.map((d, i) => {
                            return d.status === 'PUBLISHED' ? <Project key={i} details={d} icons={this.props.svg} /> : null
                        })
                    }
                </div>
            </section>
        );

        return elements;
    }
}

export default Portfolio;