import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import { withRouter } from 'react-router-dom'

const styles = {
    header: {
        fontFamily: 'Fira Sans',
        color: colors.qLightGrey,
        fontSize: '20pt',
        fontWeight: 'bold',
        textAlign: 'cetner',
        
    },
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

class Blank extends Component {
    render() {
        return(
            <div style={styles.container}>
                {/* <Alert bsStyle="warning">Hello</Alert> */}
                <h1 style={styles.header}>To get started, select a course from the sidebar or add a new course.</h1>
            </div>
        );
    }
}

export default Blank;