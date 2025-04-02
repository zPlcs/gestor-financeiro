import { StyleSheet } from 'react-native'

const Style = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderColor: '#afafaf',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        width: '45%',
    },

    infoText: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    navButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: '#f8f8f8',
        margin: 20,
        padding: 20,
        borderColor: '#afafaf',
        borderWidth: 1,
        borderRadius: 10,
    },

    mainText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
})

export default Style;