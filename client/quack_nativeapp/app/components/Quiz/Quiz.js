import React, { Component } from 'react';
import { View, Image, StatusBar, Text, Dimensions, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { ApolloProvider, graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            text: 'Enter text here',
            picture: '../../images/quiz_resources/quiz_backdrop_triple.png',
            questionText: 'What color is the dog? and what is the meaning of life',
            hasPicture: true,
            firstTextCorrect: true,
            inputText: '',
            secondInputText: '',
            image: '',
            options: '',
            origA: require('../../images/quiz_resources/A_button.png'),
            origB: require('../../images/quiz_resources/B_button.png'),
            origC: require('../../images/quiz_resources/C_button.png'),
            origD: require('../../images/quiz_resources/D_button.png')
        }
    }

    componentDidMount() {
        this.props.client.query({ query: gql`
            query quiz($id: Int!) {
                quiz(id: $id) {
                    image
                    question
                    options
                }
            }`,
            variables: {
                id : 3
            }
        }).then( data => {
            this.setState({
                image: data.data.quiz.image,
                questionText : data.data.quiz.question,
                options: data.data.quiz.options
            });
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            throw error;
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle="dark-content"
                    style={styles.navBar}
                />

                <View style={styles.backgroundContainer}>
                    <Image
                        source={require('../../images/quiz_resources/quiz_backdrop_triple.png')}
                        style={styles.quizBackground}
                    />

                    <Text style={styles.quizText}>
                        Current Quiz
                    </Text>

                    <Image
                        source={require('../../images/quiz_resources/close_quiz_indicator_triple.png')}
                        style={styles.downIndicator}
                    />

                    <Image
                        source={{uri: this.state.image}}
                        style={styles.pictureView}
                    />
                </View>

                <View style={styles.foregroundContainer}>
                    <Text style={styles.quizQuestionText}>
                        {'a.) '}{this.state.options.split(";")[0]}
                    </Text>

                    <Text style={styles.quizQuestionText}>
                        {'b.) '}{this.state.options.split(";")[1]}
                    </Text>
                </View>

                <View style={styles.questionButtonContainer}>
                    <Text style={styles.quizBodyText}>
                        {this.state.questionText}
                    </Text>

                    <TouchableOpacity onPress={() => Alert.alert("You selected A!")}>
                        <Image
                            source={require('../../images/quiz_resources/A_button.png')}
                            style={styles.abQuestionButtons}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Alert.alert("You selected B!")}>
                        <Image
                            source={require('../../images/quiz_resources/B_button.png')}
                            style={styles.abQuestionButtons}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('WriteQuiz')}>
                        <Text style={styles.nextButton}>
                            Next Question
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default withApollo(Quiz)