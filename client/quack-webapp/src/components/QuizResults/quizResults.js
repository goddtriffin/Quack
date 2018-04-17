import React, { Component, Fragment } from 'react';
import styles from './styles';
import { Grid, Col, Row, Button} from '../../../node_modules/react-bootstrap';
import { Link } from 'react-router-dom';

class QuizResults extends Component {

    state = {
        quizID: '',
        
    }

    constructor(props) {
        super(props)

        this.state = {
            quizID: this.props.match.params.quizID,

        }
    }

    render() {

        return(
            <div>
                Quiz Results
            </div>
        );
    }
}
export default QuizResults