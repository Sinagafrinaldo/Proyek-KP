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
        <View style={{backgroundColor: 'white', height:'100%'}}>
            {/* <Text>riwayatPresensi</Text> */}
            {verif == true && (
                <FlatList
                    contentContainerStyle={{ paddingBottom: 30 }}
                    data={riwayat}
                    renderItem={({ item }) => (
                        <View style={{}}>

                            {email == item.email && (
                                <View style={styles.list1}>
                                    <View style={styles.data}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'poppinssemibold', paddingBottom: 7, color: 'grey', width:'90%'}}>Nama : {item.nama}</Text>
                                            <Ionicons
                                                style={styles.ikonLokasi}
                                                name="clipboard"
                                                size={24}
                                                color="#118eeb" />
                                        </View>

                                        <Text style={{ paddingBottom: 12, color: 'grey', fontFamily: 'poppins' }}>Keterangan: {item.keterangan}</Text>
                                        <Text style={{ textAlign: 'right', paddingBottom: 7, color: 'grey', fontFamily: 'poppins' }}>{item.tanggal}</Text>
                                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>

                                        <View style={{ paddingTop: 7, flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <Text style={{ fontSize: 16, color: 'grey', alignSelf: 'center', fontFamily: 'poppins' }}>Waktu: {item.waktu}</Text>
                                            <Ionicons
                                                style={styles.ikonLokasi}
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
                    <View style={{padding:10, display:'flex', flex:1, alignSelf:'center', justifyContent:'center', alignItems:'center'}}>

                    <Image
                        style={styles.notUser}
                        source={require("../../assets/not-user.png")}
                    />
    
                    <Text style={{ textAlign: 'center', color :'gray',fontFamily: 'poppins' }}>Maaf fitur ini hanya tersedia untuk user yang telah mendaftar..</Text>
                </View>
            )}
        </View >
    )
}

export default RiwayatPresensi