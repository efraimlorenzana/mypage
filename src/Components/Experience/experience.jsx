import React, { Component } from 'react';

class Experience extends Component {
    toLowerCase = (text) => {
        return text.toLowerCase();
    }

    GetMonthYear = (date) => {
        var d = new Date(date);
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        var newDate = d.getFullYear() === 1900 ? 'Present' : `${months[d.getMonth()].substring(0,3)} ${d.getFullYear()}`;

        return newDate;
    }

    render() {
        const JobExp = ({detail}) => (
            <div className={`em-timeline__row ${this.toLowerCase(detail.cardPosition)}`}>
                <div className="em-timeline__data">
                <div className={`tag ${this.toLowerCase(detail.brandColorTag)}`}>
                    <div className="icon">
                        <img src={`https://media.graphcms.com/${detail.logo.handle}` } alt={detail.company}/>
                    </div>
                        <h4>{`${this.GetMonthYear(detail.durationFrom)} - ${this.GetMonthYear(detail.durationTo)}`}</h4>
                    </div>
                    <div className="content">
                        <h4>{detail.role}</h4>
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

                <div data-title="JOB" className="em-timeline">
                    <div className="em-timeline__title">
                        <h1>
                            My Work Experience
                        </h1>
                        <p>
                            These timeline shows my professional work experience. it also illustrate my lenght of service as an employee from different company.
                        </p>
                    </div>

                    {
                        this.props.workHistories.map((d, i) => {
                            return d.status === 'PUBLISHED' ? <JobExp key={i} detail={d} /> : null
                        })
                    }
                </div>
            </section>
        );

        return elements;
    }
}

export default Experience;