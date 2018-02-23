import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, AsyncStorage, AlertIOS } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.updateCourseList = this.updateCourseList.bind(this);
    }

    state = {
        courses: [
            {'course': 'CS307', 'key': 1},
            {'course': 'ENTR310', 'key': 2},
            {'course': 'CS252', 'key': 3},
            {'course': 'ANTH210', 'key': 4},
        ],
        studentID:'',
        email:'',
        isLoading: true,
        instructor: '',
    
    };

    componentDidMount() {


        AsyncStorage.getItem('studentID').then((token) => {
            this.setState({
                studentID: token,
                isLoading: false
            });

            console.log(this.state.studentID);

            client.mutate({ mutation: gql`
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
              for(let i = 0; i < data.data.userGetCourses.length; i++) {
                courses.push({'course' : data.data.userGetCourses[i].name})
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

        AsyncStorage.getItem('instructor').then((token) => {
            this.setState({
                instructor: token,
            });
        });

        console.log(this.state.instructor);
    }

    updateCourseList() {
        let courses = this.state.courses;
        AlertIOS.prompt(
            'Enter course title', null, (text) => {
                courses.push({'course': text});
                this.setState({courses});
                console.log(this.state);
            }
        );
    }


    render() {

        let AddCourseButton = <Text/>;

        let CourseDetails = null;
        if(this.state.instructor == '1') {
            AddCourseButton = <Text style={styles.addCourseText}>+ Add course</Text>
        }

        if(this.state.isLoading) {
            return(<View><Text>Loading...</Text></View>);
        }else {
            //alert(this.state.email);
        }

        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="default"
                />

                
                <View style={styles.header}>
                    <Text style={styles.bigTitle}>Classes</Text>
                    
                    <TouchableOpacity style={styles.addCourse} onPress={() => this.updateCourseList()}>
                        {AddCourseButton}
                    </TouchableOpacity>
                </View>

                <View style={styles.courseListView}>
                    <ScrollView style={styles.courseList}>
                        {
                            this.state.courses.map(({course}) => {
                                if(this.state.instructor == '1') {
                                return (<View>
                                    <TouchableOpacity style={styles.courseListRow} onPress={() => this.props.navigation.navigate('Roster')}>
                                        <Text style={styles.courseListText}>{course}</Text>
                                    </TouchableOpacity>
                                </View>);
                                }else {
                                    return (<View>
                                    <TouchableOpacity style={styles.courseListRow} onPress={() => this.props.navigation.navigate('Grades')}>
                                        <Text style={styles.courseListText}>{course}</Text>
                                    </TouchableOpacity>
                                </View>);
                                }
                            })
                            
                        }
                    
                    </ScrollView>
                </View>
                
            </View>
        );
    }
}

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

export default HomeScreen;