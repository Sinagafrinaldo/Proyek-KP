import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },

    card_text : {
        padding: 18,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },

    text :{
        color: 'gray', 
        fontFamily: 'poppins'
    },

    line :{
        width: '100%', 
        height: 0.8, 
        backgroundColor: '#D7DBDD'
    },

    
})

export default styles