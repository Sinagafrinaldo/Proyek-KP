import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white'
    },
    wrap1: {
        backgroundColor: '#1F76C6',
        padding: 20,
        paddingBottom: 90,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        height: 350,
        justifyContent: 'center',

    },
    card: {

        marginTop: -70,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: 300,
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
    boxnip: {
        borderWidth: 1,
        borderRadius: 7,
        width: 260,
        padding: 10,

    },
    login: {
        textAlign: 'center',
        color: 'white',
        fontSize: 28,
        fontWeight: '700',
        maxWidth: 300
    },
    tombol: {
        backgroundColor: '#1F76C6',
        marginTop: 15,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    tekslogin: {
        color: 'white',
        fontSize: 20
    },
    teksdaftar: {
        color: '#1F76C6'
    }
})

export default styles