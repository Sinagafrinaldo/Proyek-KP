import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import styles from '../component/styleLogin'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
// import * as firebase from 'firebase';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Keluar = () => {
    const navigation = useNavigation()
    const [email, onChangeNip] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [status, setStatus] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user) {
                    setStatus(true)
                }
            })

            return unsubscribe
        }, [])
    );

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log('Registered with:', user.email);
                alert("Selamat akun anda telah terdaftar!")
            })
            .catch(error => alert(error.message))
    }
    const signOutUser = async () => {
        try {
            await auth.signOut();

        } catch (e) {
            console.log(e);
        }
    }
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // console.log('Signed In!')
                alert('Selamat anda berhasil Login!')
                const user = userCredential.user
                // console.log(user)
                navigation.navigate('Beranda')
            })
            .catch(error => {
                // console.log(error.code)
                switch (error.code) {
                    case "auth/invalid-email":
                        alert("Maaf format email yang anda masukkan salah.")
                        break
                    case "auth/user-not-found":
                        alert("Maaf pengguna tidak ditemukan.")
                        break
                    case "auth/wrong-password":
                        alert("Kata sandi yang anda masukkan salah.")
                        break
                    // default:
                    //     alert("Autentifikasi gagal, silahkan coba lagi nanti.")
                }
            })
    }
    // const showConfirmDialog = () => {
    //     return Alert.alert(
    //         "Keluar?",
    //         "Apakah anda yakin ingin keluar dari aplikasi?",
    //         [
    //             {
    //                 text: "Ya",
    //                 onPress: () => {
    //                     signOutUser()
    //                     setStatus(false)
    //                 },
    //             },
    //             {
    //                 text: "Tidak",
    //             },
    //         ]
    //     );
    // };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        onChangeNip();
        onChangePassword();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            style={{ backgroundColor: 'white', }}>
            {status == false && (
                <View style={styles.container}>
                    <View style={styles.wrap1}>
                        <Text style={styles.login}>Selamat Datang di Menu Login</Text>
                    </View>
                    <View style={styles.card}>

                        <Text style={{ marginBottom: 5 }}>Email</Text>
                        
                        <View style={{flexDirection:'row'}}>
                            <Ionicons
                                style={styles.ikonMenu}
                                name="document-text"
                                size={20}
                                color="#ABB2B9"
                            />
                            <TextInput
                                onChangeText={email => onChangeNip(email)}
                                value={email}
                                style={styles.boxnip}
                                placeholder='Email...'
                            />
                        </View>

                        <Text style={{ marginTop: 20, marginBottom: 5 }}>Kata Sandi</Text>

                        <View style={{flexDirection:'row'}}>
                            <Ionicons
                                style={styles.ikonMenu}
                                name="eye-off"
                                size={20}
                                color="#ABB2B9"
                            />
                            <TextInput
                                onChangeText={password => onChangePassword(password)}
                                value={password}
                                style={styles.boxnip}
                                placeholder='Kata Sandi...'
                                secureTextEntry
                            />
                        </View>
                        <TouchableOpacity style={styles.tombol} onPress={handleSignIn}>
                            <Text style={styles.tekslogin}>Login</Text>
                        </TouchableOpacity>
                        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
                            <Text>Belum punya akun?</Text>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Daftar");
                                    }}>
                                    <Text style={styles.teksdaftar}>  Daftar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

            )}

            {status == true && (
                <View>
                    <View style={{ justifyContent: 'center', padding: 40, }}>
                        <View style={styles.cardlog}>
                            <Text style={{ textAlign: 'center', color: '#f75555', fontSize: 18 }}>Logout</Text>
                            <View style={{ borderBottomWidth: 1, borderColor: '#e0e0e0', marginVertical: 10 }}></View>
                            <Text style={styles.textout}>Apakah anda yakin ingin keluar?</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity style={styles.tombol2} onPress={() => {


                                    navigation.navigate('Beranda')
                                }}>
                                    <Text style={styles.teksbatal}>Batal</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tombol} onPress={() => {


                                    signOutUser()
                                    setStatus(false)
                                }}>
                                    <Text style={styles.tekslogin}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )}

        </ScrollView>
    )
}

export default Keluar