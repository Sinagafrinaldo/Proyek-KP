import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Linking,

} from "react-native";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import { initializeApp } from 'firebase/app';
import { db } from '../firebase/crudConf';
import React, { useState } from "react";
import { useNavigation, useFocusEffect, NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from '../component/styleDataPresensi';
import { Picker } from "@react-native-picker/picker";

const DataPresensi = ({ route, navigation }) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const presensiCollectionRef = collection(db, "presensi");
    const [presensi, setPresensi] = useState([])
    const [nip, setNip] = useState('')
    const usersCollectionRef = collection(db, "pengguna");
    const [admin, setAdmin] = useState(false)
    const [pengguna, setPengguna] = useState([])
    const getPresensi = async () => {
        const data = await getDocs(presensiCollectionRef);
        setPresensi(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setPengguna(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    useFocusEffect(
        React.useCallback(() => {
            getPresensi()
            getUsers()
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user != null) {
                    if (user.email.toLocaleLowerCase() == 'admin@gmail.com') {
                        setAdmin(true)
                    } else {
                        setAdmin(false)
                    }
                } else if (user == null) {

                    setAdmin(false)
                }
            })
            return unsubscribe
        }, [])
    );

    return (
        <View style={styles.container}>
            {admin == true && (
                <View>
                    <View style={{...styles.select_box}}>
                        <Picker
                            placeholder="Pilih Pengguna"
                            selectedValue={nip}
                            style={{ marginLeft: -30, marginTop:-3, color :'gray'}}
                            onValueChange={(nip) => {
                                setNip(nip);
                            }}
                        >
                            <Picker.Item label='--Semua--' value='' />

                            {
                                pengguna.map((item, index) => (
                                    <Picker.Item key={index} label={item.nama} value={item.nip} />
                                ))
                            }

                        </Picker>
                    </View>
                    <View>
                        <FlatList
                            // contentContainerStyle={{ paddingBottom: 30 }}
                            data={presensi}
                             contentContainerStyle={{ paddingBottom: 30 }}
                            renderItem={({ item }) => (
                                <View style={{}}>
                                    {nip == '' && (
                                        <View style={styles.card_absent}>
                                            <View style={styles.data_absent}>
                                                <View style={styles.position_name}>
                                                    <Text style={styles.text_name}>Nama : {item.nama}</Text>
                                                    <Ionicons
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
                                                        name="time-outline"
                                                        size={24}
                                                        color="red" />
                                                </View>

                                            </View>
                                        </View>
                                    )}

                                    {nip == item.nip && (
                                        <View style={styles.card_absent}>
                                            <View style={styles.data_absent}>
                                                <View style={styles.position_name}>
                                                    <Text style={styles.text_name}>Nama : {item.nama}</Text>
                                                    <Ionicons
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
                    </View>
                </View>
            )}
        </View>
    )
}

export default DataPresensi