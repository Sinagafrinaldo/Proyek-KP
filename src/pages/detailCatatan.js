import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const DetailCatatan = ({ route, navigation }) => {
    const { judul, isi } = route.params
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{judul}</Text>
            <View style={styles.line}></View>
            <Text style={styles.description}>{isi}</Text>
        </View>
    )
}

export default DetailCatatan


const styles = StyleSheet.create({
    container :{
        flex : 1,
        width : '100%',
        height:'100%',
        backgroundColor :'white',
        padding : 15,
    },
    title :{
        color : 'gray',
        textAlign : 'center',
        fontSize : 20, 
        fontFamily: 'poppinssemibold'
    },

    line :{
        height:2,
        width:'70%',
        alignSelf:'center',
        backgroundColor:'#D6DBDF',
    },

    description :{
        textAlign:'justify',
        marginTop:10,
        fontFamily:'poppins',
        padding:5,
    },
})