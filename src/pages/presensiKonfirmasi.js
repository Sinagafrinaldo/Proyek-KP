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
import * as Device from 'expo-device';
import styles from "../component/stylepresensiKonfirmasi";
import * as Network from 'expo-network';
import publicIP from 'react-native-public-ip';

const PresensiKonfirmasi = ({ route, navigation }) => {
    const { pengguna1, presensi1, verif, email, idhp, id } = route.params;
    const [alerts, setShowAlert] = useState(false);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const usersCollectionRef = collection(db, "pengguna");
    const ipCollectionRef = collection(db, "ipkominfo");
    const presensiCollectionRef = collection(db, "presensi");

    const [pengguna, setPengguna] = useState([])

    const [nama, setNama] = useState('')
    const [nip, setNip] = useState('')
    const [presensi, setPresensi] = useState([])
    const [check, setCheck] = useState(false)
    const [cp, setCp] = useState(false)
    const [idhp2, setIdhp2] = useState(idhp)
    const [ori, setOri] = useState(false)
    const [ip, setIp] = useState('')
    const [ipsekarang, setIpsekarang] = useState([])
    const [ipfix, setIpfix] = useState('')
    const [valid, setValid] = useState(false)
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    };
    const ipAlert = (ipterdaftar) => {

        publicIP()
            .then(ipadds => {
                setIp(ipadds)
                console.log('sss1', ipterdaftar)
                if (ipadds != ipterdaftar) {
                    setValid(false)
                    alert('Maaf, anda hanya dapat melakukan absensi dengan terkoneksi ke jaringan WiFi Kantor kominfo.')
                    navigation.navigate('Presensi1')
                } else if (ipadds == ipterdaftar) {
                    setValid(true)
                }
            })
            .catch(error => {
                console.log(error);
                // 'Unable to get IP address.'
            });



    };

    const getIpkominfo = async () => {
        const data = await getDocs(ipCollectionRef);
        setIpsekarang(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        let ipNow = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        ipNow.map((item, index) => (
            setIpfix(item.ip),
            ipAlert(item.ip)
        ))

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
    const resetLogin = async (id) => {
        const deviceId = Device.osBuildId;
        const userDoc = doc(db, "pengguna", id);
        const newFields = { idhp: deviceId };
        try {
            await updateDoc(userDoc, newFields);
            // alert('Berhasil melakukan reset device absensi.')
        } catch (e) {
            alert(e)
        }
        // getUsers();

    };
    const getId = () => {
        const deviceId = Device.osBuildId;
        // setIdhp2(deviceId)
        if (deviceId == idhp) {
            setOri(true)
        } else if (idhp == '') {
            setOri(true)
            resetLogin(id)

        } else {
            setOri(false)
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            getId()
            getInfo()

            getIpkominfo()
            // ipAlert()
            // const ipAdds = await Network.getIpAddressAsync()
            // console.log(ipAdds)
        }, [])
    );
    console.log('status', ipfix)
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
            {(verif == true && ori == true && valid == true) && (
                <View style={styles.container}>

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
                                        <View>
                                            <Image
                                                style={styles.image_confirm_absent}
                                                source={require("../../assets/konfirmasi-absensi.png")}
                                            />
                                            <Text style={styles.text_confirm_absent}>Lakukan Absensi</Text>
                                            <Text style={styles.text_now}>Sekarang</Text>
                                            <TouchableOpacity style={styles.touch_absent}
                                                onPress={() => {

                                                    handleMasuk(item.nama, item.nip)
                                                    getInfo()

                                                }}
                                            >
                                                <Text style={styles.text_absent}>ABSENSI</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    {check == true && (
                                        <View>
                                            {/* <Ionicons
                                                style={styles.ikon1}
                                                name="shield-checkmark-outline"
                                                size={140}
                                                color="#1FD851"
                                            /> */}

                                            <Image
                                                style={styles.image_absent}
                                                source={require("../../assets/absensi.png")}
                                            />

                                            <Text style={styles.text_absent_info}>ABSENSI</Text>
                                            <Text style={styles.text_online_info}>ONLINE</Text>



                                            <Text style={styles.text_welcome}>Selamat</Text>
                                            <Text style={styles.text_absent_done}>Anda Sudah Melakukan</Text>
                                            <Text style={styles.text_absent_done}>Absensi Hari Ini</Text>

                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            )}

            {(verif == true && ori == false) && (
                <View style={styles.container_verif_false}>

                    <Image
                        style={styles.image_not_verif}
                        source={require("../../assets/not-user.png")}
                    />

                    <Text style={styles.text_not_verif}>Maaf presensi hanya bisa dilakukan dengan user biasa dan ponsel yang di daftarkan di awal... Jika anda berganti ponsel anda dapat meminta admin untuk mereset status device anda. </Text>
                </View>
            )}

            {verif == false && (
                <View style={styles.container_verif_false}>

                    <Image
                        style={styles.image_not_verif}
                        source={require("../../assets/not-user.png")}
                    />

                    <Text style={styles.text_not_verif}>Maaf fitur ini hanya tersedia untuk user yang telah mendaftar..</Text>
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
        </ScrollView>
    )
}

export default PresensiKonfirmasi