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


import * as Device from 'expo-device';



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
    const [idhp, setIdhp] = useState('')
    const [ori, setOri] = useState(false)
    const getId = () => {
        const deviceId = Device.osBuildId;
        setIdhp(deviceId)
    }
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
                        if (data.nip == item.nip) {

                            if (data.tanggal == tanggal_verif) {
                                setCheck(true)
                                console.log('done1')
                            }
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
                getId()
                getPresensi()
                if (user != null) {
                    if (user.email.toLocaleLowerCase() != 'admin@gmail.com') {
                        setVerif(true)
                    }
                    //                     else if (user.email.toLocaleLowerCase() == 'admin@gmail.com'){
                    // set
                    //                     }
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

    console.log(ori)

    return (
        <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
            {/* {ori == false && (
                <View>
                    <Text>Maaf anda harus login menggunakan hp yang digunakan saat mendaftar..</Text>
                </View>
            )} */}
            {verif == true && (
                <View style={styles.container}>
                    <Image
                        style={styles.stretch}
                        source={require("../../assets/vector.png")}
                    />
                    <Text style={styles.text_absent}>ABSENSI</Text>
                    <Text style={styles.text_online}>ONLINE</Text>
                    <Text style={styles.text_users}> User</Text>
                    {pengguna.map((item, index) => (

                        <View key={index} style={{}}>
                            <View >
                                {item.email.toLowerCase() == email.toLowerCase() && (
                                    <View>
                                        <Text style={styles.name}>{item.nama}</Text>
                                        <Text style={styles.nip}>{item.nip}</Text>
                                        {/* {check == false && ( */}
                                        <TouchableOpacity style={styles.button_absent}
                                            onPress={() => {

                                                // handleMasuk(item.nama, item.nip)
                                                // getInfo()
                                                navigation.navigate('PresensiKonfirmasi', {
                                                    pengguna1: pengguna,
                                                    presensi1: presensi,
                                                    verif: true,
                                                    email: email,
                                                    idhp: item.idhp,
                                                    id: item.id
                                                })
                                            }}
                                        >

                                            <Text style={styles.button_text_absent}>Lakukan Presensi</Text>
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
                <View style={styles.container_verif_false}>

                    <Image
                        style={styles.image_not_verif}
                        source={require("../../assets/not-user.png")}
                    />

                    <Text style={styles.text_not_verif}>Maaf fitur ini hanya tersedia bagi yang terdaftar sebagai pengguna biasa..</Text>
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