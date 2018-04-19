import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, Image, Text, Dimensions, TouchableHighlight, Alert, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import { StackNavigator } from 'react-navigation';
import { HeaderContainer, Header, Left, Body, Right, Button, Icon, Title, Item, Input } from 'native-base';
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
        courseID: '',
        quizzes: [],
    }

    componentDidMount() {
        this.props.client.mutate({ mutation: gql`
        mutation userGetQuizzes($courseID: Int!) {
            userGetQuizzes(courseID: $courseID) {
                id
                isOpen
                date
            }
        }
    `,
    variables: {
        courseID : this.props.navigation.state.params.id,
    }
    }).then( data => {
        quizzes = [];

        if(data.data.userGetQuizzes == null) {
            quizzes.push({id : 'No Quizzes', isOpen:false, date:'', key:0})
        }
        else {
            for(let i = 0; i < data.data.userGetQuizzes.length; i++) {
                quizzes.push({id : data.data.userGetQuizzes[i].id, isOpen:data.data.userGetQuizzes[i].isOpen, date:data.data.userGetQuizzes[i].date, key:i})
            }
        }
        this.setState({quizzes});
    }).catch(function(error) {
        alert(error.message);
    });
    this.setState({course:this.props.navigation.state.params.course});
    this.setState({courseID:this.props.navigation.state.params.id});
    console.log(this.state.courseID);
    }

    
    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.headerTop}>
                    <Left>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon name='arrow-back' style={styles.backButton}/>
                        </TouchableOpacity>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>

                <View style={styles.header}>
                    <Text style={styles.bigTitle}>
                        {this.state.course}
                    </Text>
                </View>

                <View style={styles.gradesListView}>
                    <ScrollView style={styles.gradesListRow}>
                        {this.state.quizzes.map(({id, isOpen, date}) => {
                            return (
                                <View>
                                    <Grid>
                                        <Row>
                                            <Text style={styles.quizText}>Quiz {id} {date.substring(0,2)} / {date.substring(2,4)}</Text>
                                        </Row>
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

export default withApollo(Grades)