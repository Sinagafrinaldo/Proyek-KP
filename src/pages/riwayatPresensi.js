import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, FlatList, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"
import Ionicons from "react-native-vector-icons/Ionicons";
import { db } from '../firebase/crudConf';
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import styles from '../component/styleRiwayatPresensi';
const RiwayatPresensi = () => {
    const [riwayat, setRiwayat] = useState([]);
    const presensiCollectionRef = collection(db, "presensi");
    const [email, setEmail] = useState('')
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [verif, setVerif] = useState(false)
    const getRiwayat = async () => {
        const data = await getDocs(presensiCollectionRef);
        setRiwayat(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    useFocusEffect(
        React.useCallback(() => {
            getRiwayat()
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user != null) {
                    setVerif(true)
                    setEmail(user.email)
                } else {
                    setVerif(false)
                }
            })

            return unsubscribe

        }, [])
    );
    
    return (
        <View style={styles.container}>
            {/* <Text>riwayatPresensi</Text> */}
            {verif == true && (
                <FlatList
                    contentContainerStyle={{ paddingBottom: 30 }}
                    data={riwayat}
                    renderItem={({ item }) => (
                        <View style={{}}>

                            {email == item.email && (
                                <View style={styles.card_absent}>
                                    <View style={styles.data_absent}>
                                        <View style={styles.position_name}>
                                            <Text style={styles.text_name}>Nama : {item.nama}</Text>
                                            <Ionicons
                                                // style={styles.ikonLokasi}
                                                name="clipboard"
                                                size={24}
                                                color="#118eeb" />
                                        </View>

                                        <Text style={styles.text_description}>Keterangan: {item.keterangan}</Text>
                                        <Text style={styles.date}>{item.tanggal}</Text>
                                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>

                                        <View style={{ paddingTop: 7, flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Text style={styles.time}>Waktu: {item.waktu}</Text>
                                            <Ionicons
                                                // style={styles.ikonLokasi}
                                                name="time-outline"
                                                size={24}
                                                color="red" />
                                        </View>

                                    </View>
                                </View>

                            )}
                        </View>

                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
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
        </View >
    )
}

export default RiwayatPresensi