import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList, Modal, Alert } from 'react-native'
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
import styles from '../component/styleJadwalLiput';
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
        <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
                {/* <Text>riwayatPresensi</Text> */}
                {verif == true && (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 30 }}
                        data={riwayat}
                        renderItem={({ item }) => (
                            <View style={styles.list1}>
                                {email == item.email && (
                                    <><View style={styles.list2}></View><View style={styles.data}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 7, color: 'grey' }}>Nama: {item.nama}</Text>
                                            <Ionicons
                                                style={styles.ikonLokasi}
                                                name="bookmarks"
                                                size={24}
                                                color="#118eeb" />
                                        </View>

                                        <Text style={{ paddingBottom: 12, color: 'grey' }}>Keterangan: {item.keterangan}</Text>
                                        <Text style={{ textAlign: 'right', paddingBottom: 7, color: 'grey' }}>{item.tanggal}</Text>
                                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>

                                        <View style={{ paddingTop: 7, flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Text style={{ fontSize: 16, color: 'grey', alignSelf: 'center' }}>Waktu: {item.waktu}</Text>
                                            <Ionicons
                                                style={styles.ikonLokasi}
                                                name="location"
                                                size={24}
                                                color="red" />
                                        </View>

                                    </View></>
                                )}
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}

                {verif == false && (
                    <View>
                        <Text>Maaf silahkan login terlebih dahulu untuk mengakses menu ini..</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

export default RiwayatPresensi