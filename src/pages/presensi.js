import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts';
import styles from "../component/stylePresensi";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { db } from '../firebase/crudConf';
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
const Presensi = ({ navigation }) => {
    const [alerts, setShowAlert] = useState(false);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const usersCollectionRef = collection(db, "pengguna");
    const presensiCollectionRef = collection(db, "presensi");
    const [email, setEmail] = useState('')
    const [pengguna, setPengguna] = useState([])
    const [verif, setVerif] = useState(false)
    const [nama, setNama] = useState('')
    const [nip, setNip] = useState('')
    const [presensi, setPresensi] = useState([])
    const [check, setCheck] = useState(false)



    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getPresensi = async () => {
        const data = await getDocs(presensiCollectionRef);
        setPresensi(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const createPresensi = async (nama, onlyTime, nip, onlyDate) => {
        await addDoc(presensiCollectionRef, { nama: nama, waktu: onlyTime, nip: nip, tanggal: onlyDate, keterangan: 'Hadir' });
    };
    const handleMasuk = (nama, nip) => {
        let today = new Date()
        let onlyDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        let onlyTime = today.getHours() + ':' + today.getMinutes() + ' WIB'
        createPresensi(nama, onlyTime, nip, onlyDate)
        setShowAlert(true)
    }
    const getInfo = () => {
        // console.log(pengguna)
        pengguna.map((item, index) => {
            if (item.email.toLowerCase() == email.toLowerCase()) {
                if (presensi.length < 1) {
                    setCheck(false)
                } else {
                    presensi.map((data, index) => {
                        let today = new Date()
                        let tanggal_verif = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
                        if (data.nip == item.nip && data.tanggal == tanggal_verif) {
                            setCheck(true)
                            console.log('done1')

                        } else {
                            setCheck(false)
                            console.log('belum')
                        }
                    })
                }
            }
        })
    }
    useFocusEffect(
        React.useCallback(() => {

            const unsubscribe = auth.onAuthStateChanged(user => {
                getPresensi()
                if (user != null) {
                    if (user.email != 'admin@gmail.com') {
                        setVerif(true)
                    }
                    setEmail(user.email)
                    getUsers();
                    getInfo()

                } else {
                    setVerif(false)
                    setPengguna([])
                }
            })

            return unsubscribe
        }, [])
    );

    return (
        <ScrollView  contentContainerStyle={{backgroundColor:'white', flexGrow: 1}}>
            {verif == true && (
                <View style={styles.card}>
                    <Image
                        style={styles.stretch}
                        source={require("../../assets/vector.png")}
                    />
                    <Text style={{ fontSize: 34, fontFamily: 'poppinssemibold', color: '#118eeb', textAlign: 'center', }}>ABSENSI</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'poppins', color: 'gray', marginBottom: 30, textAlign: 'center', }}>ONLINE</Text>
                    <Text style={{ color: 'gray', fontFamily: 'poppinssemibold', textAlign: 'center', }}> User</Text>
                    {pengguna.map((item, index) => (

                        <View key={index} style={{}}>
                            <View >
                                {item.email.toLowerCase() == email.toLowerCase() && (
                                    <View>
                                        <Text style={styles.title2}>{item.nama}</Text>
                                        <Text style={styles.title3}>{item.nip}</Text>
                                        {/* {check == false && ( */}
                                        <TouchableOpacity style={styles.cekin}
                                            onPress={() => {

                                                // handleMasuk(item.nama, item.nip)
                                                // getInfo()
                                                navigation.navigate('PresensiKonfirmasi', {
                                                    pengguna1: pengguna,
                                                    presensi1: presensi,
                                                    verif: true,
                                                    email: email
                                                })
                                            }}
                                        >

                                            <Text style={styles.teksin}>Lakukan Presensi</Text>
                                        </TouchableOpacity>
                                        {/* )} */}
                                        {/* {check == true && (
                                                <TouchableOpacity style={styles.cekin}
                                                    onPress={() => {

                                                        // handleMasuk(item.nama, item.nip)
                                                        getInfo()
                                                    }}
                                                >

                                                    <Text style={styles.teksin}>Anda Sudah Presensi</Text>
                                                </TouchableOpacity>
                                            )} */}
                                    </View>
                                )}

                            </View>
                        </View>
                    ))}
                </View>
            )}

            {verif == false && (
                <View style={{ padding:10, flex:1, display:'flex', flex:1, justifyContent: 'center', alignItems: 'center', }}>

                    <Image
                        style={styles.notUser}
                        source={require("../../assets/not-user.png")}
                    />

                    <Text style={{ textAlign: 'center', color :'gray',fontFamily: 'poppins' }}>Maaf fitur ini hanya tersedia untuk user yang telah mendaftar..</Text>
                </View>
            )}

            {/* <Button title='Presensi Sekarang' onPress={() => setShowAlert(true)} /> */}
            <AwesomeAlert

                show={alerts}
                showProgress={false}
                title="Presensi"
                message="          Berhasil melakukan presensi!                "
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                // showCancelButton={true}
                showConfirmButton={true}
                // cancelText="No, cancel"
                confirmText="  Ok  "
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowAlert(false)
                }}
                onConfirmPressed={() => {
                    setShowAlert(false)
                }}
            />
        </ScrollView>
    )
}

export default Presensi