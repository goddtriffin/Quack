import { colors } from '../../styles/styles'

export const styles = {

    container: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: colors.qGreen,
        justifyContent: 'center',
    },
    logoContainer: {
        width: '200px',
        height: '60px',
    },
    logo: {
        height: '100%',
    },
    label: {
        fontFamily: 'Fira Sans',
        color: 'white',
        fontSize: '14pt',
        fontWeight: '400',
    },
    loginButton: {
        marginTop: '20px',
        backgroundColor: colors.transparent,
        border: 0,
        fontFamily: 'Fira Sans',
        color: 'white',
        fontSize: '16pt',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    registerButton: {
        marginTop: '10px',
        backgroundColor: colors.transparent,
        border: 0,
        fontFamily: 'Fira Sans',
        color: "white",
        fontSize: '13pt',
        textAlign: 'center',
        fontWeight: '500'
    }
    
}

export default styles;
