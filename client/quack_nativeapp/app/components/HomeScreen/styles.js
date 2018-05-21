import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../style/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.qLightGreen,
  },
  searchButton: {
    height: 30,
    width: 30,
  },
  header: {
    backgroundColor: colors.qLightGreen,
    height: 80,
  },
  noCourses: {
    textAlign: 'justify',
    color: 'white',
    fontFamily: 'Fira Sans',
    fontSize: 25,
  },
  headerText: {
    fontFamily: 'Fira Sans',
    color: 'white',
    textAlign: 'right',
    paddingTop: 10,
  },
  loading: {
    backgroundColor: '#07A386', 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedbackButton: {
    flex: 1, 
    paddingTop: Platform.OS == 'ios' ? 0 : 90,
    paddingLeft: Platform.OS == 'ios' ? 0 : 5,
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
  addButton: {
    color: 'white',
    width: 50,
    height: 50,
    paddingBottom: 30,
  },
  courseListRow: {
    paddingVertical: 10,
  },
  courseListText: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 1,
    fontSize: 30,
    color: 'white',
    textAlign: 'left',
  },
  courseIDListText: {
    fontFamily: 'Fira Sans',
    fontWeight: '600',
    flex: 1,
    fontSize: 20,
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