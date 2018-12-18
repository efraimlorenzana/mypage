import React, { Component } from 'react';
import { achievement } from '../Data/personalInfo';
import AchievementFile from '../Components/AchievementFile/AchievementFile';

class Achievement extends Component {
    constructor() {
        super();
        this.state = {
            achievement: achievement
        }
    }
    render () {
        const elements = (
            <section id="achievement" className="Achievement">
                <h2>Achievement</h2>

                {
                    this.state.achievement.map((d,i) => <AchievementFile key={i} details={d} />)
                }
            </section>
        );

        return elements;
    }
}

export default Achievement;