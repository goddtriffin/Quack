import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, Image, Text, Dimensions, TouchableOpacity, AlertIOS, ScrollView } from 'react-native';
import styles from './styles';
export default class Roster extends Component {
    state = {
        students : [
            {'name': 'Tyler', 'avg' : 0, 'attendence': 0, 'grades': '0/5, 0/5 and 0/5', 'key': 0},
            {'name': 'Mason', 'avg' : 66.667, 'attendence': 5, 'grades': '3/5, 4/5 and 3/5', 'key': 1},
            {'name': 'Theo', 'avg' : 60, 'attendence': 3, 'grades': '3/5, 3/5 and 3/5', 'key': 2},
            {'name': 'Justin', 'avg' : 100, 'attendence': 5, 'grades': '5/5, 5/5 and 5/5', 'key': 3},
            {'name': 'Todd', 'avg': 40, 'attendence': 4, 'grades': '2/5, 2/5 and 2/5', 'key': 4},
        ],
        course: '',
    }
    
    name_click(key) {
        let students = this.state.courses;
        AlertIOS.alert(
            'Attendence Details', this.state.students[key].name + ' has been to ' + this.state.students[key].attendence + ' out of 5 classes.'
        );
    }
    grade_click(key) {
        let students = this.state.courses;
        AlertIOS.alert(
            'Grades Details', this.state.students[key].name + ' has gotten ' + this.state.students[key].grades + ' on the 3 classes quizes.'
        );
    }

    render() {
        this.state.course = this.props.navigation.state.params.courses;
        return (
            <Grid>
                <Row size={20}>
                    {/* Can't Figure out why this wont work
                     <Image>
                        source={require('../../images/navigation_resources/back_button.png')}
                        style={styles.navigationButton}
                    </Image> */}

                    <Text style = {styles.rosterHeaderText}>
                        {this.state.course} class roster
                    </Text>
                </Row>

                <Row size={80}>
                    <Col>
                        <Text style = {styles.RosterTitle}>
                            Students
                       </Text>
                       <ScrollView style={styles.courseList}>
                        {
                            this.state.students.map(({name, key}) => 
                                <View>
                                    <TouchableOpacity /*style={styles.}*/ onPress={() => this.name_click(key)}>
                                        <Text style={styles.RosterName}>{name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        </ScrollView>
                    </Col>
                    
                    <Col>
                        <Text style = {styles.RosterTitle}>
                            Grade
                        </Text>
                        <ScrollView style={styles.courseList}>
                        {
                            this.state.students.map(({avg, key}) => 
                                <View>
                                    <TouchableOpacity /*style={styles.}*/ onPress={() => this.grade_click(key)}>
                                        <Text style={styles.RosterName}>{avg}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        </ScrollView>
                    </Col>
                </Row>
            </Grid>
        );
    }
}