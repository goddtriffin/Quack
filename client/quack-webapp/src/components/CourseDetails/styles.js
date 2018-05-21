import { StyleSheet } from 'react'
import { colors } from '../../styles/styles'

export const styles = {
    header: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '20pt',
        fontWeight: 'regular'
    },
    emphasis: {
        fontFamily: 'Fira Sans',
        color: 'black',
        fontSize: '20pt',
        fontWeight: '700',
        fontStyle: 'italic'
    },
    footerRow: {
        backgroundColor: colors.qGreen,
        position: "fixed",
        left: "0",
        bottom: "0",
        height: "60px",
        width: "100%",
    },
    button: {
        fontFamily: 'Fira Sans',
        color: 'white',
        fontSize: '10pt',
        fontWeight: 'regular',
        borderColor: colors.transparent,
        backgroundColor: colors.transparent,
        border: 'none',
    },
    buttonText: {
        marginRight: '30px',
        marginTop: '5px'
    }
}

export default styles;