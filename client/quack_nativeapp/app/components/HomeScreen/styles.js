import { StyleSheet } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
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
  courseListView: {
    paddingLeft: 10,
    flex: 2,
  },
  courseList: {

  },
  courseListRow: {
    paddingVertical: 15,
  },
  courseListText: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 1,
    fontSize: 30,
    color: 'black',
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
    color: colors.qDarkGreen,
    textAlign: 'right',
  }
  
  
});