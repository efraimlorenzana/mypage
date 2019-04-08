import React, { Component } from 'react';
import { bio } from '../Data/personalInfo';
import Me from '../Data/Images/me.jpg';

class Main extends Component {

    constructor() {
        super();

        this.state = {
            fx : null
        }
    }

    componentDidMount() {
        this.setState({fx : this.textExpand});
    }

    textExpand = (e) => {
        document.querySelector('#bio').classList.add('collapse-height');
        e.target.textContent = "Read Less...";
        this.setState({fx : this.textCollapse});
    }

    textCollapse = (e) => {
        document.querySelector('#bio').classList.remove('collapse-height');
        e.target.textContent = "Read More...";
        this.setState({fx : this.textExpand});
    }

    render() {
        const elements = (
            <section id="main" className="main">
                <div className="main__heading">
                    <h1 className="main__heading-title">
                        Hi! Im
                        <span className="main__heading-title--name">
                            Efraim A. Lorenzana
                        </span>
                        <span className="main__heading-title--position">
                            Web Developer
                        </span>
                    </h1>

                    <div className="main__picture">
                        <img src={Me} 
                        alt="Cover" 
                        className="main__picture--photo"
                        />
                    </div>
                </div>
                <div className="main__about">
                    <h2>About Me</h2>
                    <p id="bio">
                        {bio}
                    </p>

                    <button id="readMore" onClick={this.state.fx}>
                        Read More ...
                    </button>
                </div>
            </section>
        );

        return elements;
    }
}

export default Main;