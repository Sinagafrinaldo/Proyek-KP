import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },

    header: {
        backgroundColor: '#118eeb',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        justifyContent: 'center',

    },

    title: {
        paddingTop: 95,
        paddingBottom: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 28,
        fontFamily: 'poppinssemibold',
        width: '80%',
        marginLeft: '10%',
    },

    stretch: {
        alignSelf: 'center',
        resizeMode: 'stretch',
        width: 330,
        height: 250,
    },

    back: {
        position: 'absolute',
        left: 30,
        top: 50
    },

    card_login: {
        marginBottom: 10,
        marginTop: -60,
        paddingTop: 25,
        paddingBottom: 30,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '94%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    title_login: {
        marginBottom: 5,
        alignSelf: 'center',
        color: '#118eeb',
        fontFamily: 'poppinssemibold',
        fontSize: 18
    },

    line: {
        width: '70%',
        height: 1.5,
        alignSelf: 'center',
        backgroundColor: '#D7DBDD'
    },

    title_email: {
        color: 'gray',
        marginTop: 20,
        marginBottom: 5,
        fontFamily: 'poppins'
    },

    title_password: {
        color: 'gray',
        marginTop: 20,
        marginBottom: 5,
        fontFamily: 'poppins'
    },

    icon_box: {
        position: 'absolute',
        bottom: 14,
        paddingLeft: 10
    },

    box_input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        padding: 10,
        borderColor: '#D7DBDD',
        paddingLeft: 38,
        fontFamily: 'poppins'

    },

    touch: {
        backgroundColor: '#118eeb',
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 10
    },

    text_login: {
        padding: 16,
        color: 'white',
        fontSize: 16,
        fontFamily: 'poppinssemibold',
        marginHorizontal: 20
    },

    registration: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },

    text_registration: {
        color: '#118eeb',
        fontFamily: 'poppinssemibold'
    },
})

export default styles