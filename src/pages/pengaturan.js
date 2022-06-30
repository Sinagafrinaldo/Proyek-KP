import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import styles from "../component/stylePengaturan";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";

const Pengaturan = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Bantuan");
                }}>
                <View style={styles.text}>
                    <Text style={{ color: 'gray', fontFamily: 'poppins' }}>Bantuan</Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={22}
                      color="gray"
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Tentang");
                }}>
                <View style={styles.text}>
                    <Text style={{ color: 'gray', fontFamily: 'poppins' }}>Tentang Aplikasi</Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={22}
                      color="gray"
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Privasi");
                }}>
                <View style={styles.text}>
                    <Text style={{ color: 'gray', fontFamily: 'poppins' }}>Privasi dan Keamanan</Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={22}
                      color="gray"
                    />
                </View>
            </TouchableOpacity>

            <View style={styles.line}></View>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Kontak");
                }}>
                <View style={styles.text}>
                    <Text style={{ color: 'gray', fontFamily: 'poppins' }}>Kontak</Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={22}
                      color="gray"
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.line}></View>

            <TouchableOpacity onPress={() => Linking.openURL('google.navigation:q=kominfo+bandar+lampung')}>
                <View style={styles.text}>
                    <Text style={{ color: 'gray', fontFamily: 'poppins' }}>Lokasi</Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={22}
                      color="gray"
                    />
                </View>
            </TouchableOpacity>
            <View style={styles.line}></View>

        </View>
    )
}

export default Pengaturan