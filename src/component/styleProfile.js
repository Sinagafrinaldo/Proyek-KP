import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        display: 'flex', 
        backgroundColor: 'white'
    },

    content: {
        // marginHorizontal: 5,
        backgroundColor: 'white',
        minHeight: '100%',
        // padding: 30,
        // paddingTop: 0
    },

    background :{
        backgroundColor: '#66baff', 
        height: 90,
    },

    symbol: {
        minHeight: 100,
        minWidth: 100,
        borderRadius: 100,
        backgroundColor: '#171F1D',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,
    },

    image :{
        height: 100, 
        borderRadius: 100, 
        width: 100
    },

    touch : {
        backgroundColor: '#F9A826',
        marginTop: 10,
        padding: 10,
        width : '40%',
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

    text_edit: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppinssemibold'
    },

    line :{
        borderBottomWidth: 1, 
        borderColor: 'black', 
        marginBottom: 10, 
        borderColor: 'gray'
    },

    title: {
        color: '#949494',
        fontFamily: 'poppins'
    },

    subtitle: {
        color: '#4c4c4c',
        fontSize: 16,
        // fontWeight: '500'
        fontFamily: 'poppinssemibold'
    },

    wrap_item: {
        marginVertical: 10
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