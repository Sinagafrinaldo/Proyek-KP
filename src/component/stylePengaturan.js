import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FBFF',
        height: '100%'
    },

    card :{
        backgroundColor: 'white',
        padding:0,
        margin:8,
        borderRadius:8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }, 
    text : {
        padding: 18,
    }
})

export default styles