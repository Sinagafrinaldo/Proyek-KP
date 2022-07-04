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
        width: 230,
        height:260,
    },

    stretch2: {
        resizeMode: 'stretch',
        width: 350,
        height:260,
    },
    cekin1: {
        backgroundColor: '#F9A826',
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

elevation: 2,
    },
    teksin: {
        color: '#2D7CF3',
        fontFamily: 'poppinssemibold',
        fontSize: 24,
        textAlign: 'center',
    },

    teksin2: {
        color: 'white',
        fontWeight:'bold',
        fontFamily: 'poppinssemibold',
        fontSize: 18,
        textAlign: 'center',
        padding:12,
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