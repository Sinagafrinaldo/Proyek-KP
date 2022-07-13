import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    background :{
        backgroundColor: '#66baff', 
        height: 90
    },

    touch_image: {
        minHeight: 100,
        minWidth: 100,
        borderRadius: 100,
        backgroundColor: '#171F1D',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
    },

    image : {
        height: 100, 
        borderRadius: 100, 
        width: 100
    },
    
    edit_image :{
        backgroundColor: 'black', 
        alignSelf: 'center', 
        marginTop: -20, 
        padding: 4, 
        borderRadius: 5
    },

    profile : {
        marginTop: 20,
        color: 'gray',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppins'
    },

    content: {
        // marginHorizontal: 5,
        backgroundColor: 'white',
        minHeight: '100%',
        padding: 30
    },

    line : {
        borderBottomWidth: 1, 
        borderColor: 'black', 
        marginTop: -20, 
        borderColor: 'gray'
    },

    wrap_item: {
        marginVertical: 10,
    },

    title: {
        color: '#949494',
        marginVertical: 5,
        fontFamily: 'poppins'
    },

    box_input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        padding: 10,
        borderColor: '#D7DBDD',
        paddingLeft: 17,
    },

    select_box : {
        borderWidth: 1,
        borderRadius: 10,
        height:51,
        width: '100%',
        borderColor: '#D7DBDD',
        paddingLeft: 38,
    },

    touch : {
        backgroundColor: '#F9A826',
        marginTop: 20,
        width:'100%',
        padding: 10,
        alignSelf:'center',
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

    text_update: {
        color: 'white',
        textAlign: 'center',
        padding: 4,
        fontSize: 16,
        fontFamily: 'poppinssemibold'
    },

   
    
})

export default styles