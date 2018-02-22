import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  navigationButton: {
    resizeMode: 'contain',
    paddingTop: 70,
  },
  rosterHeaderText: {
      textAlign: 'center',
      //fontFamily: '',
      //width: 200,
      fontSize: 20,
      paddingTop: 70,
      paddingLeft: 20,
  },
  RosterTitle: {
      fontWeight: 'bold',
      fontSize: 15,
      paddingLeft: 20,
  },
  RosterEntry: {
      fontSize: 10,
      paddingLeft: 20,
      paddingTop: 30,
  }
});