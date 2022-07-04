import { Alert, View, Image, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, TouchableHighlight } from 'react-native'
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
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '../firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase/crudConf';
import { useFocusEffect } from '@react-navigation/native';
import { initializeApp } from 'firebase/app'; //validate yourself
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; //access the storage database
initializeApp(firebaseConfig);
const EditPengguna = ({ route, navigation }) => {
    const { nama, email, nip, id } = route.params;

    const [nama1, setNama1] = useState(nama)
    const [nip1, setNip1] = useState(nip)
    const [email1, setEmail] = useState(email)
    const updateUser = async (id) => {
        const userDoc = doc(db, "pengguna", id);
        const newFields = { nama: nama1, email: email1, nip: nip1 };
        try {
            await updateDoc(userDoc, newFields);
            alert('Berhasil memperbarui profil pengguna.')
        } catch (e) {
            alert(e)
        }
        // getUsers();

    };
    return (
        <View>
            <Text>EditPengguna</Text>
            <View style={styles.content}>
                <View style={{ borderBottomWidth: 1, borderColor: 'black', marginTop: -10, borderColor: 'gray' }}></View>
                <View style={styles.wrapitem}>
                    <Text style={styles.title}>Nama</Text>
                    <TextInput
                        onChangeText={nama1 => setNama1(nama1)}
                        value={nama1}
                        style={styles.boxnama}
                        placeholder='Nama Lengkap ...'
                    />
                </View>
                <View style={styles.wrapitem}>
                    <Text style={styles.title}>NIP</Text>
                    <TextInput
                        onChangeText={nip1 => setNip1(nip1)}
                        value={nip1}
                        style={styles.boxnama}
                        placeholder='NIP...'
                    />
                </View>
                {/* <View style={styles.wrapitem}>
                    <Text style={styles.title}>Email</Text>
                    <TextInput
                        onChangeText={email => setEmail(email)}
                        value={email}
                        style={styles.boxnama}
                        placeholder='Email ...'
                    />
                </View> */}

                <TouchableOpacity style={styles.btn} onPress={() => {
                    updateUser(id)
                    // console.log(id)
                    navigation.navigate('Data Pengguna')
                }}>
                    <Text style={styles.teksup}>Update</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default EditPengguna


const styles = StyleSheet.create({
    wrapitem: {
        marginVertical: 10
    },
    teksup: {
        color: 'white',
        fontSize: 16,
        // fontWeight: '500'
        fontFamily: 'poppinssemibold'
    },
    title: {
        color: '#949494',
        marginVertical: 5,
        fontFamily: 'poppins'
    },
    subtitle: {
        color: '#4c4c4c',
        fontSize: 16,
        // fontWeight: '500'
        fontFamily: 'poppins'
    },
    teksin: {
        marginTop: 10,
        color: 'gray',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'poppins'
    },
    content: {
        // marginHorizontal: 5,
        backgroundColor: 'white',
        minHeight: '100%',
        padding: 30
    },
    btn: {
        backgroundColor: 'black',
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    symbol: {
        minHeight: 100,
        minWidth: 100,
        borderRadius: 100,
        backgroundColor: '#171F1D',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -50,

    },
    teksProfile: {
        color: 'white',
        fontSize: 24,
        // fontWeight: '700'
        fontFamily: 'poppinsbold'
    },
    boxnama: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'gray',
        fontFamily: 'poppins'
    }
})