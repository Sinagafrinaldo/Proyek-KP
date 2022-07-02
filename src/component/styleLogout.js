import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles2 = StyleSheet.create({
    container : {
        justifyContent: 'center', 
        padding: 40,
    },

    card_logout: {
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

    title_logout :{
        textAlign: 'center', 
        color: '#f75555', 
        fontSize: 18
    },

   line :{
    borderBottomWidth: 1, 
    borderColor: '#e0e0e0', 
    marginVertical: 10
   },

    text_out: {
        color: '#434343',
        textAlign: 'center',
        fontSize: 18
    },

    style_touch :{
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 
        'space-around'
    },

    touch_cancel: {
        backgroundColor: '#e9f0ff',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },

    touch_logout: {
        backgroundColor: '#246bfd',
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    
    text_logout: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 20
    },

    text_cancel: {
        color: '#2f72fd',
        fontSize: 16,
        fontWeight: '700',
        marginHorizontal: 25
    },
})

export default styles2