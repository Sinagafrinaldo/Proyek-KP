import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const styles2 = StyleSheet.create({
    container: {
        backgroundColor: '#F5FBFF',
        height: '100%'
    },

    container2: {
        backgroundColor: 'white',
        height: '100%',
    },

    ikonAdd: {
        position: 'absolute',
        bottom: 30,
        right: 40,
        backgroundColor: '#118eeb',
        borderRadius: 100,
        // borderWidth: 1
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

    list1: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: 330,
        padding: 15,
        margin: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    list2: {
        backgroundColor: '#118eeb',
        height: 26,
        width: 5,
    },

    data: {
        paddingLeft: 8,
        width: '98%',
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

    }
})

export default styles2