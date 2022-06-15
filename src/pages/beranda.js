import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import styles from '../component/stylesLandingPage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
const Beranda = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrap1}>
                <View style={styles.baris}>
                    <Text style={styles.title}>BalamApp</Text>
                    <View style={styles.wrapikon}>
                        <Ionicons style={styles.ikon1} name='notifications' size={30} color='white' />
                        <Ionicons style={styles.ikon2} name='menu' size={40} color='white' />
                    </View>
                </View>
                <View style={styles.wrap2}>
                    <View style={styles.dummy}>

                    </View>

                    <Text style={styles.title3}>Selamat Datang</Text>
                    <Text style={styles.title2}>John Doe</Text>

                </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: -70 }}>
                <Image style={styles.stretch} source={require('../../assets/siger.png')} />
            </View>

            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20, marginVertical: 8, marginTop: 15 }}>Main Menu</Text>


            <ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row', }}>
                    <View>
                        <View style={styles.bgmenu}>
                            <Ionicons style={styles.ikonMenu} name='calendar' size={34} color='white' />

                        </View>
                        <Text style={{ textAlign: 'center', fontWeight: '700' }}>Jadwal Liput</Text>
                    </View>
                    <View>
                        <View style={styles.bgmenu}>
                            <Ionicons style={styles.ikonMenu} name='newspaper' size={34} color='white' />
                        </View>
                        <Text style={{ textAlign: 'center', fontWeight: '700' }}>Catatan</Text>
                    </View>
                    <View>
                        <View style={styles.bgmenu}>
                            <Ionicons style={styles.ikonMenu} name='megaphone' size={34} color='white' />
                        </View>
                        <Text style={{ textAlign: 'center', fontWeight: '700' }}>Pengingat</Text>
                    </View>

                </View>

                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 30 }}>
                    <View>
                        <View style={styles.bgmenu}>
                            <Ionicons style={styles.ikonMenu} name='calendar' size={34} color='white' />

                        </View>
                        <Text style={{ textAlign: 'center', fontWeight: '700' }}>Jadwal Liput</Text>
                    </View>
                    <View>
                        <View style={styles.bgmenu}>
                            <Ionicons style={styles.ikonMenu} name='newspaper' size={34} color='white' />
                        </View>
                        <Text style={{ textAlign: 'center', fontWeight: '700' }}>Catatan</Text>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <View style={styles.bgmenu}>
                            <Ionicons style={styles.ikonMenu} name='grid' size={34} color='white' />
                        </View>
                        <Text style={{ textAlign: 'center', fontWeight: '700' }}>Lainnya</Text>
                    </View>

                </View>
            </ScrollView>
            <StatusBar style="dark" />
        </View>
    )
}

export default Beranda
