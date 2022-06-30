import { View, Text } from 'react-native'
import React from 'react'

const DetailCatatan = ({ route, navigation }) => {
    const { judul, isi } = route.params
    return (
        <View>
            <Text>DetailCatatan</Text>
            <Text>{judul}</Text>
            <Text>{isi}</Text>
        </View>
    )
}

export default DetailCatatan