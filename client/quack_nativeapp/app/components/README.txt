Custom components go here

Example:

components/
├── Component1/
│   ├── Component1.js
│   └── styles.js
└── Component2/
    ├── Component2.js
    └── styles.js

COMPONENT BOILERPLATE
------------------------------------------
import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
export default class COMPONENT_NAME extends Component {
    render() {
        return (
            <View>
            
            </View>
        );
    }
}
------------------------------------------

STYLES BOILERPLATE
------------------------------------------
import { StyleSheet } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  examples: {
    paddingVertical: 10,
    backgroundColor: colors.qGreen,
  },
  
});
------------------------------------------
