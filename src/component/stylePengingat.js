import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderColor: 'black',
        flex: 1,
        height:'100%',
        marginBottom: 20,
        paddingHorizontal: 10,
        marginTop:-25,
    },
    
    background: {
        alignSelf:'center',
        resizeMode: 'stretch',
        width: '110%',
        height:260,
    },

    card_info_data :{
        flexDirection:'row',
        alignSelf:'center',
        alignItems :'center'
    },

    data: {
        backgroundColor: '#007874',
        width: 280,
        height:140,
        padding: 12,
        paddingLeft: 20,
        borderBottomLeftRadius: 10,
        borderTopStartRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft:37,
        justifyContent:'center',
        marginTop:-198,
        shadowColor: "#007874",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },

    title: {
        color: 'white',
        fontSize: 18,
        fontWeight:'bold'
    },

    description: {
        color: 'white',
        fontSize: 18,
        marginTop:15,
        fontWeight:'bold'
    },

    stretch: {
        alignSelf:'center',
        resizeMode: 'stretch',
        width: 330,
        height:260,
        marginLeft:-237,
        marginTop:-260,
    },
  
    text_description :{
        paddingVertical:10, 
        fontSize:18, 
        fontWeight:'bold', 
        color:'gray'
    },

    card_info :{
        borderRadius:5,
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

    info :{ 
        paddingTop:5,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:15,
    },

    box_input: {
        borderBottomWidth: 1,
        padding: 10,
        marginVertical: 3,
        width: '100%',
        borderColor: 'gray',
    },

    time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    
    box_option: {
        borderWidth: 1,
        marginVertical: 5,
        width: 90,
        backgroundColor: '#d1d1d1',
        marginHorizontal: 2,
    },

    touch: {
        marginVertical:15,
        backgroundColor: 'purple',
        borderRadius: 5,
        backgroundColor: '#F9A826',
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

    text_notification: {
        color: 'white',
        fontSize: 16,
        padding:16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})

export default styles