import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import styles from '../component/styleLogin'
import styles2 from '../component/styleLogout'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import Modal from "react-native-modal";
// import * as firebase from 'firebase';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Keluar = ({ navigation }) => {
    // const navigation = useNavigation()
    const [email, onChangeNip] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [status, setStatus] = useState(false)
    const [modal1, setModal1] = useState(false)
    const handleModal1 = () => setModal1(() => !modal1);
    const forgotPassword = (Email) => {
        sendPasswordResetEmail(auth, Email)
            .then(function (user) {
                // alert('Please check your email...')
            }).catch(function (e) {
                console.log(e)
            })
    }
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user) {
                    setStatus(true)
                    setModal1(true)
                } else {
                    setStatus(false)
                    setModal1(false)
                }
            })

            return unsubscribe
        }, [])
    );


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
    function validateEmail(email) {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    }

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
            contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>

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
                        <Text style={styles.title_login}>LOGIN</Text>
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
                            <Text style={{ fontFamily: 'poppins' }}>Belum punya akun?</Text>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Daftar");
                                    }}>
                                    <Text style={styles.text_registration}>  Daftar</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <Text></Text>
                        <TouchableOpacity
                            style={{ alignItems: 'center' }}
                            onPress={() => {

                                if (validateEmail(email) == true) {
                                    forgotPassword(email)
                                    alert("Silahkan cek email anda untuk reset kata sandi. Email bisa muncul di bagian Spam Email anda.")
                                } else {
                                    alert("Maaf silahkan isi kolom email anda dengan benar.")
                                }
                                // if(email)

                            }}>

                            <Text style={styles.text_registration}>Atur ulang kata sandi.</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            )}

            <Modal
                onBackButtonPress={() => {
                    handleModal1()
                    navigation.goBack()
                }
                }

                style={{ flex: 1, backgroundColor: 'white', padding: 20, borderRadius: 10, maxHeight: 240, justifyContent: 'center', marginTop: '70%' }}
                onBackdropPress={() => {
                    handleModal1()
                    navigation.goBack()
                }
                }
                isVisible={modal1}
            >

                <View style={{}}>
                    <Text style={styles2.title_logout}>Logout</Text>
                    <View style={styles2.line}></View>
                    <Text style={styles2.text_out}>Apakah anda yakin ingin keluar?</Text>
                    <View style={styles2.style_touch}>
                        <TouchableOpacity style={styles2.touch_cancel} onPress={() => {

                            handleModal1()
                            navigation.goBack()
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

            </Modal>

            {/* {status == true && (
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
            )} */}

        </ScrollView>
    )
}

export default Keluar