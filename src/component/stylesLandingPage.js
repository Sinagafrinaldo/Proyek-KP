import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white'
    },
    wrap1: {
        backgroundColor: '#1F76C6',
        padding: 20,
        paddingBottom: 90,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },

    baris: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    title: {
        fontSize: 26,
        color: 'white',
        fontWeight: '500',

    },
    title2: {
        fontSize: 16,
        color: 'white',
    },
    title3: {
        fontSize: 16,
        color: 'white',
        marginTop: 10
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
    dummy: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        marginTop: -10
    },
    wrap2: {
        alignItems: 'center',
        marginTop: 20
    },
    stretch: {
        width: 345,
        height: 174,
        resizeMode: 'stretch',
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
    }
})

export default styles