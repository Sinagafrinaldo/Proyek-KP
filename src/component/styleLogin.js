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
    },

    wrap1: {
        backgroundColor: '#118eeb',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        justifyContent: 'center',

    },

    stretch: {
        alignSelf:'center',
        resizeMode: 'stretch',
        width: 330,
        height:260,

    },
    
    
    back: {
        position: 'absolute',
        left: 30,
        top: 50
    },

    login: {
        paddingTop:95,
        paddingBottom:20,
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
        marginBottom:10,
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
    boxnip: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        padding: 10,
        borderColor: '#D7DBDD',
        paddingLeft: 38,

    },
    teksbatal: {
        color: '#2f72fd',
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 25
    },
    tombol: {
        backgroundColor: '#118eeb',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },

    tekslogin: {
        padding:6,
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