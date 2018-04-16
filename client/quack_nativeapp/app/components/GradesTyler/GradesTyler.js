import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, Image, Text, Dimensions, TouchableHighlight, Alert, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';

import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';


class Grades extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        authToken: '',
        email: '',
        course: '',
        grades: [{assignment: 'Quiz 1', grade: '80', key: 0},
        {assignment: 'Quiz 2', grade: '23', key:1}],
    }

    /*componentDidMount() {
        let grades = this.state.grades;
        if(this.state.course == "CS 307"){
            grades.push({assignment: 'Quiz 1', grade: '100%', key: 0});
            this.setState({grades});
        }
        else{
            grades.push({assignment: 'No Grades', grade: '', key: 0})
            this.setState({grades});
        }
    }*/

    
    render() {
        this.state.course = this.props.navigation.state.params.courses;
        return (
            <Grid>
                <Row size={10}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate("Home")}>
                    <Image
                        source={require('../../images/navigation_resources/back_button.png')}
                        style={styles.navigationButton}
                    />
                    </TouchableHighlight>
                </Row>
                <Row size={10}>
                        <Text style = {styles.classHeaderText}>
                        {this.state.course}
                        </Text>
                </Row>
                <Row size={80}>
                    <Col size={50}>
                    <View style={styles.assignmentListView}>
                    <ScrollView style={styles.assignmentListView}>
                        {
                            this.state.grades.map(({assignment}) => {
                                return (<View>
                                    <Text style={styles.assignmentListText}>{assignment}</Text>
                                </View>);
                                }
                            ) 
                        }
                    </ScrollView>
                    </View>
                    </Col>
                    <Col size={50}>
                    <View style={styles.gradesListView}>
                    <ScrollView style={styles.gradesListView}>
                        {
                            this.state.grades.map(({grade}) => {
                                return (<View>
                                    <Text style={styles.gradeListText}>{grade}</Text>
                                </View>);
                                }
                            ) 
                        }
                    </ScrollView>
                    </View>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default withApollo(Grades)