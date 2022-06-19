import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList, Modal } from 'react-native'
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
                if (user != null && user.email == 'admin@gmail.com') {
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

    return (
        <View style={{ display: 'flex', flex: 1, }}>
            <View style={styles.container}>


                <Text style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold' }}>Jadwal Liput</Text>

                <Text>Pilih Berdasarkan Tanggal</Text>
                <TouchableOpacity
                    onPress={() => {
                        setOpen(true)

                    }

                    }
                    style={styles.box_tanggal}
                >
                    <Text>{selectedDate}</Text>
                </TouchableOpacity>

                <Modal
                    animationType={'fade'}
                    transparent={true}
                    backdropOpacity={0.3}
                    visible={open}
                    onRequestClose={() => {
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
                    <Text style={{ color: 'white' }}>Tampilkan Semua</Text>
                </TouchableOpacity>

                {filter == false && (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 120 }}
                        data={users}
                        renderItem={({ item }) => (
                            <View style={{ marginVertical: 10 }}>
                                <Text>Nama: {item.nama}</Text>
                                <Text>Lokasi: {item.lokasi}</Text>
                                <Text>Tanggal: {item.tanggal}</Text>
                                <Text>Keterangan: {item.keterangan}</Text>
                                {status && (
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'blue', padding: 10, margin: 10 }}
                                        onPress={() => {
                                            deleteUser(item.id);
                                        }}
                                    >


                                        <Text style={{ color: 'white' }}>Hapus Jadwal</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}

                {filter == true && (
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 120 }}
                        data={users}
                        renderItem={({ item }) => (

                            <View style={{ marginVertical: 10 }}>
                                {item.tanggal == selectedDate && (
                                    <><Text>Nama: {item.nama}</Text><Text>Lokasi: {item.lokasi}</Text><Text>Tanggal: {item.tanggal}</Text><Text>Keterangan: {item.keterangan}</Text>
                                        {status && (
                                            <TouchableOpacity
                                                style={{ backgroundColor: 'blue', padding: 10, margin: 10 }}
                                                onPress={() => {
                                                    deleteUser(item.id);
                                                }}
                                            >

                                                <Text style={{ color: 'white' }}>Hapus Jadwal</Text>
                                            </TouchableOpacity>)}
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

                            name="add-circle"
                            size={60}
                            color="#1F76C6"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default JadwalLiput

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },
    ikonAdd: {
        position: 'absolute',
        bottom: 30,
        right: 40
    },
    input: {
        borderWidth: 1,
        margin: 20,
        padding: 20
    },
    box_tanggal: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 7
    },
    button: {
        backgroundColor: 'brown',
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
        padding: 10
    }

})
