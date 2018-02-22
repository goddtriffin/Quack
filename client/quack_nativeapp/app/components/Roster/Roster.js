import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid"
import { View, Image, Text } from 'react-native';
import styles from './styles';
export default class Roster extends Component {
    dummyData = {
        students : [
            {'students': 'Tyler', 'id': 1},
            {'students': 'Mason', 'id': 2},
            {'students': 'Theo', 'id': 3},
            {'students': 'Justin', 'id': 4},
            {'students': 'Todd', 'id': 5},
        ]
    }
    
    render() {
        return (
            <Grid>
                <Row size={25}>
                </Row>
                <Row size={75}>
                    <Col>
                        
                    </Col>
                    <Col>

                    </Col>
                </Row>
            </Grid>
        );
    }
}