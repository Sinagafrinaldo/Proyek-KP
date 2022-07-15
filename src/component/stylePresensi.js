import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    stretch: {
        resizeMode: 'stretch',
        width: 300,
        height: 260,
        marginTop: -20
    },

    text_absent: {
        fontSize: 34,
        fontFamily: 'poppinssemibold',
        color: '#118eeb',
        textAlign: 'center',
    },

    text_online: {
        fontSize: 18,
        fontFamily: 'poppins',
        color: 'gray',
        marginBottom: 30,
        textAlign: 'center',
    },

    text_users: {
        color: 'gray',
        fontFamily: 'poppinssemibold',
        textAlign: 'center',
        marginTop: -20
    },

    name: {
        color: 'gray',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'poppinssemibold'
    },

    nip: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 35,
        fontFamily: 'poppins'
    },

    button_absent: {
        backgroundColor: '#F9A826',
        borderRadius: 10,
        shadowColor: "#000",
        marginBottom: 30,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    button_text_absent: {
        color: 'white',
        fontFamily: 'poppinssemibold',
        padding: 16,
        fontSize: 16,
        textAlign: 'center'
    },

    container_verif_false: {
        padding: 10,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image_not_verif: {
        resizeMode: 'stretch',
        width: 260,
        height: 245
    },

    text_not_verif: {
        textAlign: 'center',
        color: 'gray',
        fontFamily: 'poppins'
    },
})

export default styles