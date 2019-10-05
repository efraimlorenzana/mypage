import React, { Component } from 'react';
import ProgressBar from '../Components/ProgressBar/Progress-Bar';
//import { skills } from '../Data/personalInfo';

class Skills extends Component {
    
    render () {
        const elements = (
            <section id="skills" className="Skills">
                <h2>My Skill set</h2>
                
                {
                    this.props.skills.map((d, i) => {
                        return d.status === 'PUBLISHED' ? <ProgressBar key={i} data={d} /> : null
                    })
                }
            </section>
            );
            
            return elements;
        }
    }
    
export default Skills;