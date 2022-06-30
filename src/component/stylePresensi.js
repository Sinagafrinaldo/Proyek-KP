import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    card: {
        height: '99%',
        marginTop: '1%',
        marginLeft: '2%',
        width: '96%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    stretch: {
        resizeMode: 'stretch',
        // width:200,
        // height: 220
        marginBottom: 10,
        marginTop: 10
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
    }
})

export default styles