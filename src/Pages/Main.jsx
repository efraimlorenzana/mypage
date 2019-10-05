import React, { Component } from 'react';


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
        const { 
            lastname, firstname, middlename,
            professionTitle, avatar, bio
        } = this.props.PersonalInfo;

        let fullname = `${firstname} ${middlename} ${lastname}`;
        
        const elements = (
            <section id="main" className="main">
                <div className="main__heading">
                    <h1 className="main__heading-title">
                        Hi! Im
                        <span className="main__heading-title--name">
                            {fullname}
                        </span>
                        <span className="main__heading-title--position">
                            {professionTitle}
                        </span>
                    </h1>

                    <div className="main__picture">
                        <img src={`https://media.graphcms.com/${avatar.handle}`} 
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