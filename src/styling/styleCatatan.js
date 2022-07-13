import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
    },

    card_notepad: {
        backgroundColor: 'white',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    },

    style_notepad :{
        flexDirection:'row',
        width:'100%',
    },

    notepad :{
        width:'81%', 
        alignSelf:'center',
    },

    line :{
        width:2, 
        height:'100%', 
        backgroundColor:'#d9d9d9', 
        marginLeft:10
    },

    touch_delete :{
        left:13,
        alignSelf:'center'
    },

    icon_create_note: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: '#F9A826',
        borderRadius: 90,
        padding: 10
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