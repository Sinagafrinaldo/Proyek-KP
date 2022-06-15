import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
    },
    wrap1: {
        backgroundColor: '#1F76C6',
        padding: 20,
        paddingBottom: 40,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
    },
    baris: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
        fontFamily: 'poppins'

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
        marginHorizontal: 10
    },
    ikon2: {
        marginHorizontal: 10
    },
    dummy: {
        height: 40,
        width: 40,
        borderRadius: 30,
        backgroundColor: 'white'
    },
    wrap2: {
        alignItems: 'center',
        marginTop: 20
    }
})

export default styles