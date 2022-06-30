import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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

    line :{
        width: '100%', 
        height: 0.8, 
        backgroundColor: '#D7DBDD'
    },

    text : {
        padding: 18,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },
})

export default styles