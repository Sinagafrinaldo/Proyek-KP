import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Ionicons from "react-native-vector-icons/Ionicons";
const Catatan = ({ navigation }) => {
    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <View>
                <Text>Hallo</Text>

            </View>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Tambah Catatan') }}
                style={styles.wrapikon}>
                <Ionicons
                    style={styles.ikon2}
                    name="add"
                    size={34}
                    color="white"
                />
            </TouchableOpacity>

        </View>
    )
}

export default Catatan

const styles = StyleSheet.create({
    ikon2: {


    },
    wrapikon: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: 'brown',
        borderRadius: 90,
        padding: 10
    }
})