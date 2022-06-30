import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import AwesomeAlert from 'react-native-awesome-alerts';
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
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from 'react-native-gesture-handler';

const PresensiKonfirmasi = ({ route, navigation }) => {
    const { pengguna1, presensi1, verif, email } = route.params;
    const [alerts, setShowAlert] = useState(false);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const usersCollectionRef = collection(db, "pengguna");
    const presensiCollectionRef = collection(db, "presensi");
    // const [email, setEmail] = useState('')
    const [pengguna, setPengguna] = useState([])
    // const [verif, setVerif] = useState(false)
    const [nama, setNama] = useState('')
    const [nip, setNip] = useState('')
    const [presensi, setPresensi] = useState([])
    const [check, setCheck] = useState(false)
    const [cp, setCp] = useState(false)


    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };
    const getPresensi = async () => {
        const data = await getDocs(presensiCollectionRef);
        setPresensi(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };
    const createPresensi = async (nama, onlyTime, nip, onlyDate) => {
        await addDoc(presensiCollectionRef, { nama: nama, waktu: onlyTime, nip: nip, tanggal: onlyDate, keterangan: 'Hadir', email: email });
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
        pengguna1.map((item, index) => {
            if (item.email.toLowerCase() == email.toLowerCase()) {
                if (presensi1.length < 1) {
                    setCheck(false)
                } else {
                    presensi1.map((data, index) => {
                        let today = new Date()
                        let tanggal_verif = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
                        if (data.nip == item.nip && data.tanggal == tanggal_verif) {
                            setCheck(true)
                            setCp(true)
                            console.log('done1')

                        } else {
                            if (cp == true) {


                                setCheck(false)
                                console.log('belum')
                            }
                        }
                    })
                }
            }
        })
    }
    useFocusEffect(
        React.useCallback(() => {


            // const unsubscribe = auth.onAuthStateChanged(user => {
            //     getPresensi()
            //     if (user != null) {
            //         if (user.email != 'admin@gmail.com') {
            //             // setVerif(true)
            //         }
            //         setEmail(user.email)
            //         getUsers();


            //     } else {
            //         // setVerif(false)
            //         setPengguna([])
            //     }
            // })

            // unsubscribe()
            getInfo()
        }, [])
    );

    return (
        <View style={{ backgroundColor: '#F5FBFF', justifyContent: 'center', flex: 1, display: 'flex' }}>
            {verif == true && (
                <View>

                    {/* <Button title='Data Presensi' onPress={() => {
                        getInfo()
                        console.log(check)
                    }} /> */}
                    {pengguna1.map((item, index) => (

                        <View key={index} style={{}}>
                            {item.email.toLowerCase() == email.toLowerCase() && (
                                <View>
                                    {/* <Text style={styles.title2}>Nama:  {item.nama}</Text>
                                        <Text style={styles.title2}>NIP:  {item.nip}</Text> */}
                                    {check == false && (
                                        <View style={styles.card}>
                                            <TouchableOpacity style={styles.cekin1}
                                                onPress={() => {

                                                    handleMasuk(item.nama, item.nip)
                                                    getInfo()

                                                }}
                                            >
                                                <Ionicons
                                                    style={styles.ikon1}
                                                    name="book"
                                                    size={140}
                                                    color="#1FD851"
                                                />
                                                <Text style={{ fontSize: 18, fontFamily: 'poppinssemibold', color: 'gray', marginBottom: 20, textAlign: 'center', }}>Klik Halaman Untuk</Text>
                                                <Text style={styles.teksin}>ABSENSI</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    {check == true && (
                                        <View style={styles.card}>
                                            <Ionicons
                                                style={styles.ikon1}
                                                name="shield-checkmark-outline"
                                                size={140}
                                                color="#1FD851"
                                            />

                                            <Text style={{ fontSize: 34, fontFamily: 'poppinssemibold', color: '#118eeb', textAlign: 'center', }}>ABSENSI</Text>
                                            <Text style={{ fontSize: 18, fontFamily: 'poppins', color: 'gray', marginBottom: 30, textAlign: 'center', }}>ONLINE</Text>

                                            {/* <Image
                                                    style={styles.stretch}
                                                    source={require("../../assets/vector.png")}
                                                /> */}

                                            <Text style={{ fontSize: 15, fontFamily: 'poppinssemibold', color: 'gray', marginBottom: 10, textAlign: 'center', }}>Selamat</Text>
                                            <Text style={styles.teksin}>Anda Sudah Melakukan</Text>
                                            <Text style={styles.teksin}>Absensi Hari Ini</Text>

                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {verif == false && (
                <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Text style={{ fontFamily: 'poppins' }}>Maaf fitur ini hanya tersedia untuk user yang telah mendaftar..</Text>
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
                    navigation.navigate('Presensi1')
                }}
            />
        </View>
    )
}

export default PresensiKonfirmasi

const styles = StyleSheet.create({
    card: {
        height: '99%',
        marginTop: '1%',
        backgroundColor: 'white',
        width: '96%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    ikon1: {
        marginTop: -21,
    },
    cekin: {
        backgroundColor: '#FFD600',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 20
    },
    cekin1: {
        backgroundColor: '#FFD600',
        padding: 40,
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    teksin: {
        color: '#2D7CF3',
        fontFamily: 'poppinssemibold',
        fontSize: 24,
        textAlign: 'center',
    },

    cekout: {
        backgroundColor: '#E5E5E5',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20
    },
    teksout: {
        color: '#AAAAAA',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    button: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
    },
    text: {
        color: '#fff',
        fontSize: 15
    },
    title2: {
        color: 'gray',
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '700'
    },
    title3: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 35
    }
    // stretch :{
    //     resizeMode: 'stretch',
    // },
});