import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  background: {
    backgroundColor: colors.qLightGreen,
    flex: 1
  },
  headerTop: {
    backgroundColor: colors.qLightGreen,
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
  backButton: {
    color: 'white',
    height: 30,
    width: 30,
  },
  bigTitle: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 3,
    lineHeight: 60,
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
  },
  subTitle: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 3,
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  },
  classHeaderText: {
    flex: 1,
    fontFamily: 'Fira Sans',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 60,
    textAlign: 'center',
    paddingTop: 10,
 },
 button: {
  backgroundColor: colors.qDarkGreen,
  paddingVertical: 15,
  borderRadius: 40,
},
buttonText: {
  fontFamily: 'Fira Sans',
  fontWeight: '700',
  fontSize: 20,
  color: 'white',
  textAlign: 'center',
},
 recentIndicator: {
    flex: 1,
    fontFamily: 'Fira Sans',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
 },
 pastQuizIndicator: {
  fontFamily: 'Fira Sans',
  color: 'white',
  fontSize: 25,
  textAlign: 'center',
},
line: {
  borderBottomColor: 'black', 
  borderBottomWidth: 1,
  paddingLeft: 100
}
});