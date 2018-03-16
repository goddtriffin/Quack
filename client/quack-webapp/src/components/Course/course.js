import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'


class Course extends Component {

render() {
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>CS307: Software Engineering</h1>
        </div>
    );
}


}
export default Course;