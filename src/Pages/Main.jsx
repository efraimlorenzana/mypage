import React, { Component } from 'react';
import { bio } from '../Data/personalInfo';

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
                        <img src="https://scontent.fmnl3-2.fna.fbcdn.net/v/t1.0-9/42889876_2800033166688815_6600471337804759040_n.jpg?_nc_cat=110&_nc_eui2=AeH5qXW73i_uKUOc6MXmVYhCErwihZBxuBzaxUEJiaH1m11sTYHbT69qjylTs8H4EwScoh2jzuY3_gKA4IxWxNRnOgFPgMPiSBBICP09rfNifOGu-N8W2WOZiBautVjqcg8&_nc_ht=scontent.fmnl3-2.fna&oh=dedff30680d5dc555f9c34cea2c0e33f&oe=5C9A24A0" 
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