import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#F5FBFF',
    },

    wrap1: {
        backgroundColor: '#118eeb',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        height: 510,
        justifyContent: 'center',

    },

    login: {
        marginTop: -200,
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
        marginTop: -270,
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
    ikonMenu :{
        position:'absolute',
        bottom : 14,
        paddingLeft: 10
    },
    tombol: {
        backgroundColor: '#118eeb',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    tekslogin: {
        color: 'white',
        fontSize: 20,
        fontWeight : 'bold'
,    },
    teksdaftar: {
        color: '#1F76C6',
        fontWeight: 'bold',
    }
})

export default styles