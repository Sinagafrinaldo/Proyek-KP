import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import styles from '../component/styleLogin'
import styles2 from '../component/styleLogout'
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

    // const handleSignUp = () => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //             // console.log('Registered with:', user.email);
    //             alert("Selamat akun anda telah terdaftar!")
    //         })
    //         .catch(error => alert(error.message))
    // }
    // const signOutUser = async () => {
    //     try {
    //         await auth.signOut();

    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

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
            contentContainerStyle={{backgroundColor:'white', flexGrow: 1}}>
            
            {status == false && (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Selamat Datang</Text>

                        <Image
                            style={styles.stretch}
                            source={require("../../assets/login.png")}
                        />
                    </View>

                    <TouchableOpacity style={styles.back}
                        onPress={() => { navigation.goBack() }}>
                        <Ionicons

                            name="arrow-back"
                            size={34}
                            color="white"
                        />
                    </TouchableOpacity>
                    
                    <View style={styles.card_login}>
                        <Text style={styles.title_login }>LOGIN</Text>
                        <View style={styles.line}></View>
                        
                        <Text style={styles.title_email}>Email</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                style={styles.icon_box}
                                name="mail"
                                size={20}
                                color="#D7DBDD"
                            />
                            <TextInput
                                onChangeText={email => onChangeNip(email)}
                                value={email}
                                style={styles.box_input}
                                placeholder='Email...'
                            />
                        </View>

                        <Text style={styles.title_password}>Kata Sandi</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                style={styles.icon_box}
                                name="eye-off"
                                size={20}
                                color="#D7DBDD"
                            />
                            <TextInput
                                onChangeText={password => onChangePassword(password)}
                                value={password}
                                style={styles.box_input}
                                placeholder='Kata Sandi...'
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.touch} onPress={handleSignIn}>
                            <Text style={styles.text_login}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.registration}>
                            <Text>Belum punya akun?</Text>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Daftar");
                                    }}>
                                    <Text style={styles.text_registration}>  Daftar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

            )}

            {status == true && (
                <View>
                    <View style={styles2.container}>
                        <View style={styles2.card_logout}>
                            <Text style={styles2.title_logout}>Logout</Text>
                            <View style={styles2.line}></View>
                            <Text style={styles2.text_out}>Apakah anda yakin ingin keluar?</Text>
                            <View style={styles2.style_touch}>
                                <TouchableOpacity style={styles2.touch_cancel} onPress={() => {


                                    navigation.navigate('Beranda')
                                }}>
                                    <Text style={styles2.text_cancel}>Batal</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles2.touch_logout} onPress={() => {


                                    signOutUser()
                                    setStatus(false)
                                }}>
                                    <Text style={styles2.text_logout}>Logout</Text>
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