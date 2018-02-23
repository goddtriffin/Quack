import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, AsyncStorage, AlertIOS } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';

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
        email:'',
        isLoading: true,
        instructor: '',
    
    };

    componentDidMount() {
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
                                <View>
                                    <TouchableOpacity style={styles.courseListRow} onPress={() => this.props.navigation.navigate('Grades')}>
                                        <Text style={styles.courseListText}>{course}</Text>
                                    </TouchableOpacity>
                                </View>
                                }else {
                                    <View>
                                    <TouchableOpacity style={styles.courseListRow} onPress={() => this.props.navigation.navigate('Roster')}>
                                        <Text style={styles.courseListText}>{course}</Text>
                                    </TouchableOpacity>
                                </View>
                                }
                            })
                            
                        }
                    
                    </ScrollView>
                </View>
                
            </View>
        );
    }
}
export default HomeScreen;