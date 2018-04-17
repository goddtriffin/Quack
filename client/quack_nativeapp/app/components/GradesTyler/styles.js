import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
<<<<<<< HEAD:client/quack_nativeapp/app/components/Grades/styles.js
  background: {
    backgroundColor: colors.qLightGreen
=======
  navigationButton: {
    resizeMode: 'contain',
    paddingTop: 75,
    paddingLeft: 10,
  },
  gradesListView: {
    paddingRight: 10,
    flex: 2,
>>>>>>> Development:client/quack_nativeapp/app/components/GradesTyler/styles.js
  },
  gradeListText: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 1,
    fontSize: 30,
    color: 'black',
    textAlign: 'right',
    paddingRight: 20,
  },
  assignmentListView: {
    paddingLeft: 10,
  },
  assignmentListText: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 1,
    fontSize: 30,
    color: 'black',
    textAlign: 'left',
    paddingLeft: 20
  },
  classHeaderText: {
<<<<<<< HEAD:client/quack_nativeapp/app/components/Grades/styles.js
    flex: 1,
    fontFamily: 'Fira Sans',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 60,
=======
    fontFamily: 'Fira Sans',
    color: 'black',
    fontWeight: "800",
    fontSize: 45,
    textAlign: 'left',
    width: 300,
    paddingLeft: 20,
 },
  classReminderText: {
    fontFamily: 'Fira Sans',
    color: 'grey',
    fontStyle: 'italic',
    fontSize: 18,
    textAlign: 'left',
    width: 300,
    paddingLeft: 20,
  },
  liveQuizReminder: {
    fontFamily: 'Fira Sans',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
>>>>>>> Development:client/quack_nativeapp/app/components/GradesTyler/styles.js
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