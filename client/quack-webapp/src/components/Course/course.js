import React from 'react';
import { Component } from 'react';
import { colors } from '../../styles/styles'
import styles from './styles'

class Course extends Component {

    state = {
        courseID: 6969,
        courseTitle: "CS307: Software Engineering",
        courseDescription: "Software Engineering",
        courseRoster: ['Theo', 'Mason', 'Justin', 'Todd', 'Tyler'],
        courseQuizzes: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'],
        
    }

render() {
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>{this.state.courseTitle}</h1>
            
        </div>
    );
}


}
export default Course;