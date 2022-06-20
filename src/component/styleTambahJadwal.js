import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },

   bg :{
        backgroundColor:'#1F76C6', 
        height:300,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
   },

    card: {
        marginTop:-230,
        marginBottom:70,
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: "94%",
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

    card2 :{
        padding: 0,
    },

    ikonAdd: {
        position: 'absolute',
        bottom: 30,
        right: 40
    },
    input: {
        borderWidth: 1,
        marginTop: 8,
        marginBottom: 15,
        padding: 8,
        height:45,
        borderRadius:8,
    },

    button: {
        backgroundColor: 'brown',
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginTop:10,
        marginBottom: 8,

    },
    box_tanggal: {
        height:45,
        padding: 10,
        borderWidth: 1,
        borderRadius: 7
    }
})

export default styles