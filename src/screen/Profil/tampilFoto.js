import { View, Text, Image } from 'react-native'
import React from 'react'

const TampilFoto = ({ navigation, route }) => {
    const { url } = route.params
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ height: '90%', width: '100%' }} source={{ uri: url }} />
        </View>
    )
}

export default TampilFoto