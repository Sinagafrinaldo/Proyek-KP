import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        borderColor: 'black',
        flex: 1,
        height:'100%',
        marginBottom: 20,
        paddingHorizontal: 10,
        marginTop:-25,
    },
    
    box_input: {
        borderBottomWidth: 1,
        padding: 10,
        marginVertical: 3,
        width: '100%',
        borderColor: 'gray',
    },
    waktu: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    data :{
        flexDirection:'row',
    },

    head: {
        backgroundColor: '#007874',
        width: 280,
        height:140,
        padding: 12,
        paddingLeft: 15,
        borderBottomLeftRadius: 10,
        borderTopStartRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 90,
        marginLeft:6,
        justifyContent:'center',
        marginTop:-170,
        shadowColor: "#007874",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },

    card :{
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

    stretch: {
        alignSelf:'center',
        resizeMode: 'stretch',
        width: 330,
        height:260,
        marginLeft:-237,
        marginTop:-260,
    },

    background: {
        alignSelf:'center',
        resizeMode: 'stretch',
        width: '110%',
        height:260,
    },

    teks_isi: {
        color: 'white',
        fontSize: 18,
        marginTop:15,
        fontWeight:'bold'

    },
    teks_judul: {
        color: 'white',
        fontSize: 18,
        fontWeight:'bold'
    },
    
    box_opsi: {
        borderWidth: 1,
        marginVertical: 5,
        width: 90,
        backgroundColor: '#d1d1d1',
        marginHorizontal: 2,
    },
    tombol: {
        marginVertical:15,
        padding: 10,
        backgroundColor: 'purple',
        borderRadius: 5,

    },
    teks: {
        color: 'white',
        fontSize: 16,
        padding:6,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    wrapper: {
        backgroundColor: '#0041a3',
        marginTop: '10%',
        height: 300

    },
    judul_besar: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold'
    },
})

export default styles