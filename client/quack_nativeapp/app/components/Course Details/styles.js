import { StyleSheet } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.qGreen,
  },
  logo: {
      flex: 1,
      width: 180,
      height: 180,
      resizeMode: 'contain',
  },
  logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
  },
  formContainer: {

  },
  input: {
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.8)',
  }
  
});