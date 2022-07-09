import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', 
        height:'100%',
        padding:10,
        paddingBottom:100,
    },

    select_box : {
        borderWidth: 1,
        borderRadius: 10,
        height:51,
        width: '100%',
        borderColor: '#D7DBDD',
        paddingLeft: 38,
        marginBottom:10,
    },
   
    card_absent: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 15,
        margin:10,
        marginVertical:8,
        borderRadius: 8,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,
    },

    data_absent: {
        paddingLeft: 8,
        width: '98%',
    },

    position_name : {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },

    text_name : {
        fontSize: 18, 
        fontFamily: 'poppinssemibold', 
        paddingBottom: 7, 
        color: 'grey', 
        width:'90%'
    },

    text_description :{
        paddingBottom: 12, 
        color: 'grey', 
        fontFamily: 'poppins'
    },

    date :{
        textAlign: 'right', 
        paddingBottom: 7, 
        color: 'grey', 
        fontFamily: 'poppins'
    },

    time :{
        fontSize: 16, 
        color: 'grey', 
        alignSelf: 'center', 
        fontFamily: 'poppins'
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
        borderRadius: 7,
        borderColor: 'grey',
    },
    button: {
        backgroundColor: '#118eeb',
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
        padding: 10
    },

   

    list2: {
        backgroundColor: '#118eeb',
        height: 26,
        width: 5,
    },

    

    btnHapus: {
        backgroundColor: 'brown',
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
    },

    cari: {
        flexDirection: 'row',
        display: 'flex',
        alignSelf: 'center',

    }, 

    notUser :{
        resizeMode: 'stretch',
        width:260,
        height: 245
        // marginBottom: 10,
        // marginTop: 10
    },
})

export default styles