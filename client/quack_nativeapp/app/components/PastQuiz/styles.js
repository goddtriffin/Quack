import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    paddingTop: 50,
    height: 60,
  },
  backgroundContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 50,
  },
  quizBackground: {
      resizeMode: 'contain',
      width: Dimensions.get('window').width - 10,
      height: Dimensions.get('window').height,
      position: 'absolute',
      top: 20,
      bottom: 0,
      left: 5,
      right: 5,
  },
  foregroundContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 80,
  }, 
  quizText: {
     flex: 1,
     fontFamily: 'Fira Sans',
     color: 'white',
     fontWeight: 'bold',
     fontSize: 35,
     textAlign: 'left',
     width: 250,
     paddingLeft: 20,

  },
  quizBodyText: {
    flex: 1,
    fontFamily: 'Fira Sans',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    width: 350,
    position: 'absolute',
    top: -90,
    bottom: 20,
    left: 15,
 },
 quizQuestionText: {
  flex: 1,
  fontFamily: 'Fira Sans',
  color: 'white',
  fontSize: 20,
  textAlign: 'center',
  width: 250,
  paddingTop: 90,

},
  downIndicator: {
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    paddingRight: 125,

  },
  pictureView: {
      resizeMode: 'contain',
      width: Dimensions.get('window').width - 30,
      height: Dimensions.get('window').height / 3,
      position: 'absolute',
      top: 120,
      bottom: 20,
      left: 15,
      right: 15,
  },
  questionButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 40,
  },
  abQuestionButtons: {
    resizeMode: 'contain',
    justifyContent: 'center',
  }
  


  
});