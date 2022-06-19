import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../component/styleLogin'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
// import * as firebase from 'firebase';


const Keluar = () => {
    const navigation = useNavigation()
    const [email, onChangeNip] = React.useState('');
    const [password, onChangePassword] = React.useState('');
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
                console.log('Registered with:', user.email);
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
                console.log('Signed In!')
                const user = userCredential.user
                console.log(user)
                navigation.navigate('Beranda')
            })
            .catch(error => {
                console.log(error)
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
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            {status == false && (
                <View style={styles.container}>
                    <View style={styles.wrap1}>
                        <Text style={styles.login}>Selamat Datang di Menu Login</Text>
                    </View>
                    <View style={styles.card}>

                        <Text style={{ marginBottom: 5 }}>Email</Text>

                        <TextInput
                            onChangeText={email => onChangeNip(email)}
                            value={email}
                            style={styles.boxnip}
                            placeholder='Email...'
                        />
                        <Text style={{ marginTop: 20, marginBottom: 5 }}>Kata Sandi</Text>
                        <TextInput

                            onChangeText={password => onChangePassword(password)}
                            value={password}
                            style={styles.boxnip}
                            placeholder='Kata Sandi...'
                            secureTextEntry
                        />
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
                    <Text>Anda sudah login</Text>
                    <TouchableOpacity style={styles.tombol} onPress={() => {


                        signOutUser()
                        setStatus(false)
                    }}>
                        <Text style={styles.tekslogin}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    )
}

export default Keluar