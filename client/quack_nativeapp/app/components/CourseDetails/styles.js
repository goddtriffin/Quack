import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  navigationButton: {
    //justifyContent: 'flex-end',
    resizeMode: 'contain',
    paddingTop: 80,
  },
  className: {
    fontFamily: 'Fira Sans',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'left',
    width: Dimensions.get('window').width,
    paddingLeft: 20,
    paddingTop: 20,
  },
  currentGrade: {
    fontFamily: 'Fira Sans',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'left',
    width: Dimensions.get('window').width,
    paddingTop: 10,
    paddingLeft: 20,
  }, 
  grades: {
    fontFamily: 'Fira Sans',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'left',
    width: Dimensions.get('window').width,
    paddingTop: 10,
    paddingLeft: 20,
  }, 
});