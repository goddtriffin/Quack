import { StyleSheet } from 'react'
import { colors } from '../../styles/styles'

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
        fontSize: '10pt',
        fontWeight: 'regular',
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        border: 'none',
    },
    buttonText: {
        position: 'absolute',
        bottom: '10px',
        right: '24px'
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
    startButton: {
        fontFamily: 'Fira Sans',
        color: colors.qDarkGreen,
        fontSize: '10pt',
        fontWeight: 'regular',
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        border: 'none',
    },
    editButton: {
        fontFamily: 'Fira Sans',
        color: colors.qDarkGrey,
        fontSize: '10pt',
        fontWeight: 'regular',
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        border: 'none',
    },
    viewButton: {
        fontFamily: 'Fira Sans',
        color: colors.qDarkGreen,
        fontSize: '10pt',
        fontWeight: 'regular',
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        border: 'none',
    }   
}

export default styles;
