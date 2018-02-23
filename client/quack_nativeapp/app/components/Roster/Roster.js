import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, Image, Text, Dimensions } from 'react-native';
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
                <Row size={20}>
                    {/* Can't Figure out why this wont work
                     <Image>
                        source={require('../../images/navigation_resources/back_button.png')}
                        style={styles.navigationButton}
                    </Image> */}

                    <Text style = {styles.rosterHeaderText}>
                        CS 307 Class Roster
                    </Text>
                </Row>

                <Row size={80}>
                    <Col>
                       <Text style = {styles.RosterTitle}>
                            Students
                       </Text>
                       <Text style = {styles.RosterEntry}>
                            Tyler
                       </Text>
                       <Text style = {styles.RosterEntry}>
                            Mason
                       </Text>
                       <Text style = {styles.RosterEntry}>
                            Theo
                       </Text>

                    </Col>
                    
                    <Col>
                        <Text style = {styles.RosterTitle}>
                            Grade
                        </Text>
                        <Text style = {styles.RosterEntry}>
                            100%
                       </Text>
                       <Text style = {styles.RosterEntry}>
                            69%
                       </Text>
                       <Text style = {styles.RosterEntry}>
                            89%
                       </Text>
                        
                    </Col>
                </Row>
            </Grid>
        );
    }
}