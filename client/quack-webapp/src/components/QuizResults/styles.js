import { StyleSheet } from 'react'
import { colors } from '../../styles/styles'

export const styles = {
    container: {
        marginTop: '15px',
        paddingLeft: '15px',
        marginRight: '20px',
        marginBottom: '10px',
        display: 'flex'
    },
    title: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '30pt',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    tab_menu: {
        margin: 'auto',
    },
    tab: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '13pt',
    },
    subtitle: {
        fontFamily: 'Fira Sans',
        color: colors.qDarkGrey,
        fontSize: '18pt',
        fontWeight: 'regular',
        textAlign: 'left',
    },
    questionTitle: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '18pt',
        fontWeight: 'bold',
    },
}

export default styles;