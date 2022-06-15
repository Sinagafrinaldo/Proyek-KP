import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import styles from '../component/stylesLandingPage'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Beranda = () => {
    return (
        <View style={styles.container}>
            <View style={styles.wrap1}>
                <View style={styles.baris}>
                    <Text style={styles.title}>BalamApp</Text>
                    <View style={styles.wrapikon}>
                        <Ionicons style={styles.ikon1} name='notifications' size={24} color='white' />
                        <Ionicons style={styles.ikon2} name='menu' size={24} color='white' />
                    </View>
                </View>
                <View style={styles.wrap2}>
                    <View style={styles.dummy}>

                    </View>

                    <Text style={styles.title3}>Selamat Datang</Text>
                    <Text style={styles.title2}>John Doe</Text>

                </View>
            </View>
        </View>
    )
}

export default Beranda
