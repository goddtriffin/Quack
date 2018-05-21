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
        backgroundColor: colors.qDarkGreen,
        border: 0,
        fontFamily: 'Fira Sans',
        color: 'white',
        fontSize: '15pt',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: '25px',
        width: '120%',
        height: '40px'
    },
    registerButton: {
        marginTop: '10px',
        backgroundColor: colors.transparent,
        border: 0,
        fontFamily: 'Fira Sans',
        color: "white",
        fontSize: '13pt',
        textAlign: 'center',
        fontWeight: '500',
        textDecoration: 'none',
    },
    accent: {
        fontFamily: 'Fira Sans',
        color: "white",
        fontSize: '13pt',
        fontWeight: '300'
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    }
}

export default styles;