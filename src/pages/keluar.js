import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../component/styleLogin'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Keluar = () => {
    const [nip, onChangeNip] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    return (
        <View style={styles.container}>
            <View style={styles.wrap1}>
                <Text style={styles.login}>Selamat Datang di Menu Login</Text>
            </View>
            <View style={styles.card}>

                <Text>NIP</Text>

                <TextInput
                    onChangeText={nip => onChangeNip(nip)}
                    value={nip}
                    style={styles.boxnip}
                    placeholder='NIP...'
                />
                <Text style={{ marginTop: 20 }}>Kata Sandi</Text>
                <TextInput

                    onChangeText={password => onChangePassword(password)}
                    value={password}
                    style={styles.boxnip}
                    placeholder='Kata Sandi...'
                />
                <TouchableOpacity style={styles.tombol}>
                    <Text style={styles.tekslogin}>Login</Text>
                </TouchableOpacity>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                    <Text>Belum punya akun?</Text>
                    <TouchableOpacity >
                        <Text style={styles.teksdaftar}> Daftar</Text>
                    </TouchableOpacity>
                </View>

            </View>




        </View>
    )
}

export default Keluar