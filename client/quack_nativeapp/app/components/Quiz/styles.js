import { StyleSheet } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  quizBackground: {
      resizeMode: 'contain',
      width: null,
      height: null,
      position: 'absolute',
      top: 20,
      bottom: 0,
      left: 5,
      right: 5,
  },
  foregroundContainer: {
    flex: 1,
    flexDirection: 'column',
    


  },
  quizText: {
     fontFamily: 'Fira Sans',
     color: 'black',
     fontWeight: 'bold',
     flex: 2,
     width: 100,

  }
  


  
});