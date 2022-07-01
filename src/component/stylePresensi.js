import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    card: {
        padding:20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    stretch: {
        resizeMode: 'stretch',
        width: 300,
        height:260,
    },

    cekin: {
        backgroundColor: '#FFD600',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 20
    },
    teksin: {
        color: '#061882',
        fontFamily: 'poppinsmedium',
        fontSize: 16,
        textAlign: 'center'
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
        fontFamily: 'poppinssemibold'
    },
    title3: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 35,
        fontFamily: 'poppins'
    },

    notUser :{
        resizeMode: 'stretch',
        width:260,
        height: 245
        // marginBottom: 10,
        // marginTop: 10
    },
})

export default styles