import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import styles from '../component/styleLogin'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from '../firebase/crudConf';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"

const Daftar = ({ navigation }) => {
    // const navigation = useNavigation();
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const usersCollectionRef = collection(db, "pengguna");
    const [status, setStatus] = React.useState(false)
    const [nama, setNama] = React.useState('');
    const [nip, setNip] = React.useState('');
    const [confPw, setConfPw] = React.useState('');

    const createUser = async () => {
        await addDoc(usersCollectionRef, { nama: nama, nip: nip, email: email });
    };

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Registered with:', user.email);
                alert("Selamat akun anda telah terdaftar.")
                navigation.navigate('Beranda')
            })
            .catch(error => {
                // console.log(error.code)
                switch (error.code) {
                    case "auth/email-already-in-use":
                        alert("Maaf akun dengan email tersebut telah terdaftar.")
                        break

                    // default:
                    //     alert("Autentifikasi gagal, silahkan coba lagi nanti.")
                }
            })
    }

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

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>

                    <View style={styles.wrap1}>

                        <Text style={styles.login}>Selamat Datang di Menu Daftar</Text>
                    </View>
                    <TouchableOpacity style={styles.back}
                        onPress={() => { navigation.goBack() }}>
                        <Ionicons

                            name="arrow-back"
                            size={34}
                            color="white"
                        />
                    </TouchableOpacity>
                    <View style={styles.card}>
                        <Text>Nama</Text>

                        <TextInput
                            onChangeText={nama => setNama(nama)}
                            value={nama}
                            style={styles.boxnip}
                            placeholder='Nama Lengkap ...'
                        />

                        <Text>NIP</Text>

                        <TextInput
                            onChangeText={nip => setNip(nip)}
                            value={nip}
                            style={styles.boxnip}
                            placeholder='NIP'
                        />
                        <Text>Email</Text>

                        <TextInput
                            onChangeText={email => onChangeEmail(email)}
                            value={email}
                            style={styles.boxnip}
                            placeholder='Email...'
                        />

                        <Text style={{ marginTop: 20 }}>Kata Sandi</Text>
                        <TextInput

                            onChangeText={password => onChangePassword(password)}
                            value={password}
                            style={styles.boxnip}
                            placeholder='Kata Sandi...'
                            secureTextEntry
                        />
                        <Text style={{ marginTop: 20 }}>Konfirmasi Sandi</Text>
                        <TextInput

                            onChangeText={confPw => setConfPw(confPw)}
                            value={confPw}
                            style={styles.boxnip}
                            placeholder='Konfirmasi Kata Sandi...'
                            secureTextEntry
                        />
                        <TouchableOpacity style={styles.tombol} onPress={() => {
                            if (confPw != password) {
                                alert('Maaf, konfirmasi sandi tidak sama dengan kata sandi.')
                            } else {
                                handleSignUp()
                                createUser()

                            }
                        }
                        }>
                            <Text style={styles.tekslogin}>Daftar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Daftar