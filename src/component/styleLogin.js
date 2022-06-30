import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    cardlog: {
        padding: 20,
        borderWidth: 3,
        borderRadius: 4,
        marginTop: '80%',
        borderColor: 'pink',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,

        elevation: 2,
    },
    textout: {
        color: '#434343',
        textAlign: 'center',
        fontSize: 18
    },
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#F5FBFF',
    },

    wrap1: {
        backgroundColor: '#118eeb',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        height: 350,
        justifyContent: 'center',

    },

    login: {
        marginTop: -80,
        textAlign: 'center',
        color: 'white',
        fontSize: 28,
        fontWeight: '700',
        width: '80%',
        marginLeft: '10%',
    },
    back: {
        position: 'absolute',
        left: 30,
        top: 50
    },
    card: {
        marginTop: -150,
        marginBottom: 130,
        paddingTop: 30,
        paddingBottom: 30,
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
        borderRadius: 10,
        width: 260,
        padding: 10,
        borderColor: 'gray',
        paddingLeft: 38,

    },
    teksbatal: {
        color: '#2f72fd',
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 25
    },
    tombol: {
        backgroundColor: '#246bfd',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    tombol2: {
        backgroundColor: '#e9f0ff',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    tekslogin: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 20
    },
    teksdaftar: {
        color: '#118eeb',
        fontWeight: 'bold',
    },
    ikonMenu: {
        position: 'absolute',
        bottom: 14,
        paddingLeft: 10
    }
})

export default styles