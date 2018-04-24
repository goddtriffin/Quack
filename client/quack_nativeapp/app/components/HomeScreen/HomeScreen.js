import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, AsyncStorage, Alert, Platform } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';
import { HeaderContainer, Header, Left, Body, Right, Button, Icon, Title, Item, Input } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
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
        this.updateCourseList = this.addCourse.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.reset = this.reset.bind(this);
    }

    state = {
        title: 'Courses', 
        courses: [],
        studentID: 0,
        email:'',
        isLoading: true,
        isSearching: false,
        search: '',
        searchResults: [],
    };

    componentDidMount() {

        AsyncStorage.getItem('studentID').then((token) => {
            this.setState({
                studentID: token,
                isLoading: false
            });

            //console.log(this.state.studentID);

            this.props.client.mutate({ mutation: gql`
                mutation userGetCourses($id: Int!) {
                  userGetCourses(id: $id) {
                    name
                    id
                  }
                }
              `,
              variables: {
                id : parseInt(this.state.studentID)
               }}).then( data => {
              console.log(data);
              courses = [];

              if(data.data.userGetCourses.length == 0) {
                courses.push({'course': 'Search for a course to join it.' , 'key': 0})
              }
              else {
                for(let i = 0; i < data.data.userGetCourses.length; i++) {
                    courses.push({'course': data.data.userGetCourses[i].name, 'key': data.data.userGetCourses[i].id})
                }
              }
              this.setState({courses});
            })
        });


        AsyncStorage.getItem('email:key').then((token) => {
            this.setState({
                email: token,
                isLoading: false
            });
        });
    }

    addCourse(name, id) {

        var title = "";
        let courses = this.state.courses;
        var i = _.findIndex(courses, {'course':name, 'key':id})
        if(i != -1){
            Alert.alert(
                'Course Enrollment Error',
                'You are already enrolled in ' + name,
                [
                  {text: 'OK', onPress: () => this.reset()},
                ],
                { cancelable: false }
            )
            return;
        }
                
            this.props.client.mutate({ mutation: gql`
                mutation userAddCourse($id: Int!, $courseID: Int!) {
                    userAddCourse(id: $id, courseID: $courseID) {
                        name
                    }
                }
            `,
            variables: {
                id : this.state.studentID,
                courseID: id,
            }
            }).then( data => {
                courses = [];

                if(data.data.userAddCourse.length == 0) {
                    courses.push({'course': 'Search for a course to join it.', 'key': 0})
                }
                else {
                    for(let i = 0; i < data.data.userAddCourse.length; i++) {
                        courses.push({'course': data.data.userAddCourse[i].name, 'key': data.data.userAddCourse[i].id})
                    }
                }
                this.setState({courses})
            })

        this.setState({title:'Courses'})
        this.setState({isSearching:false})
        this.setState({search:''})
    }

    handleSearch() {
        if(this.state.search == ""){
            return
        }
        this.state.searchResults = [];
        this.props.client
            .query({
                query: gql`
            {
                courses {
                    name
                    id
                }
            }
            `
        })
        .then(data => {

        for(let i = 0; i < data.data.courses.length; i++) {
            if(data.data.courses[i].name.toLowerCase().match(this.state.search.toLowerCase()))
            this.state.searchResults.push({'name' : data.data.courses[i].name, 'key': data.data.courses[i].id})
            
        }
        this.setState({isSearching:true})
        this.setState({title:'Search Results'})
        });
    }

    reset() {
        this.setState({title:'Courses'})
        this.setState({isSearching:false})
        this.setState({search:''})
    }

    render() {

        if(this.state.isLoading) {
            return(<View><Text>Loading...</Text></View>);
        }else {
            //alert(this.state.email);
        }

        let studentID = this.state.studentID;

        return (
            <View style={styles.container}>
                <Header searchBar rounded style={styles.header}>
                    <Item>
                        <Icon name="ios-search"/>
                            <Input placeholder="Search Courses"
                            onChangeText={(search) => this.setState({search})}
                            onSubmitEditing={() => this.handleSearch()} 
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="search"
                            value={this.state.search}
                            />
                        <Icon name="close" onPress={()=> this.reset()}/>
                    </Item>
                    <Button transparent onPress={() => this.props.navigation.navigate('Feedback')}>
                        <Icon style={{color: 'white'}} name='settings'/>
                    </Button>
                </Header>
                
                <View style={styles.header}>
                    <Text style={styles.bigTitle}>
                        {this.state.title}
                    </Text>
                </View>

                <View style={styles.courseListView}>
                    <ScrollView style={styles.courseList}>
                        { (this.state.isSearching == false) ?
                            this.state.courses.map(({course, key}) => {
                                    return (<View>
                                    <TouchableOpacity style={styles.courseListRow} onPress={() => this.props.navigation.navigate('Grades', {course, key, studentID})}>
                                        <Text style={styles.courseListText}>{course}</Text>
                                        <Text style={styles.courseIDListText}>{key}</Text>
                                    </TouchableOpacity>
                                </View>);
                                }
                            )
                            : this.state.searchResults.map(({name, key}) => {
                                    return (<View style={{paddingVertical: 10}}>
                                        <Grid>
                                            <Col size={85}>
                                                <Text style={styles.courseListText}>{name}</Text>
                                                <Text style={styles.courseIDListText}>{key}</Text>
                                            </Col>
                                            <Col size={15}>
                                                <TouchableOpacity onPress={() => this.addCourse(name, key)}>
                                                    <Icon style={styles.addButton} name='add'/>
                                                </TouchableOpacity>
                                            </Col>
                                        </Grid>
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