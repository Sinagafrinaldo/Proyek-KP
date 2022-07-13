import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import styles from '../component/styleDaftar'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from '../firebase/crudConf';
import * as Device from 'expo-device';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"
import { Picker } from "@react-native-picker/picker";


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

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
    const [refreshing, setRefreshing] = React.useState(false);
    const [idhp, setIdhp] = useState('')
    const [asn, setAsn] = useState('ASN')
    const [golongan, setGolongan] = useState('')
    const createUser = async () => {
        await addDoc(usersCollectionRef, { nama: nama, nip: nip, email: email, idhp: idhp, asn: asn, golongan: golongan });
    };

    const getId = () => {

        const deviceId = Device.osBuildId;

        setIdhp(deviceId)


    }

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                createUser()
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
            getId()
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user) {
                    setStatus(true)
                }
            })

            return unsubscribe
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setNama();
        setNip();
        onChangeEmail();
        onChangePassword();
        setConfPw();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            } contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
            <View style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>Selamat Datang</Text>
                        <Image
                            style={styles.stretch}
                            source={require("../../assets/daftar.png")}
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

                    <View style={styles.card_registration}>
                        <Text style={styles.title_registration}>DAFTAR</Text>
                        <View style={styles.line}></View>
                        
                        <Text style={styles.title_box}>Nama</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                style={styles.icon_box}
                                name="person"
                                size={20}
                                color="#ABB2B9"
                            />
                            <TextInput
                                onChangeText={nama => setNama(nama)}
                                value={nama}
                                style={styles.box_input}
                                placeholder='Nama Lengkap ...'
                            />
                        </View>

                        <Text style={styles.title_box}>NIP</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                style={styles.icon_box}
                                name="document-text"
                                size={20}
                                color="#ABB2B9"
                            />
                            <TextInput
                                onChangeText={nip => setNip(nip)}
                                value={nip}
                                style={styles.box_input}
                                placeholder='NIP...'
                            />
                        </View>

                        <Text style={styles.title_box}>Email</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                style={styles.icon_box}
                                name="mail"
                                size={20}
                                color="#ABB2B9"
                            />
                            <TextInput
                                onChangeText={email => onChangeEmail(email)}
                                value={email}
                                style={styles.box_input}
                                placeholder='Email...'
                            />
                        </View>

                        <Text style={styles.title_box}>ASN/Non-ASN</Text>
                        <View style={{...styles.select_box}}>
                            <Picker
                                placeholder="Pilih Pengguna"
                                selectedValue={asn}
                                // style={styles2.box_opsi}
                                style={{ marginLeft: -30, marginTop:-3, color :'gray'}}
                                onValueChange={(asn) => {
                                    setAsn(asn);
                                }}
                            >
                                <Picker.Item label='ASN' value='ASN' />
                                <Picker.Item label='Non-ASN' value='Non-ASN' />
                            </Picker>
                        </View>

                        <Text style={styles.title_box}>Golongan</Text>
                        <View style={{...styles.select_box}}>
                            <Picker
                                placeholder="Pilih Pengguna"
                                selectedValue={golongan}
                                // style={styles2.box_opsi}
                                style={{ marginLeft: -30, marginTop:-3, color :'gray'}}
                                onValueChange={(golongan) => {
                                    setGolongan(golongan);
                                }}
                            >
                                <Picker.Item label='-' value='-' />
                                <Picker.Item label='I' value='I' />
                                <Picker.Item label='II' value='II' />
                                <Picker.Item label='III' value='III' />
                                <Picker.Item label='IV' value='IV' />
                            </Picker>
                        </View>



                        <Text style={styles.title_box}>Kata Sandi</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                style={styles.icon_box}
                                name="eye-off"
                                size={20}
                                color="#ABB2B9"
                            />
                            <TextInput
                                onChangeText={password => onChangePassword(password)}
                                value={password}
                                style={styles.box_input}
                                placeholder='Kata Sandi...'
                                secureTextEntry
                            />
                        </View>

                        <Text style={styles.title_box}>Konfirmasi Sandi</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons
                                style={styles.icon_box}
                                name="eye-off"
                                size={20}
                                color="#ABB2B9"
                            />
                            <TextInput

                                onChangeText={confPw => setConfPw(confPw)}
                                value={confPw}
                                style={styles.box_input}
                                placeholder='Konfirmasi Kata Sandi...'
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity style={styles.touch} onPress={() => {
                            if (confPw != password) {
                                alert('Maaf, konfirmasi sandi tidak sama dengan kata sandi.')
                            } else if (nama == '' || email == '' || nip == '' || asn == '', golongan == '') {
                                alert('Silahkan mengisi semua kolom pendaftaran.')
                            } else {
                                handleSignUp()
                            }
                        }
                        }>
                            <Text style={styles.teks_registration}>Daftar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Daftar