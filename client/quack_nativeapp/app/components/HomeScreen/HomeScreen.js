import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, AsyncStorage, AlertIOS } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.updateCourseList = this.updateCourseList.bind(this);
    }

    state = {
        courses: [],
        studentID:'',
        email:'',
        isLoading: true,
    };

    componentDidMount() {


        AsyncStorage.getItem('studentID').then((token) => {
            this.setState({
                studentID: token,
                isLoading: false
            });

            console.log(this.state.studentID);

            this.props.client.mutate({ mutation: gql`
                mutation userGetCourses($id: Int!) {
                  userGetCourses(id: $id) {
                    name
                  }
                }
              `,
              variables: {
                id : parseInt(this.state.studentID)
               }}).then( data => {
              console.log(data);
              courses = [];

              if(data.data.userGetCourses == null) {
                courses.push({'course' : 'No current classes'})
              }
              else {
                for(let i = 0; i < data.data.userGetCourses.length; i++) {
                    courses.push({'course' : data.data.userGetCourses[i].name})
                }
              }
              this.setState({courses});
            }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                throw error;
            });
        });


        AsyncStorage.getItem('email:key').then((token) => {
            this.setState({
                email: token,
                isLoading: false
            });
        });
    }

    updateCourseList() {

        var title = "";
        let courses = this.state.courses;
        AlertIOS.prompt(
            'Enter Course ID', null, (text) => {

                console.log(text);
                
                this.props.client.mutate({ mutation: gql`
                    mutation userAddCourse($id: Int!, $courseID: Int!) {
                      userAddCourse(id: $id, courseID: $courseID) {
                        name
                      }
                    }
                  `,
                  variables: {
                    id : this.state.studentID,
                    courseID: parseInt(text)
                   }
                }).then( data => {
                  courses = [];

                  if(data.data.userAddCourse == null) {
                    courses.push({'course' : 'No current classes'})
                  }
                  else {
                    for(let i = 0; i < data.data.userAddCourse.length; i++) {
                        courses.push({'course' : data.data.userAddCourse[i].name})
                    }
                  }
                  this.setState({courses});
                }).catch(function(error) {
                    alert(error.message);
                }); 
            }
        );
    }

    searchCourseList() {
        AlertIOS.prompt(
            'Enter Course Name', null, (text) => {
                console.log(text);
                
            }
        )
    };


    render() {



        let AddCourseButton = <Text/>;
        let CourseDetails = <CourseDetails/>;
        AddCourseButton = <Text style={styles.addCourseText}>+ Add course</Text>

        if(this.state.isLoading) {
            return(<View><Text>Loading...</Text></View>);
        }else {
            //alert(this.state.email);
        }

        return (
            <View style={styles.container}>
                <Header>
                    <Left>
                        <Button large transparent>
                        <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Classes</Title>
                    </Body>
                    <Right>
                        <Button large transparent>
                        <Icon name='ios-search'/>
                        </Button>
                        <Button large transparent onPress={() => this.updateCourseList()}>
                        <Icon name='add'/>
                        </Button>
                    </Right>
                </Header>
                
                <StatusBar
                    barStyle="default"
                />
                
                <View style={styles.header}>
                    <Text style={styles.bigTitle}>
                        Classes
                    </Text>
                    <TouchableOpacity style={styles.addCourse}>
                        {AddCourseButton}
                    </TouchableOpacity>
                </View>

                <View style={styles.courseListView}>
                    <ScrollView style={styles.courseList}>
                        {
                            this.state.courses.map(({course}) => {
                                    return (<View>
                                    <TouchableOpacity style={styles.courseListRow} onPress={() => this.props.navigation.navigate('Grades', {courses:course})}>
                                        <Text style={styles.courseListText}>{course}</Text>
                                    </TouchableOpacity>
                                </View>);
                                }
                            ) 
                        }
                    
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default withApollo(HomeScreen)