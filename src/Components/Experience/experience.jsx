import React, { Component } from 'react';
import { jobExperience } from '../../Data/personalInfo';

class Experience extends Component {
    constructor() {
        super();

        this.state = {}
    }
    render() {
        const JobExp = ({detail}) => (
            <div className={`em-timeline__row ${detail.side}`}>
                <div className="em-timeline__data">
                <div className={`tag ${detail.color}`}>
                    <div className="icon">
                        <img src={ require(`../../Data/Images/jobexperience/${detail.logo}`) } alt={detail.company}/>
                    </div>
                        <h4>{detail.duration}</h4>
                    </div>
                    <div className="content">
                        <h4>{detail.position}</h4>
                        <div>{detail.company}</div>
                        <div>{detail.industry}</div>
                        <div>{detail.department}</div>
                    </div>
                </div>
            </div>
        )
        const elements = (
            <section id="experience" className="experience">
                <h2>Experience</h2>

                <div data-title="JOB" class="em-timeline">
                    <div class="em-timeline__title">
                        <h1>
                            My Work Experience
                        </h1>
                        <p>
                            These timeline shows my professional work experience. it also illustrate my lenght of service as an employee from different company.
                        </p>
                    </div>

                    {
                        jobExperience.map((d, i) => <JobExp key={i} detail={d} />)
                    }
                </div>
            </section>
        );

        return elements;
    }
}

export default Experience;