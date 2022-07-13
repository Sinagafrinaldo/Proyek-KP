import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#edf2f5'
    },

    navbar: {
        backgroundColor: '#118eeb',
        padding: 13,
        paddingTop: 20,
    },

    style_navbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginTop: 15,

    },

    title_app: {
        fontSize: 24,
        color: 'white',
        // fontWeight: 'bold',
        fontFamily: 'poppinssemibold'

    },
    subtitle_app: {
        color: 'white',
        fontFamily: 'poppinssemibold',
        fontSize: 12,
        marginTop: -10
    },

    style_icon_nav: {
        display: 'flex',
        flexDirection: 'row'
    },

    icon_notification: {
        marginTop: 7,
        marginRight: 14,
    },

    icon_person: {
        marginTop: 4,
    },

    line_nav :{
        height: 0.5, 
        backgroundColor: '#D7DBDD',
    },
    
    // background_page :{
    //     height: 240, 
    //     borderBottomEndRadius: 10,
    //     borderBottomStartRadius: 10,
    // },

    background: {
        alignSelf:'center',
        resizeMode: 'stretch',
        width: '110%',
        height:350,
    },

    info_profile: {
        marginTop: -315,
        alignSelf: 'center',
        opacity: 1,
        backgroundColor: 'rgba(13,53,89, 0.5)',
        borderRadius: 10,
        width: '95%',
        height: 174,
        alignItems: 'center',
        justifyContent: 'center',
    },

    stretch: {
        marginTop: -48,
        resizeMode: 'stretch',
        width: '100%',
        opacity: 0.6,
    },

    text_welcome: {
        fontSize: 24,
        color: 'white',
        paddingLeft: 25,
        paddingRight: 30,
        // fontWeight: 'bold',
        fontFamily: 'poppinsbold'
    },

    background_profile: {
        flexDirection: 'row',
        marginTop: -128,
    },

    image_profile :{
        height: 80, 
        borderRadius: 100, 
        width: 80, 
        marginLeft: 20
    },

    wrap_image_profile: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        marginLeft: 20,
    },

    name: {
        fontSize: 14,
        color: 'white',
        paddingLeft: 24,
        paddingRight: 30,
        fontFamily: 'poppinssemibold'
    },

    card: {
        alignSelf: 'center',
        borderRadius: 10,
        width: '90%',
        marginTop: 5,
        padding:5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    title_card :{
        fontSize: 16,
        marginLeft: 18,
        marginVertical: 8,
        marginTop: 25,
        color: 'white',
        fontFamily: 'poppinsbold'
    },

    list_card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical:10,
    },

    bg_menu: {
        backgroundColor: '#118eeb',
        height: 60,
        width: 60,
        marginHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 10
    },

    icon_menu: {
        alignSelf: 'center'
    },

    font_menu: {
        textAlign: "center",
        // fontWeight: "700",
        fontSize: 12,
        color: 'gray',
        padding: 5,
        fontFamily: 'poppinssemibold'
    },

    flatlist_timetable :{
        paddingVertical:30,
        paddingBottom:50,
    },

    text_timetable :{
        fontSize: 16,
        marginLeft: 18,
        marginBottom:15,
        color: 'gray',
        fontFamily: 'poppinsbold'
    },

    card_timetable :{
        backgroundColor: 'white',
        height:220, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        
        elevation: 1,
    },
    
    // Styling Data Jadwal
    list_data: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: 330,
        padding: 15,
        margin: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },

    data: {
        paddingLeft: 8,
        width: '98%',
    },

    style_position_icon_cover_name :{
        flexDirection: 'row', 
        justifyContent: 
        'space-between',
    },

    cover_name :{
        fontSize: 16, 
        fontFamily: 'poppinssemibold', 
        paddingBottom: 7, 
        color: 'grey'
    },

    desc :{
        paddingBottom: 12, 
        color: 'grey', 
        fontFamily: 'poppins'
    },

    date :{
        textAlign: 'right', 
        paddingBottom: 7, 
        color: 'grey', 
        fontFamily: 'poppins',
    },

    style_position_icon_loc :{
        paddingTop: 7, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },

    loc :{
        fontSize: 16, 
        color: 'grey', 
        alignSelf: 'center', 
        fontFamily: 'poppins'
    },
})

export default styles