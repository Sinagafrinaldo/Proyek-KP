import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
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
        <View style={{ justifyContent: 'center', flex: 1, display: 'flex' }}>

            {verif == true && (
                <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: '100%' }}>

                    {/* <Button title='Data Presensi' onPress={() => {
                        getInfo()
                        console.log(check)
                    }} /> */}
                    <View style={styles.card}>
                        <Text style={{ color: 'gray' }}>Haloo..</Text>

                        {pengguna1.map((item, index) => (

                            <View key={index} style={{}}>
                                <View >
                                    {item.email.toLowerCase() == email.toLowerCase() && (
                                        <View>
                                            <Text style={styles.title2}>Nama:  {item.nama}</Text>
                                            <Text style={styles.title2}>NIP:  {item.nip}</Text>
                                            {check == false && (
                                                <TouchableOpacity style={styles.cekin}
                                                    onPress={() => {

                                                        handleMasuk(item.nama, item.nip)
                                                        getInfo()

                                                    }}
                                                >

                                                    <Text style={styles.teksin}>PRESENSI SEKARANG-</Text>
                                                </TouchableOpacity>
                                            )}
                                            {check == true && (
                                                <TouchableOpacity style={styles.cekin}
                                                    onPress={() => {

                                                        // handleMasuk(item.nama, item.nip)
                                                        getInfo()
                                                    }}
                                                >

                                                    <Text style={styles.teksin}>Anda Sudah Presensi</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    )}

                                </View>
                            </View>
                        ))}


                    </View>

                </View>

            )}

            {verif == false && (
                <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Text>Maaf fitur ini hanya tersedia untuk user yang telah mendaftar..</Text>
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
        </View >
    )
}

export default PresensiKonfirmasi

const styles = StyleSheet.create({
    card: {

        width: '80%',
        padding: 30,
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    cekin: {
        backgroundColor: '#FFD600',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 20
    },
    teksin: {
        color: '#2D7CF3',
        fontWeight: 'bold'
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
        fontSize: 16,
        fontWeight: '700'
    }
});