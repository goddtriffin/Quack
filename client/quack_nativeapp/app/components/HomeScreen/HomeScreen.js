import React, { Component } from 'react';
import { View, Image, StatusBar, KeyboardAvoidingView, TouchableOpacity, Text, ScrollView, AsyncStorage } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

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
                    <TouchableOpacity style={styles.addCourse}>
                        <Text style={styles.addCourseText}>+ Add course</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.courseListView}>
                    <ScrollView style={styles.courseList}>
                        {
                            this.state.courses.map((item) => (
                                <View>
                                    <TouchableOpacity style={styles.courseListRow}>
                                        <Text style={styles.courseListText}>{item.course}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    
                    </ScrollView>
                </View>
                
            </View>
        );
    }
}
export default HomeScreen;