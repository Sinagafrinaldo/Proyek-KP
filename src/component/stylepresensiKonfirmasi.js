import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        flex:1,
        display:'flex',
        height: '100%',
        padding:20,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
    },

    image_confirm_absent: {
        resizeMode: 'stretch',
        width: 350,
        height:260,
    },

    text_confirm_absent :{
        fontSize: 18, 
        fontFamily: 'poppinssemibold', 
        color: 'gray', 
        textAlign: 'center',
    },
   
    text_now :{
        fontSize: 18, 
        fontFamily: 'poppinssemibold', 
        color: 'gray', 
        marginBottom: 40, 
        textAlign: 'center',
    },
     
    touch_absent: {
        backgroundColor: '#F9A826',
        borderRadius: 10,
        width:'90%',
        alignItems: 'center',
        alignSelf:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },

    text_absent: {
        color: 'white',
        fontWeight:'bold',
        fontFamily: 'poppinssemibold',
        fontSize: 16,
        textAlign: 'center',
        padding:16,
    },

    image_absent: {
        resizeMode: 'stretch',
        width: 230,
        height:260,
    },

    text_absent_info:{
        fontSize: 34, 
        fontFamily: 'poppinssemibold', 
        color: '#118eeb', 
        textAlign: 'center',
    },

    text_online_info :{
        fontSize: 18, 
        fontFamily: 'poppins', 
        color: 'gray', 
        marginBottom: 30, 
        textAlign: 'center',
    },

    text_welcome :{
        fontSize: 15, 
        fontFamily: 'poppinssemibold', 
        color: 'gray',
        marginBottom: 8, 
        textAlign: 'center',
    },

    text_absent_done: {
        color: '#2D7CF3',
        fontFamily: 'poppinssemibold',
        fontSize: 24,
        textAlign: 'center',
    },


    container_verif_false :{
        padding:10, 
        flex:1, 
        display:'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    image_not_verif :{
        resizeMode: 'stretch',
        width:260,
        height: 245
    },

    text_not_verif :{
        textAlign: 'center', 
        color :'gray',
        fontFamily: 'poppins'
    },
})

export default styles