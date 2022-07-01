import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    card: {
        height: '100%',
        padding:20,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },

    ikon1: {
        marginTop: -21,
    },
    cekin: {
        backgroundColor: '#FFD600',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 20
    },

    stretch: {
        resizeMode: 'stretch',
        width: 250,
        height:260,
    },

    cekin1: {
        backgroundColor: '#FFD600',
        padding: 40,
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    teksin: {
        color: '#2D7CF3',
        fontFamily: 'poppinssemibold',
        fontSize: 24,
        textAlign: 'center',
    },

    cekout: {
        backgroundColor: '#E5E5E5',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20
    },
    teksout: {
        color: '#AAAAAA',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    button: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
    },
    text: {
        color: '#fff',
        fontSize: 15
    },
    title2: {
        color: 'gray',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700'
    },
    title3: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 35
    }
    // stretch :{
    //     resizeMode: 'stretch',
    // },
})

export default styles