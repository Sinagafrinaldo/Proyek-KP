import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },

    container2: {
        backgroundColor: 'white',
        height: '100%',
    },
    
    ikonAdd: {
        position: 'absolute',
        bottom: 30,
        right: 40
    },
    input: {
        borderWidth: 1,
        margin: 20,
        padding: 20
    },
    box_tanggal: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 7
    },
    button: {
        backgroundColor: 'brown',
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
        padding: 10
    },

    list :{
        backgroundColor: 'white',
        padding:10,
        margin:10,
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

    btnHapus :{
        backgroundColor: 'brown', 
        padding: 10, 
        marginTop: 10,
        borderRadius:8,
    },

    cari :{
        flexDirection: 'row',
        display: 'flex',
        alignSelf:'center',

    }
})

export default styles