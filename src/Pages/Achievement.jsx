import React, { Component } from 'react';
import AchievementFile from '../Components/AchievementFile/AchievementFile';

class Achievement extends Component {
    render () {
        const elements = (
            <section id="achievement" className="Achievement">
                <h2>Achievement</h2>

                <div className="gallery">
                    {
                        this.props.achievements.map((d,i) => {
                            return <AchievementFile key={i} details={d} />
                        })
                    }
                </div>
            </section>
        );

        return elements;
    }
}

export default Achievement;