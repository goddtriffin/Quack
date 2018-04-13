import { StyleSheet } from 'react'
import { colors } from '../../styles/styles'

// export default StyleSheet.create({
//     container: {
//         backgroundColor: 'orange',
//     }

// });

export const styles = {
    header: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '20pt',
        fontWeight: 'regular'
    },
    button: {
        fontFamily: 'Fira Sans',
        color: '#5A5A5A',
        fontSize: '12pt',
        fontWeight: 'regular',
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        border: 'none',
        marginLeft: '120px',
        marginBottom: '10px',
        height: '100%',
    },
    addQuestionButton: {
        fontFamily: 'Fira Sans',
        color: '#5A5A5A',
        fontSize: '12pt',
        fontWeight: 'regular',
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        border: 'none',
        textAlign: 'center',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: '10px'
    },
    createButton: {
        fontFamily: 'Fira Sans',
        color: '#5A5A5A',
        fontSize: '10pt',
        fontWeight: 'regular',
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        border: 'none',
    },
    createLink: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '14pt',
        fontWeight: 'bold',
    },
    title: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '30pt',
        fontWeight: 'bold',
        textAlign: 'left',
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
    questionTitle: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '18pt',
        fontWeight: 'regular',
    },
    questionOption: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '12pt',
        fontWeight: '400',
    },
    accent: {
        fontFamily: 'Fira Sans',
        color: colors.qDarkGrey,
        fontSize: '13pt',
        fontWeight: '400',
        fontStyle: 'italic'
    }
    
    
}

export default styles;
