import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
export default class CourseDetails extends Component {
    state = {
        course: 'Error',
        grade: 'Error'
    }

    render () {
        return (
            <Grid>
                <Row size={6}>
                    <Image
                        source = {require('../../images/navigation_resources/back_button.png')}
                        style = {styles.navigationButton}
                    />
                </Row>
                <Row size={12}>
                    <Text style = {styles.className}>
                        {this.state.course}
                    </Text>
                </Row>
                <Row size={12}>
                    <Text style = {styles.currentGrade}>
                        Current Grade:   {this.state.grade}
                    </Text>
                </Row>
                <Row size={70}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WriteQuiz')}>
                        <Text style={styles.grades}>Grades</Text>
                    </TouchableOpacity>
                </Row>
            </Grid>
        );
    }
}