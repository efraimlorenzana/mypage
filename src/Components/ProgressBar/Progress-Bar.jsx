import React, { Component } from 'react';

// const progressWidth = (progress) => {
//     let progressBar = document.querySelector('.progressBar__progress');

//     console.log(progressBar);
// }

class ProgressBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        }
    }

    initializeProgressWidth = () => {
        let progressBar = document.querySelector('.progressBar__progress');
        let wPercentage = progressBar.clientWidth / 100;
        let progress = this.props.data.knowledgeLevel * wPercentage;
        this.setState({width: progress});
    }

    componentDidMount() {
        this.initializeProgressWidth();
        window.addEventListener('resize', this.initializeProgressWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.initializeProgressWidth);
    }

    render () {
        const { technology, knowledgeLevel } = this.props.data;
        const style = {
            width: this.state.width
        }
        const elements = (
            <div className="progressBar">
                <h6 className="progressBar__title">
                    {technology}
                </h6>
                <div className="progressBar__progress">
                    <div 
                    style={style}
                    className="progressBar__progress-bar"
                    >
                        {knowledgeLevel} %
                    </div>
                </div>
            </div>
        );
    
        return elements;
    }
}

export default ProgressBar;