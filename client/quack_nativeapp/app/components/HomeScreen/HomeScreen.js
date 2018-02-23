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
            {'course': 'CS307', 'id': 1},
            {'course': 'ENTR310', 'id': 2},
            {'course': 'CS252', 'id': 3},
            {'course': 'ANTH210', 'id': 4},
        ],
        email:'',
        isLoading: true,
    
    };

    componentDidMount() {
        AsyncStorage.getItem('email:key').then((token) => {
            this.setState({
                email: token,
                isLoading: false
            });
        });
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
                        <Text style={styles.addCourseText}>+ Add course</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.courseListView}>
                    <ScrollView style={styles.courseList}>
                        {
                            this.state.courses.map(({course}) => 
                                <View>
                                    <TouchableOpacity style={styles.courseListRow} onPress={() => this.props.navigation.navigate('Grades')}>
                                        <Text style={styles.courseListText}>{course}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            
                        }
                    
                    </ScrollView>
                </View>
                
            </View>
        );
    }
}
export default HomeScreen;