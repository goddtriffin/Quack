import { StyleSheet } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.qLightGreen,
  },

  headerColor: {
    backgroundColor: colors.qLightGreen,
  },
  header: {
    height: 80,
    paddingTop: 30,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'Fira Sans',
    color: 'white',
    textAlign: 'right',
    paddingTop: 10,
  },

  bigTitle: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 3,
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    paddingBottom: 10,
  },
  courseListView: {
    paddingLeft: 10,
    flex: 2,
  },
  courseList: {

  },
  courseListRow: {
    paddingVertical: 30,
  },
  courseListText: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 1,
    fontSize: 30,
    color: 'white',
    textAlign: 'left',
  },
  addCourse: {
    flex: 3,
    flexDirection: 'row',
    paddingRight: 10,
    paddingBottom: 5,
    alignItems: 'flex-end',
  },
  addCourseText: {
    fontFamily: 'Fira Sans',
    fontWeight: '400',
    flex: 1,
    fontSize: 20,
    color: 'white',
    textAlign: 'right',
  }
  
  
});