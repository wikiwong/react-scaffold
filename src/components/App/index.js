import React, { Component } from 'react';
import styles from './styles.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            height: 50,
            width: 50
        };
    }

    handleClick() {
        const width = this.state.width + 10;
        const height = this.state.height + 10;
        this.setState({
            width,
            height
        });
    }

    render() {
        const { color } = this.props;
        const { height, width } = this.state;
        return (
            <div id="app" className={styles.app} onClick={this.handleClick} style={{
                height,
                width,
                backgroundColor: 'green',
                color
            }}>
                Got it now
            </div>
        );
    }
}

export default App;