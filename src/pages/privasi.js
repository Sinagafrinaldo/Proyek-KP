import { View, Text } from 'react-native'
import React from 'react'

const Privasi = () => {
    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={{ padding: 10 }}>
                <Text style={{ color: 'gray', fontSize: 24, fontFamily: 'poppinsbold', alignSelf: 'center', marginBottom: 10 }}>Kebijakan dan Privasi</Text>
                <Text style={{ textAlign: 'justify', color: 'gray', fontFamily: 'poppins' }}>   Dengan menggunakan layanan kami, Anda memercayakan informasi Anda kepada kami. Kami paham bahwa melindungi informasi Anda dan memberikan kontrol kepada Anda adalah tanggung jawab yang besar dan memerlukan kerja keras.</Text>
            </View>
        </View>
    )
}

export default Privasi 