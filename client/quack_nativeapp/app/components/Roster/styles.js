import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  navigationButton: {
    resizeMode: 'contain',
    paddingTop: 70,
  },
  rosterHeaderText: {
      textAlign: 'left',
      fontFamily: 'Fira Sans',
      width: 400,
      fontSize: 30,
      fontWeight: '800',
      paddingTop: 70,
      paddingLeft: 20,
  },
  RosterTitle: {
        fontFamily: 'Fira Sans',
      fontWeight: 'bold',
      fontSize: 24,
      paddingLeft: 20,
  },
  RosterEntry: {
      fontFamily: 'Fira Sans',
      fontSize: 20,
      paddingLeft: 20,
      paddingTop: 30,
  },

  header: {
    height: 80,
    paddingTop: 30,
    paddingLeft: 10,
    flexDirection: 'row',
  },

  bigTitle: {
    fontFamily: 'Fira Sans',
    fontWeight: '800',
    flex: 3,
    fontSize: 45,
    color: 'black',
    textAlign: 'left',
  },
});