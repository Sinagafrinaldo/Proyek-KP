import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container :{
        height:'100%',
        backgroundColor:'white',
        flex:1,
        display:'flex',
        paddingHorizontal:5,
    },

    text_user :{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        color : 'gray',
        fontFamily:'poppins',
        paddingVertical: 8,
    },

    line :{
        height:1,
        backgroundColor:'gray',
        marginBottom:12,

    },

    card :{
        width:'95%',
        marginLeft:'2.5%',
        justifyContent:'center',
        padding :15 ,
        borderRadius:10,
        marginVertical:8,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        
        elevation: 2,
    },

    position : {
        flexDirection:'row',
        justifyContent: 'space-between',
    },

    number :{
        width:25,
        height:25,
        backgroundColor:'#118eeb',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:15,
    },
    position_data :{
        paddingVertical:10,
        alignItems:'center',
    },
    text_name :{
        fontSize:20,
        color:'gray',
        textAlign:'center', 
        fontWeight:'bold',
        fontFamily:'poppinssemibold'
    },

    nip :{
        textAlign:'center',
        fontFamily:'poppins',
        color:'gray',
    },

    touch :{
        width:"100%",
        backgroundColor: '#118eeb',
        borderRadius:10,
    },

    text_detail : {
        padding:16, 
        color:'white', 
        textAlign:'center', 
        fontWeight:'bold',
        fontFamily:'poppinssemibold'
    },
})
export default styles