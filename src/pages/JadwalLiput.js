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


const JadwalLiput = ({ navigation }) => {
    const [text, onChangeText] = useState('')

    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "jadwal");
    const [filter, setFilter] = useState(false)
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [status, setStatus] = useState(false)
    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = auth.onAuthStateChanged(user => {
                if (user != null && user.email == 'kpkominfoproyek77@gmail.com') {
                    setStatus(true)
                }
            })

            return unsubscribe
        }, [])
    );
    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // const updateUser = async (id, age) => {
    //     const userDoc = doc(db, "jadwal", id);
    //     const newFields = { age: age + 1 };
    //     await updateDoc(userDoc, newFields);
    //     getUsers();
    // };

    const deleteUser = async (id) => {
        const userDoc = doc(db, "jadwal", id);
        await deleteDoc(userDoc);
        getUsers();
    };


    useFocusEffect(
        React.useCallback(() => {

            getUsers();
            let today = new Date();
            let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
            setSelectedDate(date);
        }, [])
    );

    const showConfirmDialog = (value) => {
        console.log(value)
        return Alert.alert(
            "Hapus ?",
            "Apakah anda yakin ingin menghapus jadwal ?",
            [
                {
                    text: "Ya",
                    onPress: () => {
                        deleteUser(value)
                    },
                },
                {
                    text: "Tidak",
                },
            ]
        );
        // deleteUser(value)
    };

    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={{ alignSelf: 'center', marginTop: 10, fontFamily: 'poppinssemibold' }}>Pilih Berdasarkan Tanggal</Text>


                <View style={styles.cari}>
                    <View style={{ width: '75%' }}>
                        <TouchableOpacity
                            onPress={() => {
                                setOpen(true)

                            }

                            }
                            style={styles.box_tanggal}
                        >
                            <Text style={{ fontFamily: 'poppinssemibold' }}>{selectedDate}</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType={'fade'}

                        // onBackButtonPress={() => { }}
                        transparent={true}
                        backdropOpacity={0.3}
                        visible={open}
                        onRequestClose={() => {
                            setOpen(false)
                            console.log('Modal has been closed.');
                        }}>

                        <DatePicker
                            options={{
                                backgroundColor: '#090C08',
                                textHeaderColor: '#FFA25B',
                                textDefaultColor: '#F6E7C1',
                                selectedTextColor: '#fff',
                                mainColor: '#F4722B',
                                textSecondaryColor: '#D6C7A1',
                                borderColor: 'rgba(122, 146, 165, 0.1)',
                            }}
                            current={selectedDate}
                            selected={selectedDate}
                            mode="calendar"
                            minuteInterval={30}
                            style={{
                                borderRadius: 10, height: 300, width: 300, marginVertical: 150,
                                flex: 1,
                                alignSelf: 'center',
                            }}
                            onDateChange={(date) => {
                                setOpen(false)
                                setSelectedDate(date)
                                setFilter(true)
                            }}
                        />
                    </Modal>

                    <TouchableOpacity
                        onPress={() => {
                            setFilter(false)

                        }}
                        style={styles.button}
                    >
                        <Text style={{ textAlign: 'center', fontFamily: 'poppins', color: 'white' }}>Semua</Text>
                    </TouchableOpacity>

                </View>

                {filter == false && (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 30 }}
                        data={users.sort(function (a, b) {
                            return (a.tanggal > b.tanggal) ? -1 : (a.tanggal > b.tanggal) ? 1 : 0;
                        })
                        }
                        renderItem={({ item }) => (
                            <View style={styles.list1}>
                                <View style={styles.list2}></View>
                                <View style={styles.data}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <Text style={{ fontSize: 16, fontFamily: 'poppinssemibold', paddingBottom: 7, color: 'grey' }}>Peliput : {item.nama}</Text>
                                        <Ionicons
                                            style={styles.ikonLokasi}
                                            name="bookmarks"
                                            size={24}
                                            color="#118eeb"
                                        />
                                    </View>

                                    <Text style={{ paddingBottom: 12, color: 'grey', fontFamily: 'poppins' }}>Keterangan : {item.keterangan}</Text>
                                    <Text style={{ textAlign: 'right', paddingBottom: 7, color: 'grey', fontFamily: 'poppins' }}>{item.tanggal}</Text>
                                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>

                                    <View style={{ paddingTop: 7, flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <Text style={{ fontSize: 16, color: 'grey', alignSelf: 'center', fontFamily: 'poppins' }}>Lokasi : {item.lokasi}</Text>
                                        <Ionicons
                                            style={styles.ikonLokasi}
                                            name="location"
                                            size={24}
                                            color="red"
                                        />
                                    </View>
                                    {status && (
                                        <TouchableOpacity
                                            style={styles.btnHapus}
                                            onPress={() => {
                                                showConfirmDialog(item.id);
                                            }}
                                        >


                                            <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'poppins' }}>Hapus Jadwal</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}

                {filter == true && (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 30 }}
                        data={users.sort(function (a, b) {
                            return (a.tanggal > b.tanggal) ? -1 : (a.tanggal > b.tanggal) ? 1 : 0;
                        })
                        }
                        renderItem={({ item }) => (

                            <View>
                                {item.tanggal == selectedDate && (
                                    <>
                                        <View style={styles.list1}>
                                            <View style={styles.list2}></View>
                                            <View style={styles.data}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                                    <Text style={{ fontSize: 16, paddingBottom: 7, color: 'grey', fontFamily: 'poppinssemibold' }}>Peliput : {item.nama}</Text>
                                                    <Ionicons
                                                        style={styles.ikonLokasi}
                                                        name="bookmarks"
                                                        size={24}
                                                        color="#118eeb"
                                                    />
                                                </View>

                                                <Text style={{ paddingBottom: 12, color: 'grey', fontFamily: 'poppins' }}>Keterangan : {item.keterangan}</Text>
                                                <Text style={{ fontFamily: 'poppins', textAlign: 'right', paddingBottom: 7, color: 'grey' }}>{item.tanggal}</Text>
                                                <View style={{ width: '100%', height: 0.5, backgroundColor: '#D7DBDD' }}></View>

                                                <View style={{ paddingTop: 7, flexDirection: 'row', justifyContent: 'space-between', }}>
                                                    <Text style={{ fontSize: 16, color: 'grey', alignSelf: 'center', fontFamily: 'poppins' }}>Lokasi : {item.lokasi}</Text>
                                                    <Ionicons
                                                        style={styles.ikonLokasi}
                                                        name="location"
                                                        size={24}
                                                        color="red"
                                                    />
                                                </View>
                                                {status && (
                                                    <TouchableOpacity
                                                        style={styles.btnHapus}
                                                        onPress={() => {
                                                            showConfirmDialog(item.id);
                                                        }}
                                                    >


                                                        <Text style={{ color: 'white', fontFamily: 'poppins', textAlign: 'center' }}>Hapus Jadwal</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        </View>
                                    </>

                                )}
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}


                {status && (
                    <TouchableOpacity
                        style={styles.ikonAdd}
                        onPress={() => { navigation.navigate('Tambah Jadwal') }}
                    >
                        <Ionicons

                            name="add"
                            size={50}
                            color="white"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default JadwalLiput