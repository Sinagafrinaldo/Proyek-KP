import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container :{
        justifyContent: 'center', 
        flex: 1,
        width:'100%',
        heigth : '100%',
        backgroundColor:'white',
        padding: 20,
    },

    stretch: {
        resizeMode: 'stretch',
        width: 300,
        height:260,
        alignSelf:'center',
    },

    box_input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        padding: 10,
        borderColor: '#D7DBDD',
        paddingLeft: 20,

    },

    touch : {
        backgroundColor: '#F9A826',
        marginTop: 35,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        marginBottom:30,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    text_add: {
        padding: 6,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default styles