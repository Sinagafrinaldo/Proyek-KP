import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native'
import DatePicker from 'react-native-modern-datepicker';

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
import styles from '../component/styleTambahJadwal';
import { useFocusEffect } from '@react-navigation/native';

const TambahJadwal = ({ navigation }) => {
    const [newName, setNewName] = useState("");
    const [newLokasi, setNewLokasi] = useState("");
    const [newKeterangan, setNewKeterangan] = useState("");
    const usersCollectionRef = collection(db, "jadwal");
    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(false)
    // const [date, setDate] = useState(null);

    const createUser = async () => {
        await addDoc(usersCollectionRef, { nama: newName, lokasi: newLokasi, tanggal: selectedDate, keterangan: newKeterangan });
    };


    useFocusEffect(
        React.useCallback(() => {
            let today = new Date();
            // console.log(today.getDate())
            if (today.getMonth() < 10) {
                let date = today.getFullYear() + '/0' + (today.getMonth() + 1) + '/' + today.getDate();
                setSelectedDate(date);
                if (today.getDate() < 10) {

                    let date = today.getFullYear() + '/0' + (today.getMonth() + 1) + '/0' + today.getDate();
                    setSelectedDate(date);
                }
            } else if (today.getMonth() >= 10) {
                if (today.getDate() < 10) {
                    let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/0' + today.getDate();
                    setSelectedDate(date);
                } else if (today.getDate() >= 10) {


                    let date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
                    setSelectedDate(date);
                }
            }
        }, [])
    );

    return (

        <ScrollView style={styles.container}>
            <View style={styles.bg}>
                <Text style={{ color: '#1F76C6' }}>-</Text>
            </View>
            <View style={styles.card}>
                <View>
                    <Text style={styles.teks}>Nama Peliput</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNewName}
                        value={newName}
                        placeholder='Nama...'
                    />
                    <Text style={styles.teks}>Lokasi</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNewLokasi}
                        value={newLokasi}
                        placeholder='Lokasi...'
                    />
                    <Text style={styles.teks1}>Tanggal</Text>
                    <TouchableOpacity
                        onPress={() => setOpen(true)}
                        style={styles.box_tanggal}
                    >
                        <Text style={{ fontFamily: 'poppins' }}>{selectedDate}</Text>
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
                            }}
                        />
                    </Modal>

                    <Text style={styles.teks2}>Keterangan</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNewKeterangan}
                        value={newKeterangan}
                        placeholder='Keterangan...'
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            createUser()
                            navigation.navigate('Jadwal Liput')
                        }
                        }
                    >
                        <Text style={{ color: 'white', fontSize: 16, fontFamily: 'poppinssemibold' }}>Tambah Jadwal</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>

    )
}

export default TambahJadwal