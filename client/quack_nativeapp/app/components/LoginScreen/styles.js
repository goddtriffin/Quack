import { StyleSheet } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: colors.qGreen,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
  },
  logo: {
      flex: 1,
      width: 180,
      height: 180,
      resizeMode: 'contain',
      flexDirection: 'column',
      justifyContent: 'flex-end',
  },
  logoContainer: {
      alignItems: 'center',
      //flexGrow: 1,
      //flex: 1,
      justifyContent: 'center',
      height: 200,
      paddingVertical: 30,
      flexDirection: 'column',
  },
  formContainer: {
    padding: 20,
    
  },
  input: {
      height: 50,
      //backgroundColor: 'rgba(255,255,255,0.8)',
      marginBottom: 20,
      borderBottomColor: 'rgba(255,255,255,0.8)',
      borderBottomWidth: 1.5,
      fontFamily: 'Fira Sans',
      fontWeight: '500',
      fontSize: 18,
      color: 'white',

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

  bigText: {
    fontFamily: 'Fira Sans',
    fontWeight: '700',
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
  },

  textButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 25,
  },

  detailText: {
    fontFamily: 'Fira Sans',
    fontWeight: '400',
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'left',
  },

  signupText: {
    fontFamily: 'Fira Sans',
    fontWeight: '500',
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
  },

  bigHeaderText: {
    fontFamily: 'Fira Sans',
    fontWeight: '900',
    fontSize: 30,
    color: 'white',
    textAlign: 'left',
  },

  header: {
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },

  HELLO: {
    paddingVertical: 10,
    
  }
  
});