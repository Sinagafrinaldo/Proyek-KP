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
import styles from '../component/styleRiwayatPresensi';
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
        <View>
            {admin == true && (

                <View>
                    <Text>DataPresensi</Text>
                    <Picker
                        placeholder="Pilih Pengguna"
                        selectedValue={nip}
                        style={styles2.box_opsi}
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
                    <View>
                        <FlatList
                            // contentContainerStyle={{ paddingBottom: 30 }}
                            data={presensi}
                            contentContainerStyle={{ paddingBottom: 200 }}
                            renderItem={({ item }) => (
                                <View style={{}}>

                                    {nip == '' && (


                                        <View style={styles.list1}>
                                            <View style={styles.data}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                    <Text style={{ fontSize: 18, fontFamily: 'poppinssemibold', paddingBottom: 7, color: 'grey', width: '90%' }}>Nama : {item.nama}</Text>
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

                                    {nip == item.nip && (


                                        <View style={styles.list1}>
                                            <View style={styles.data}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                    <Text style={{ fontSize: 18, fontFamily: 'poppinssemibold', paddingBottom: 7, color: 'grey', width: '90%' }}>Nama : {item.nama}</Text>
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
                    </View>
                </View>
            )}
        </View>
    )
}

export default DataPresensi

const styles2 = StyleSheet.create({
    box_opsi: {
        borderWidth: 1
    }
})