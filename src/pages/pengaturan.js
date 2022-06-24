import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import styles from "../component/stylePengaturan";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Pengaturan = ({navigation}) => {
    return (
        <View style={styles.container}>  
            
            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate("Bantuan");
                }}>
                <View style={styles.text}>
                    <Text style={{color:'gray'}}>Bantuan</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>

            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate("Tentang");
                }}>
                <View style={styles.text}>
                    <Text style={{color:'gray'}}>Tentang Aplikasi</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>

            <TouchableOpacity 
                onPress={() => {
                    navigation.navigate("Tentang");
                }}>
                <View style={styles.text}>
                    <Text style={{color:'gray'}}>Privasi dan Keamanan</Text>
                </View>
            </TouchableOpacity>
            
            <View style={{width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>
            
            <TouchableOpacity 
            onPress={() => {
                navigation.navigate("Kontak");
            }}>
                <View style={styles.text}>
                    <Text style={{color:'gray'}}>Kontak</Text>
                </View>
            </TouchableOpacity>
            <View style={{width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>
            
            <TouchableOpacity onPress={() => Linking.openURL('google.navigation:q=kominfo+bandar+lampung')}>
            <View style={styles.text}>
                <Text style={{color:'gray'}}>Lokasi</Text>
            </View> 
            </TouchableOpacity>
            <View style={{width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>
              
        </View>
    )
}

export default Pengaturan