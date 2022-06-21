import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#F5FBFF'
    },

    wrap1: {
        backgroundColor: '#1F76C6',
        padding: 13,
        marginTop:10,
        
    },

    pageScroll :{
        height:1000, 
    },

    infoProfil :{
        marginTop:-330,
        alignSelf:'center',
        opacity: 1,
        backgroundColor: 'rgba(13,53,89, 0.5)',
        borderRadius:10,
        width: '95%',
        height: 174,
        alignItems: 'center',
        justifyContent: 'center',
    },

    dummy: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        marginLeft:15,
    },

    wrap2: {
        flexDirection:'row',
        marginTop:-128,
    },

    stretch: {
        marginTop:-48,
        resizeMode: 'stretch',
        width: '100%',
        opacity:0.6,
      },

    
    namaProfil :{
        marginTop: 5,
    },

    mainMenu :{
        alignSelf:'center',
        borderRadius:10,
        width:'95%',
        marginTop:30,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    baris: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:15,

    },
    title: {
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',

    },
    title2: {
        fontSize: 24,
        color:'white',
        paddingLeft:30,
        paddingRight:30,
        fontWeight: 'bold',
    },

    title3: {
        fontSize: 24,
        color:'white',
        paddingLeft:30,
        paddingRight:30,
        fontWeight: 'bold',
    },


    wrapikon: {
        display: 'flex',
        flexDirection: 'row'
    },
    ikon1: {
        marginHorizontal: 10,
        marginTop: 6
    },
    ikon2: {
        marginHorizontal: 10,
    },
   
    bgmenu: {
        backgroundColor: '#1F76C6',
        height: 60,
        width: 60,
        marginHorizontal: 30,
        justifyContent: 'center',
        borderRadius: 10
    },
    ikonMenu: {
        alignSelf: 'center'
    },
    fontBlack :{
        textAlign: "center", 
        fontWeight: "700", 
        color: 'gray',
        padding:5,
    },
})

export default styles