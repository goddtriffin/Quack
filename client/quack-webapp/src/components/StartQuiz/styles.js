import { StyleSheet } from 'react'
import { colors } from '../../styles/styles'

export const styles = {
    container: {
        marginTop: '15px',
        paddingLeft: '15px',
        marginRight: '20px',
        marginBottom: '10px',
        display: 'flex',
        //backgroundColor: 'orange'
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
        fontWeight: '400',
        textAlign: 'left',
    },
    questionTitle: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '18pt',
        fontWeight: 'bold',
    },
    footerRow: {
        backgroundColor: colors.qGreen,
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    },
    saveButton: {
        fontFamily: 'Fira Sans',
        color: 'white',
        fontSize: '13pt',
        fontWeight: 'regular',
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        border: 'none',
        marginRight:'30px',
    },
    attendance: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '18pt',
        fontWeight: '500',
        textAlign: 'left',
    },
    loading: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '15pt',
        fontWeight: '400',
        textAlign: 'left',
    }
    
}

export default styles;
