import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
// import { WebView } from 'react-native-webview';

const Tentang = () => {
    return (
        <View style={{ backgroundColor: 'white', height: '100%', padding: 15 }}>
            <Text style={{ color: 'gray', fontSize: 24, fontFamily: 'poppinsbold', alignSelf: 'center', marginBottom: 10 }}>Tentang Aplikasi</Text>
            <Text style={{ textAlign: 'justify', color: 'gray', fontFamily: 'poppins' }}>
                BalamApp adalah aplikasi yang dibangun untuk mempermudah pegawai Kominfo Bandar Lampung dalama melalakukan absensi. Selain itu, aplikasi ini juga menyediakan fitur lain, seperti penjadwalan liputan, Pengingat, Catatan, dan lainnya. Dengan adanya fitur-fitur tersebut, diharapkan dapat mempermudah pegawai, khususnya dalam melakukan absensi.
            </Text>
        </View>
    )
}

export default Tentang