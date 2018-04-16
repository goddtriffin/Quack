import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  background: {
    backgroundColor: colors.qLightGreen
  },
  gradeListText: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 1,
    fontSize: 30,
    color: 'black',
    textAlign: 'left',
    paddingLeft: 20
  },
  classHeaderText: {
    flex: 1,
    fontFamily: 'Fira Sans',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 60,
    textAlign: 'center',
  //  width: 200,
    paddingTop: 10,
 },
 recentIndicator: {
    flex: 1,
    fontFamily: 'Fira Sans',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
   // width: 500,
 },
 pastQuizIndicator: {
  //flex: 1,
  fontFamily: 'Fira Sans',
  color: 'white',
  //fontWeight: 'bold',
  fontSize: 25,
  textAlign: 'center',

},
line: {
  borderBottomColor: 'black', 
  borderBottomWidth: 1,
  paddingLeft: 100
}
});