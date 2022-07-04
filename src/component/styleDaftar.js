import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
    },

    header: {
        backgroundColor: '#118eeb',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        height: 510,
        justifyContent: 'center',

    },

    title: {
        textAlign: 'center',
        paddingBottom: 20,
        color: 'white',
        fontSize: 28,
        fontWeight: '700',
        width: '80%',
        marginLeft: '10%',
    },

    stretch: {
        alignSelf: 'center',
        resizeMode: 'stretch',
        width: 330,
        height: 260,

    },

    back: {
        position: 'absolute',
        left: 30,
        top: 50
    },

    card_registration: {
        marginTop: -175,
        marginBottom: 10,
        paddingTop: 25,
        paddingBottom: 30,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '94%',
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

    title_registration :{
        marginBottom: 5, 
        alignSelf: 'center', 
        color: '#118eeb', 
        fontWeight: 'bold', 
        fontSize: 18
    },

    line : { 
        width: '70%', 
        height: 1.5, 
        alignSelf: 'center', 
        backgroundColor: '#D7DBDD' 
    },

    title_box :{
        color: 'gray', 
        marginTop: 20, 
        marginBottom: 5
    },

    icon_box: {
        position: 'absolute',
        bottom: 14,
        paddingLeft: 10
    },

    box_input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        padding: 10,
        borderColor: '#D7DBDD',
        paddingLeft: 38,

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
        backgroundColor: '#118eeb',
        marginTop: 35,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10
    },

    teks_registration: {
        padding: 6,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default styles